import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";

export default NextAuth({
  providers: [
    Credentials({
      name: "API Key",
      credentials: {
        apiKey: { label: "API Key", type: "text" },
      },
      authorize: async (credentials) => {
        console.log("CRED", credentials);

        return { name: "PLAYER NAME" };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    secret: process.env.NEXTAUTH_SECRET,
    jwt: true,
  },
  callbacks: {
    redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return baseUrl + "/game";
      // Allows relative callback URLs
      else if (url.startsWith("/"))
        return new URL(url, baseUrl + "/game").toString();
      return baseUrl + "/game";
    },
  },
});
