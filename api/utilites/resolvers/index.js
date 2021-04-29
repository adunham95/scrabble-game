import { getAdmin, loginAdmin, setAdmin } from './admin';
import {
  getGame, getGamesByAdmin, loginGame, setGame,
} from './game';

export const resolvers = {
  Query: {
    getGame: async (_, args, context) => getGame(args.id, context),
    getGamesByAdmin: async (_, args, context) => getGamesByAdmin(args.adminID, context),
    getAdmin: async (_, args, context) => getAdmin(args.id),
  },
  Mutation: {
    createAdmin: async (_parent, _args, context, info) => setAdmin(_args, context),
    loginAdmin: async (_parent, _args, context, _info) => loginAdmin(_args, context),
    createGame: async (_parent, _args, context, _info) => setGame(_args),
    loginGame: async (_, args) => loginGame(args.password, args.user),
  },
};
