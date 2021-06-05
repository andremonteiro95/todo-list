const db = require('../db');
const { verifyAccessToken } = require('../utils/auth');

function authenticateUser(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  let payload;
  try {
    payload = verifyAccessToken(token);
  } catch (err) {
    return res.sendStatus(403);
  }

  req.user = payload;
  next();
}

function checkAccessToProject(req, res, next) {
  const { email } = req.user;
  const { projectId: id } = req.params;

  if (!id) {
    res.sendStatus(400);
    return;
  }

  const project = db
    .get('projects')
    .find({
      id,
      owner: email,
    })
    .value();

  console.log('[checkAccessToProject] project:', project);

  if (!project) {
    res.sendStatus(403);
    return;
  }

  next();
}

module.exports = { authenticateUser, checkAccessToProject };
