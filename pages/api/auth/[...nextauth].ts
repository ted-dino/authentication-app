import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { User } from "@prisma/client";
import * as argon2 from "argon2";
import * as env from "env-var";
import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import prisma from "../../../lib/prismadb";

export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(prisma),
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

        const userAccount: User | null = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });
        const validPassword =
          userAccount &&
          userAccount.password &&
          (await argon2.verify(userAccount.password, password));

        if (!userAccount) {
          throw new Error("No user Found with Email Please Sign Up!");
        } else {
          if (!validPassword || userAccount.email !== email) {
            throw new Error("Invalid Username or Password ");
          }
        }
        return userAccount;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/login",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider !== "credentials") {
        const existingUser = await prisma.user.findFirst({
          where: {
            email: profile.email,
          },
        });
        if (!existingUser) {
          await prisma.user.create({
            data: {
              name: profile.name as string,
              email: profile.email as string,
              bio: profile.bio as string,
              image:
                (profile.avatar_url as string) || (profile.picture as string),
              password: "",
            },
          });
        }
      }

      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, user, token }) {
      const newData = await prisma.user.findFirst({
        where: {
          email: session.user.email as string,
        },
        select: {
          name: true,
          email: true,
          image: true,
          bio: true,
          phone: true,
          password: true,
        },
      });
      if (newData) session.user = newData;
      session.user = newData ? newData : session.user;
      return session;
    },
  },
};
export default NextAuth(authOptions);
