const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../db');
const { authenticateUser } = require('../middleware/auth');

const router = express.Router();

router.put('/:id', authenticateUser, function (req, res) {
  const { email } = req.user;
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    res.status(400);
    res.json({ error: 'Missing information.' });
    return;
  }

  const project = db.get('projects').find({
    id,
    owner: email,
  });

  if (!project.value()) {
    res.sendStatus(403);
    return;
  }

  project.assign({ name });

  res.sendStatus(201);
});

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
