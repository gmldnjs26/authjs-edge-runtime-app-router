import {
  AuthenticationDetails,
  CognitoIdToken,
  CognitoUser,
  CognitoUserPool,
  CognitoUserSession,
} from "amazon-cognito-identity-js";
import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = (credentials?.email as string) ?? "";
        const password = (credentials?.password as string) ?? "";

        const userPool = new CognitoUserPool({
          UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
          ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
        });

        const user = new CognitoUser({
          Username: email,
          Pool: userPool,
        });

        const authenticationDetails = new AuthenticationDetails({
          Username: email,
          Password: password,
        });

        const session: CognitoUserSession = await new Promise(
          (resolve, reject) => {
            user.authenticateUser(authenticationDetails, {
              onSuccess: (session) => resolve(session),
              onFailure: (err) => reject(err),
              newPasswordRequired: function (
                userAttributes,
                requiredAttributes
              ) {
                user.completeNewPasswordChallenge(password, {}, this);
              },
            });
          }
        );

        if (!session) {
          return null;
        }

        return {
          email,
          idToken: session.getIdToken(),
          accessToken: session.getAccessToken(),
          refreshToken: session.getRefreshToken(),
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const callbackUrl = nextUrl.searchParams.get("callbackUrl");
      if (isLoggedIn) {
        if (callbackUrl) {
          return Response.redirect(callbackUrl);
        } else if (nextUrl.pathname === "/login") {
          return Response.redirect(`${nextUrl.origin}/news`);
        } else {
          return true;
        }
      } else {
        return false;
      }
    },
    async session({ session, token }) {
      session.user.id = (token.idToken as CognitoIdToken)?.payload?.sub ?? "";
      session.user.email = token.email ?? "";
      return session;
    },
    async jwt({ token, user, trigger }) {
      if (user && trigger === "signIn") {
        token.idToken = user.idToken;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.email = user.email;
      }
      return token;
    },
  },
};
