// create crypt data before send to backend
const generateHash = async (userId, password, salt) => {
  const hashedUserId = crypt(userId, salt);
  let hashedPassword = '';
  if (password != '') {
    hashedPassword = crypt(password, salt);
  }
  return { userId: hashedUserId, password: hashedPassword };
};

// encoded function
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

export { generateHash };
