import { getHost, loginHost, setHost } from './host';
import {
  getGame, getGamesByHost, loginGame, setGame, updateGame,
} from './game';

export const resolvers = {
  Query: {
    getGame: async (_, args, context) => getGame(args.id, context),
    getGamesByHost: async (_, args, context) => getGamesByHost(args.hostID, context),
    getHost: async (_, args, context) => getHost(args.id),
  },
  Mutation: {
    createHost: async (_parent, _args, context, info) => setHost(_args, context),
    loginHost: async (_parent, _args, context, _info) => loginHost(_args, context),
    createGame: async (_parent, _args, context, _info) => setGame(_args),
    updateGame: async (_parent, _args, context, _info) => updateGame(_args.id, _args.game),
    loginGame: async (_, args) => loginGame(args.password, args.player),
  },
};
