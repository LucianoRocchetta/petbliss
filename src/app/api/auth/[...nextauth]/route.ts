import NextAuth, { NextAuthOptions, Session, User, SessionStrategy } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        const user = {
          id: "1",
          username: "petblissadmin",
          password: "$2a$12$uL3.7Id1vsTdvfrRR1C5Hu4NcCgVu4emA53EEV1IDseWx8yEl.rl2",
          role: "admin"
        };

        const isAuthValid = await bcrypt.compare(credentials.password, user.password);

        if (!isAuthValid) return null;

        return { id: user.id, username: user.username, role: user.role };
      },
    }),
  ],
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
