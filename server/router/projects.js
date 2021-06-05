const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../db');
const {
  authenticateUser,
  checkAccessToProject,
} = require('../middleware/auth');

const router = express.Router();

router.post(
  '/:projectId/list',
  authenticateUser,
  checkAccessToProject,
  function (req, res) {},
);

router.delete(
  '/:projectId',
  authenticateUser,
  checkAccessToProject,
  function (req, res) {
    const { projectId: id } = req.params;

    db.get('projects').remove({ id }).write();
    res.sendStatus(200);
  },
);

router.put(
  '/:projectId',
  authenticateUser,
  checkAccessToProject,
  function (req, res) {
    const { email } = req.user;
    const { projectId: id } = req.params;

    const { name } = req.body;
    if (!name || typeof name !== 'string' || !name.trim()) {
      res.status(400);
      res.json({ error: 'Missing information.' });
      return;
    }

    db.get('projects')
      .find({
        id,
        owner: email,
      })
      .assign({ name })
      .write();

    res.sendStatus(200);
  },
);

router.post('/', authenticateUser, function (req, res) {
  const { email } = req.user;
  const { name } = req.body;

  if (!name) {
    res.status(400);
    res.json({ error: 'Missing information.' });
    return;
  }

  db.get('projects')
    .push({
      id: uuidv4(),
      name,
      owner: email,
      list: [],
    })
    .write();

  res.sendStatus(201);
});

router.get('/', authenticateUser, function (req, res) {
  const { email } = req.user;

  const projects = db
    .get('projects')
    .filter({ owner: email })
    .value()
    .map(({ id, name, list }) => ({
      id,
      name,
      list,
    }));

  res.status(200);
  res.json(projects);
});

module.exports = router;
