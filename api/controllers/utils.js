const crypto = require('crypto');

function hashPassword(password) {
  return new Promise((resolve, reject) => {
    const hasher = crypto.createHash('md5');
    hasher.update(password);
    const hashedString = hasher.digest('hex');
    resolve(hashedString);
  });
}


async function comparePassword(plainTextPassword, hashedPassword) {
  const hasher = crypto.createHash('md5');
  hasher.update(plainTextPassword);
  const newHash = hasher.digest('hex');
  return newHash === hashedPassword;
}

module.exports = {
  hashPassword,
  comparePassword,
};
