const { hash, compare } = require('bcrypt');
const saltRounds = 10;

async function hashPassword(password) {
  return await hash(password, saltRounds);
}

async function comparePassword(password, hash) {
  return await compare(password, hash);
}

module.exports = {
  hashPassword,
  comparePassword,
};
