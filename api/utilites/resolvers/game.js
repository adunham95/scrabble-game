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

export async function getGamesByHost(hostID) {
  const { db } = await connectToDatabase();
  const game = await db.collection(collections.game).find({ hostID }).toArray();
  return game;
}

export async function setGame(data, context) {
  const { db } = await connectToDatabase();
  const defaultGame = {
    players: [], hostID: '', rounds: 0, tiles: [], ...data.input,
  };

  if (defaultGame.hostID < 1 || defaultGame.hostID === '') {
    throw new UserInputError('No Host user Specified');
  }
  if (defaultGame.name < 1 || defaultGame.name === '') {
    throw new UserInputError('No Game name Specified');
  }

  const newGame = {
    players: [],
    createdAt: Date.now(),
    password: '',
    hostID: defaultGame.hostID,
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

  // TODO validate host ids. So only the host can update there own content

  const newGame = {
    updatedAt: Date.now(),
    ...data,
  };

  // Remove the hsotID so it cant be switched to another user
  delete newGame.hostID;

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

export async function loginGame(password, player) {
  if (password < 1 || password === '') {
    throw new UserInputError('No Password');
  }

  const defaultPlayer = {
    color: player.color.color,
    icon: player.icon,
    points: 0,
    tiles: [],
    name: `${capitalize(player.color.name)} ${capitalize(player.icon)}`,
  };

  const { db } = await connectToDatabase();
  const game = await db.collection(collections.game).findOne({ password });

  if (game === null) {
    throw new UserInputError('Game not found');
  }

  const newPlayer = await db.collection(collections.player).insertOne(defaultPlayer).then(({ ops }) => ops[0]);

  await db.collection(collections.game).updateOne({ _id: game._id }, { $push: { players: newPlayer._id } });

  game.playerID = newPlayer._id;

  return game;
}
