import { UserInputError } from 'apollo-server-errors';
import { ObjectId } from 'bson';
import { connectToDatabase, collections } from '../mongodb';
import { capitalize, makeID } from '../utilities';

// Utility to generate unique passwords for the games
async function generatePassword(db) {
  const password = makeID(6);

  const previousPassword = await db.collection(collections.game).find({ password }).toArray();

  if (previousPassword.length > 0) {
    generatePassword();
  }

  console.log('password', password);
  return password;
}

export async function getGame(id, context) {
  // console.log(context);
  const { db } = await connectToDatabase();
  console.log(id);
  const game = await db.collection(collections.game).findOne({ _id: new ObjectId(id) });
  console.log(game);
  return game;
}

export async function getGamesByAdmin(adminID) {
  const { db } = await connectToDatabase();
  const game = await db.collection(collections.game).find({ adminID }).toArray();
  return game;
}

export async function setGame(data, context) {
  const { db } = await connectToDatabase();
  const defaultGame = {
    users: [], adminID: '', rounds: 0, tiles: [], ...data.input,
  };

  if (defaultGame.adminID < 1 || defaultGame.adminID === '') {
    throw new UserInputError('No Admin user Specified');
  }
  if (defaultGame.name < 1 || defaultGame.name === '') {
    throw new UserInputError('No Game name Specified');
  }

  const newGame = {
    users: [],
    createdAt: Date.now(),
    password: '',
    adminID: defaultGame.adminID,
    name: defaultGame.name,
    active: true,
    rounds: defaultGame.rounds,
    tiles: defaultGame.tiles,
  };

  const newGameData = await db.collection(collections.game).insertOne(newGame).then(({ ops }) => ops[0]);

  console.log(newGameData);

  return newGameData;
}

export async function updateGame(id, data) {
  const { db } = await connectToDatabase();

  // TODO validate admin ids. So only the admin can update there own content

  const newGame = {
    updatedAt: Date.now(),
    ...data,
  };

  // Remove the adminID so it cant be switched to another user
  delete newGame.adminID;

  const newGameData = await db
    .collection(collections.game)
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: newGame },
      { returnOriginal: false },
    ).then(({ value }) => value);

  console.log(newGameData);

  return newGameData;
}

export async function loginGame(password, student) {
  if (password < 1 || password === '') {
    throw new UserInputError('No Password');
  }

  const defaultUser = {
    color: student.color.color,
    icon: student.icon,
    points: 0,
    tiles: [],
    name: `${capitalize(student.color.name)} ${capitalize(student.icon)}`,
  };

  const { db } = await connectToDatabase();
  const game = await db.collection(collections.game).findOne({ password });

  if (game === null) {
    throw new UserInputError('Game not found');
  }

  const newUser = await db.collection(collections.user).insertOne(defaultUser).then(({ ops }) => ops[0]);

  await db.collection(collections.game).updateOne({ _id: game._id }, { $push: { users: newUser._id } });

  game.userID = newUser._id;

  return game;
}
