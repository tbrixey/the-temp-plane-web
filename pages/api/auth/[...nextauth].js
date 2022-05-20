import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "API Key",
      credentials: {
        apiKey: { label: "API Key", type: "text" },
      },
      async authorize(credentials, req) {
        try {
          const res = await axios.post(
            BASE_URL + "authorizePlayer",
            { apiKey: credentials?.apiKey },
            {
              headers: {
                accept: "*/*",
                "Content-Type": "application/json",
                Authorization: "Bearer " + credentials?.apiKey,
              },
            }
          );
          const user = res.data.data;
          if (user) {
            return user;
          }
        } catch (e) {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: user.apiKey,
          user,
        };
      }

      return token;
    },

    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.accessTokenExpires = token.accessTokenExpires;
      session.user.data = token.user;
      return session;
    },
  },
});
