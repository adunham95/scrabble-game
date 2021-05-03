import { typeDefs as host } from './host';
import { typeDefs as game } from './game';
import { typeDefs as player } from './player';
import { typeDefs as Queries } from './Query';
import { typeDefs as Mutations } from './Mutation';

const typeDefs = [host, game, player, Queries, Mutations];

export default typeDefs;
