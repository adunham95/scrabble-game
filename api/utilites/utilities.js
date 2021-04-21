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

const restrictedWords = ['fucker', 'Shitty', 'Retard'];

export function makeID(length) {
  const result = [];
  const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result.push(characters.charAt(Math.floor(Math.random()
* charactersLength)));
  }

  const word = result.join('').toUpperCase();

  // Word has a non suitable word as the password
  if (restrictedWords.some((value) => value.toUpperCase() === word)) {
    makeID(length);
  }

  return word;
}

export const capitalize = (s) => {
  if (typeof s !== 'string') return '';

  const textArray = s.split(/[\s,-]+/);
  const string = textArray.map((t) => t.charAt(0).toUpperCase() + t.slice(1));

  return string.join(' ');
};
