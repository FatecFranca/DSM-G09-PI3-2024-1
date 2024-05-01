const crypto = require('crypto');

function hashPassword(password) {
  return new Promise((resolve, reject) => {
    const hasher = crypto.createHash('md5');
    hasher.update(password);
    const hashedString = hasher.digest('hex');
    resolve(hashedString);
  });
}

module.exports = { hashPassword };
