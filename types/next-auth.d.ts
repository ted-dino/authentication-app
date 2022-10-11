import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    bio?: string;
    password?: string | null;
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      bio?: string | null;
      password?: string | null;
    } & DefaultSession["user"];
  }
  interface User {
    password: string | null;
  }
}
