import { UserInputError } from 'apollo-server-errors';
import { connectToDatabase, collections } from '../mongodb';
import { hashPassword, validatePassword } from '../utilities';

export async function setAdmin({ admin }) {
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

export async function loginAdmin({ admin }) {
  const { db } = await connectToDatabase();

  const adminAccountInfo = await db.collection(collections.admin).findOne({ email: admin.email });

  console.log(adminAccountInfo);

  if (adminAccountInfo === null) {
    throw new UserInputError('Email not found');
  }

  const match = await validatePassword(adminAccountInfo.hash, adminAccountInfo.salt, admin.password);

  if (!match) {
    throw new UserInputError('Password Error');
  }

  return {
    _id: adminAccountInfo._id,
    email: adminAccountInfo.email,
  };
}
