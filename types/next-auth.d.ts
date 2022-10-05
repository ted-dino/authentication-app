import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
    interface JWT {
      bio?: string,
      password?:string
    }
  }

declare module "next-auth" {
  interface Session {
    user: {
      bio?: string,
      password?: string
    } & DefaultSession["user"]
  }
}