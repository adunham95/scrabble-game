import { UserInputError } from 'apollo-server-errors';
import crypto from 'crypto';
import { connectToDatabase, collections } from '../mongodb';

export async function getGame(id) {
  const { db } = await connectToDatabase();
  const game = await db.collection(collections.game).findOne({ _id: id });

  return game;
}

export async function setGame(data) {
  const { db } = await connectToDatabase();
  const defaultGame = {
    users: [], adminID: '', ...data.input,
  };

  console.log(data);

  if (defaultGame.password < 1) {
    throw new UserInputError('No Password Specified');
  }

  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(defaultGame.password, salt, 1000, 64, 'sha512').toString('hex');

  delete defaultGame.password;

  const newGame = {
    ...defaultGame,
    createdAt: Date.now(),
    hash,
    salt,
    adminID: defaultGame.adminID,
  };

  const newGameData = await db.collection(collections.game).insertOne(newGame).then(({ ops }) => ops);

  console.log(newGameData);

  return newGameData;
}
