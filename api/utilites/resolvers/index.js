import { loginAdmin, setAdmin } from './admin';
import { getGame, loginGame, setGame } from './game';

export const resolvers = {
  Query: {
    getGame: async (_, args) => getGame(args.id),
    // getAdmin: async () => {
    //   try {
    //     const users = [
    //       { id: 1, login: 'test user' },
    //       { id: 2, login: 'test user number 2' },
    //     ];
    //     return users.map(({ id, login }) => ({
    //       id,
    //       login,
    //     }));
    //   } catch (error) {
    //     throw error;
    //   }
    // },
    // getUser: async (_, args) => {
    //   try {
    //     const user = { id: 1, login: 'test user' };
    //     return {
    //       id: user.id,
    //       login: user.login,
    //       avatar_url: user.avatar_url,
    //     };
    //   } catch (error) {
    //     throw error;
    //   }
    // },
  },
  Mutation: {
    createAdmin: async (_parent, _args, context, info) => setAdmin(_args),
    loginAdmin: async (_parent, _args, context, _info) => loginAdmin(_args),
    createGame: async (_parent, _args, context, _info) => setGame(_args),
    loginGame: async (_, args) => loginGame(args.password, args.user),
  },
};
