import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import * as env from "env-var";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient();

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: env.get("GITHUB_ID").required().asString(),
      clientSecret: env.get("GITHUB_SECRET").required().asString(),
    }),
    GoogleProvider({
      clientId: env.get("GOOGLE_CLIENT_ID").required().asString(),
      clientSecret: env.get("GOOGLE_CLIENT_SECRET").required().asString(),
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        if (email !== "john@gmail.com" || password !== "12345678") {
          throw new Error("invalid credentials");
        }
        return {
          id: "1234",
          name: "John Doe",
          email: "john@gmail.com",
        };
      },
    }),
  ],
});
