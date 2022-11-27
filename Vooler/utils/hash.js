import {useAuth} from '../hooks/ApiHooks';

const {getSalt} = useAuth();
const bcrypt = require('bcryptjs');

const getHash = (userId, password, salt) => {
  const hashedUserId = bcrypt.hashSync(userId, salt);
  const hashedPassword = bcrypt.hashSync(password, salt);
  return {userId: hashedUserId, password: hashedPassword};
};

const generateHash = async (userId, password) => {
  var salt = await getSalt();
  return getHash(userId, password, salt.salt);
};

export {getHash, generateHash};
