import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default NextAuth({
  providers: [
    Credentials({
      name: "API Key",
      credentials: {
        apiKey: { label: "API Key", type: "text" },
      },
      async authorize(credentials) {
        try {
          const user = await axios.post(
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
          if (user) {
            return { user: user.data.data };
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
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    secret: process.env.NEXTAUTH_SECRET,
    jwt: true,
  },
  callbacks: {
    async jwt(token) {
      if (token.user) {
        token.accessToken = token.user.apiKey;
      } else if (token.token.user) {
        token.accessToken = token.token.user.apiKey;
      }
      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.token.accessToken;
      session.user = token.token.user.user;
      return session;
    },
  },
});
