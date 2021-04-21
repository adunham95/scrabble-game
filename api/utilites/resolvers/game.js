import { UserInputError } from 'apollo-server-errors';
import { ObjectId } from 'bson';
import { connectToDatabase, collections } from '../mongodb';
import { capitalize, hashPassword, makeID } from '../utilities';

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

  if (defaultGame.adminID < 1 || defaultGame.adminID === '') {
    throw new UserInputError('No Admin user Specified');
  }
  if (defaultGame.name < 1 || defaultGame.name === '') {
    throw new UserInputError('No Game name Specified');
  }

  async function generatePassword() {
    const password = makeID(6);

    const previousPassword = await db.collection(collections.game).find({ password });

    if (previousPassword.length > 0) {
      generatePassword();
    }

    console.log('password', password);
    return password;
  }

  const newGame = {
    ...defaultGame,
    createdAt: Date.now(),
    password: await generatePassword(),
    adminID: defaultGame.adminID,
    active: true,
  };

  const newGameData = await db.collection(collections.game).insertOne(newGame).then(({ ops }) => ops[0]);

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
    name: `${capitalize(student.color.name)} ${capitalize(student.color.name)}`,
  };

  const { db } = await connectToDatabase();
  const game = await db.collection(collections.game).findOne({ password });

  const newUser = await db.collection(collections.game).insertOne(defaultUser).then(({ ops }) => ops[0]);

  game.users = [...game.users, newUser];

  return game;
}
