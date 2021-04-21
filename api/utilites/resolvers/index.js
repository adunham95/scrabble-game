import { getGame, setGame } from './game';

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
    createGame: async (_parent, _args, context, _info) => setGame(_args),
  },
};
