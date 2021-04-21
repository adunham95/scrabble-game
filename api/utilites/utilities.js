import crypto from 'crypto';

export async function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

  return { salt, hash };
}

export async function validatePassword(hash, salt, inputPassword) {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, salt, 1000, 64, 'sha512')
    .toString('hex');
  const passwordsMatch = hash === inputHash;
  console.log('Password Match', passwordsMatch);
  return passwordsMatch;
}
