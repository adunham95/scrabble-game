/* eslint-disable no-param-reassign */
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { collections, connectToDatabase } from '../../../api/utilites/mongodb';
import { validatePassword } from '../../../api/utilites/utilities';

const options = {
  site: process.env.NEXTAUTH_URL,
  callbacks: {
    async signIn(user, account, profile) {
      return true;
    },
    async redirect(url, baseUrl) {
      return baseUrl;
    },
    async session(session, user) {
      session.user = user;
      return session;
    },
    async jwt(token, user, account, profile, isNewUser) {
      if (user?._id) {
        token = { ...token, ...user };
      }
      return token;
    },
  },
  providers: [
    Providers.Credentials({
      name: 'Account',
      async authorize(credentials) {
        const { db } = await connectToDatabase();

        const hostAccountInfo = await db.collection(collections.host).findOne({ email: credentials.email });
        const match = await validatePassword(hostAccountInfo.hash, hostAccountInfo.salt, credentials.password);

        delete hostAccountInfo.hash;
        delete hostAccountInfo.salt;

        if (match) {
          return hostAccountInfo;
        }
        return null;
      },
      credentials: {
        email: { label: 'email', type: 'text ', placeholder: 'user@gmail.com' },
        password: { label: 'Password', type: 'password', placeholder: 'password' },
      },
    }),
  ],
  database: process.env.MONGO_URI,
};

export default (req, res) => NextAuth(req, res, options);
