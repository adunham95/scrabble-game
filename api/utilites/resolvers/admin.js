import { UserInputError } from 'apollo-server-errors';
import { ObjectId } from 'bson';
import jwt from 'jsonwebtoken';
import { connectToDatabase, collections } from '../mongodb';
import { hashPassword, validatePassword } from '../utilities';

export async function setAdmin({ admin }, context) {
  const { db } = await connectToDatabase();

  console.log(admin);

  const prevAdmin = await db.collection(collections.admin).find({ email: admin.email }).toArray();

  if (prevAdmin.length > 0) {
    throw new UserInputError('Email Already has account');
  }

  const { hash, salt } = await hashPassword(admin.password);

  const adminUser = {
    invite: admin.invite ? admin.invite : '',
    email: admin.email,
    hash,
    salt,
  };

  const newAdmin = await db.collection(collections.admin).insertOne(adminUser).then(({ ops }) => ops[0]);

  return newAdmin;
}

export async function getAdmin(id) {
  const { db } = await connectToDatabase();
  const admin = await db.collection(collections.admin).findOne({ _id: new ObjectId(id) });

  delete admin.hash;
  delete admin.salt;

  console.log(admin);

  return admin;
}

export async function loginAdmin({ admin }, context) {
  const { db } = await connectToDatabase();

  const adminAccountInfo = await db.collection(collections.admin).findOne({ email: admin.email });

  // console.log(adminAccountInfo);

  if (adminAccountInfo === null) {
    throw new UserInputError('Email not found');
  }

  const match = await validatePassword(adminAccountInfo.hash, adminAccountInfo.salt, admin.password);

  if (!match) {
    throw new UserInputError('Password Error');
  }

  const token = jwt.sign({ _id: adminAccountInfo._id }, 'secret');
  context.cookies.set('auth-token', token, {
    httpOnly: true,
    sameSite: 'lax',
    // here we put 6 hours, but you can put whatever you want (the shorter the safer, but also more annoying)
    maxAge: 6 * 60 * 60,
  });

  return {
    _id: adminAccountInfo._id,
    email: adminAccountInfo.email,
  };
}
