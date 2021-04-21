import { UserInputError } from 'apollo-server-errors';
import { ObjectId } from 'bson';
import { connectToDatabase, collections } from '../mongodb';
import { hashPassword } from '../utilities';

export async function getGame(id) {
  const { db } = await connectToDatabase();
  console.log(id);
  const game = await db.collection(collections.game).findOne({ _id: new ObjectId(id) });
  console.log(game);
  return game;
}

export async function setGame(data) {
  const { db } = await connectToDatabase();
  const defaultGame = {
    users: [], adminID: '', ...data.input,
  };

  console.log(data);

  if (defaultGame.password < 1 || defaultGame.password === '') {
    throw new UserInputError('No Password Specified');
  }
  if (defaultGame.adminID < 1 || defaultGame.adminID === '') {
    throw new UserInputError('No Admin user Specified');
  }
  if (defaultGame.name < 1 || defaultGame.name === '') {
    throw new UserInputError('No Game name Specified');
  }

  const { salt, hash } = await hashPassword(defaultGame.password);

  delete defaultGame.password;

  const newGame = {
    ...defaultGame,
    createdAt: Date.now(),
    hash,
    salt,
    adminID: defaultGame.adminID,
  };

  const newGameData = await db.collection(collections.game).insertOne(newGame).then(({ ops }) => ops[0]);

  console.log(newGameData);

  return newGameData;
}

export async function loginGame(login, student) {
  const { db } = await connectToDatabase();
  const game = {};
  return game;
}
