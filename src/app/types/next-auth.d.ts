import "next-auth";

import {
  CognitoAccessToken,
  CognitoIdToken,
  CognitoRefreshToken,
} from "amazon-cognito-identity-js";

declare module "next-auth" {
  interface Session {
    idToken?: CognitoIdToken | string;
    accessToken?: CognitoAccessToken | string;
    error?: string;
  }

  interface User {
    id?: string;
    idToken?: CognitoIdToken | string;
    accessToken?: CognitoAccessToken | string;
    refreshToken?: CognitoRefreshToken | string;
    expiresIn?: number;
  }

  interface JWT {
    idToken?: CognitoIdToken | string;
    accessToken?: CognitoAccessToken | string;
    refreshToken?: CognitoRefreshToken | string;
    expiresIn?: number;
    error?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    idToken?: CognitoIdToken | string;
    accessToken?: CognitoAccessToken | string;
    refreshToken?: CognitoRefreshToken | string;
    expiresIn?: number;
    error?: string;
  }
}
