import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";
import { config } from "../../../utils/config";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: config.githubId,
      clientSecret: config.githubSecret,
    }),
    FacebookProvider({
      clientId: config.facebookId,
      clientSecret: config.facebookSecret,
    }),
  ],
});
