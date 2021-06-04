const { verifyAccessToken } = require('../utils/auth');

function authenticateUser(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  console.log(authHeader);

  let payload;
  try {
    payload = verifyAccessToken(token);
  } catch (err) {
    return res.sendStatus(403);
  }

  req.user = payload;
  next();
}

module.exports = { authenticateUser };
