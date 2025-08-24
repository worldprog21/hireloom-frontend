// @ts-nocheck

import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    Credentials({
      name: 'Strapi',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Step 1: Authenticate user
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              identifier: credentials?.email,
              password: credentials?.password,
            }),
          }
        );

        const data = await res.json();

        if (!(res.ok && data.jwt)) {
          throw new Error(data.error?.message || 'Login failed');
        }

        // Step 2: Fetch user with relations (user_detail)
        const userRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/me?populate[user_detail][populate][resume]=*`,
          {
            headers: {
              Authorization: `Bearer ${data.jwt}`,
            },
          }
        );

        const fullUser = await userRes.json();

        // Return user object with extra fields
        return {
          id: data.user.id,
          name: fullUser.username,
          email: fullUser.email,
          jwt: data.jwt,
          firstName: fullUser.user_detail?.firstName || null,
          lastName: fullUser.user_detail?.lastName || null,
          resume: fullUser?.user_detail?.resume || null,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.jwt = user.jwt;
        token.id = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.resume = user.resume;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      session.jwt = token.jwt;
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;
      session.user.resume = token.resume;
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
