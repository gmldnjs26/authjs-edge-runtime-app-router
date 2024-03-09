import NextAuth from "next-auth";

import { authConfig } from "../auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  // /api, /login, image파일들은 middleware(auth)の대상외
  matcher: [
    "/((?!api|login|_next/static|_next/image|images|icons|icon.ico).*)",
  ],
};
