const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function checkPassword(password, hash) {
  return bcrypt.compareSync(password, hash);
}

function hashPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

function generateAccessToken(payload) {
  return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '30 days' });
}

function verifyAccessToken(token) {
  return jwt.verify(token, process.env.TOKEN_SECRET);
}

module.exports = {
  checkPassword,
  hashPassword,
  generateAccessToken,
  verifyAccessToken,
};
