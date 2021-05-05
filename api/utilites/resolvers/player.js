import { UserInputError } from 'apollo-server-errors';
import { ObjectId } from 'bson';
import { connectToDatabase, collections } from '../mongodb';
import { capitalize, makeID } from '../utilities';

async function getTiles(playerID, gameID) {
  const { db } = await connectToDatabase();
  const game = await db.collection(collections.game).findOne({ _id: new ObjectId(gameID) });
  console.log(game);
  return [];
}
