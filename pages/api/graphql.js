import { ApolloServer } from 'apollo-server-micro';
import typeDefs from '../../api/utilites/schemas';
import { resolvers } from '../../api/utilites/resolvers';

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: '/api/graphql' });
