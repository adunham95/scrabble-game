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
        token._id = user?._id;
      }
      return token;
    },
  },
  providers: [
    Providers.Credentials({
      name: 'Account',
      async authorize(credentials) {
        const { db } = await connectToDatabase();

        const adminAccountInfo = await db.collection(collections.admin).findOne({ email: credentials.email });
        const match = await validatePassword(adminAccountInfo.hash, adminAccountInfo.salt, credentials.password);
        console.log(match);

        delete adminAccountInfo.hash;
        delete adminAccountInfo.slat;

        if (match) {
          return adminAccountInfo;
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
