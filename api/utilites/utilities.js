import crypto from 'crypto';
import badWords from '../../utilities/data/lang.json';

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

export function isProfane(string, customWords = []) {
  const badWordList = [...badWords.words, ...customWords];

  return badWordList
    .filter((word) => {
      const wordExp = new RegExp(`\\b${word.replace(/(\W)/g, '\\$1')}\\b`, 'gi');
      return wordExp.test(string);
    })
    .length > 0 || false;
}

export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export function isEven(value) {
  if (value % 2 == 0) return true;
  return false;
}

export function makeID(length) {
  const result = [];
  const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
  }

  const word = result.join('').toUpperCase();

  // console.log('word', word);

  // Word has a non suitable word as the password
  // console.log('isProfane', isProfane(word));
  if (isProfane(word)) {
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
