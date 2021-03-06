import { ApolloServer } from 'apollo-server-micro';
import Cookies from 'cookies';
import jwt from 'jsonwebtoken';
import typeDefs from '../../api/utilites/type-defs';
import { resolvers } from '../../api/utilites/resolvers';

const verifyToken = (token) => {
  // console.log('token', token);
  if (!token) return null;
  try {
    return jwt.verify(token, 'secret');
  } catch {
    return null;
  }
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => {
    const cookies = new Cookies(req, res);
    const token = cookies.get('auth-token');
    const host = verifyToken(token);
    return {
      cookies,
      host,
    };
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: '/api/graphql' });
