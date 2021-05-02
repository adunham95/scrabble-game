import { typeDefs as host } from './host';
import { typeDefs as game } from './game';
import { typeDefs as users } from './students';
import { typeDefs as Queries } from './Query';
import { typeDefs as Mutations } from './Mutation';

const typeDefs = [host, game, users, Queries, Mutations];

export default typeDefs;
