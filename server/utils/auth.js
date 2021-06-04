const bcrypt = require('bcryptjs');

function checkPassword(password, hash) {
  return bcrypt.compareSync(password, hash);
}

function hashPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

module.exports = {
  checkPassword,
  hashPassword,
};
