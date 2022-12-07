import {useAuth} from '../hooks/ApiHooks';

// const bcrypt = require('bcryptjs');

// const getHash = (userId, password, salt) => {
//   const hashedUserId = bcrypt.hashSync(userId, '$2a$12$3TNWLZkSAp1FgvpfGJOg9u');
//   const hashedPassword = bcrypt.hashSync(
//     password,
//     '$2a$12$3TNWLZkSAp1FgvpfGJOg9u'
//   );
//   return {userId: hashedUserId, password: hashedPassword};
// };

const getHash = (userId, password, salt) => {
  const hashedUserId = crypt(userId, salt);
  const hashedPassword = crypt(password, salt);
  console.log('hashed username', hashedUserId);
  console.log('hashed password', hashedPassword);
  return {userId: hashedUserId, password: hashedPassword};
};

const generateHash = async (userId, password, salt) => {
  return getHash(userId, password, salt);
};

const crypt = (text, salt) => {
  const textToChars = (text) => text.split('').map((c) => c.charCodeAt(0));
  const byteHex = (n) => ('0' + Number(n).toString(16)).substr(-2);
  const applySaltToChar = (code) =>
    textToChars(salt).reduce((a, b) => a ^ b, code);

  return text
    .split('')
    .map(textToChars)
    .map(applySaltToChar)
    .map(byteHex)
    .join('');
};

export {getHash, generateHash};
