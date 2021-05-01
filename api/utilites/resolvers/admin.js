import { UserInputError } from 'apollo-server-errors';
import { ObjectId } from 'bson';
import jwt from 'jsonwebtoken';
import { connectToDatabase, collections } from '../mongodb';
import { hashPassword, validatePassword } from '../utilities';

export async function setHost({ host }, context) {
  const { db } = await connectToDatabase();

  console.log(host);

  const prevHost = await db.collection(collections.host).find({ email: host.email }).toArray();

  if (prevHost > 0) {
    throw new UserInputError('Email Already has account');
  }

  const { hash, salt } = await hashPassword(host.password);

  const hostUser = {
    invite: host.invite ? host.invite : '',
    email: host.email,
    hash,
    salt,
  };

  const newHost = await db.collection(collections.host).insertOne(hostUser).then(({ ops }) => ops[0]);

  return newHost;
}

export async function getHost(id) {
  const { db } = await connectToDatabase();
  const host = await db.collection(collections.host).findOne({ _id: new ObjectId(id) });

  delete host.hash;
  delete host.salt;

  console.log(host);

  return host;
}

export async function loginHost({ host }, context) {
  const { db } = await connectToDatabase();

  const hostAccountInfo = await db.collection(collections.host).findOne({ email: host.email });

  // console.log(hostAccountInfo);

  if (hostAccountInfo === null) {
    throw new UserInputError('Email not found');
  }

  const match = await validatePassword(hostAccountInfo.hash, hostAccountInfo.salt, host.password);

  if (!match) {
    throw new UserInputError('Password Error');
  }

  const token = jwt.sign({ _id: hostAccountInfo._id }, 'secret');
  context.cookies.set('auth-token', token, {
    httpOnly: true,
    sameSite: 'lax',
    // here we put 6 hours, but you can put whatever you want (the shorter the safer, but also more annoying)
    maxAge: 6 * 60 * 60,
  });

  return {
    _id: hostAccountInfo._id,
    email: hostAccountInfo.email,
  };
}
