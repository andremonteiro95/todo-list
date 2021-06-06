const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../db');
const {
  authenticateUser,
  checkAccessToProject,
} = require('../middleware/auth');

const router = express.Router();

router.delete(
  '/:projectId/tasks/:taskId',
  authenticateUser,
  checkAccessToProject,
  function (req, res) {
    const { email } = req.user;
    const { projectId, taskId } = req.params;

    const entry = db.get('projects').find({
      id: projectId,
      owner: email,
    });
    const tasks = [...entry.value().tasks];
    const taskIndex = tasks.findIndex(({ id }) => id === taskId);

    if (taskIndex < 0) {
      res.sendStatus(400);
      return;
    }

    tasks.splice(taskIndex, 1);

    entry.assign({ tasks }).write();
    res.sendStatus(200);
  },
);

router.put(
  '/:projectId/tasks/:taskId',
  authenticateUser,
  checkAccessToProject,
  function (req, res) {
    const { email } = req.user;
    const { projectId, taskId } = req.params;
    const { description, done } = req.body;

    if (
      description != null &&
      (typeof description !== 'string' || !description.trim())
    ) {
      res.sendStatus(400);
      return;
    }

    const entry = db.get('projects').find({
      id: projectId,
      owner: email,
    });

    const tasks = [...entry.value().tasks];
    const taskIndex = tasks.findIndex(({ id }) => id === taskId);

    if (taskIndex < 0) {
      res.sendStatus(400);
      return;
    }

    const newTask = { ...tasks[taskIndex] };
    newTask.description = description || newTask.description;
    if (done != null) {
      if (done && !newTask.done) {
        newTask.done = new Date();
      }
      if (!done) {
        newTask.done = undefined;
      }
    }

    tasks[taskIndex] = newTask;

    entry.assign({ tasks }).write();
    res.status(200);
    res.json(newTask);
  },
);

router.post(
  '/:projectId/tasks',
  authenticateUser,
  checkAccessToProject,
  function (req, res) {
    const { email } = req.user;
    const { projectId } = req.params;
    const { description } = req.body;

    if (
      !description ||
      typeof description !== 'string' ||
      !description.trim()
    ) {
      res.sendStatus(400);
      return;
    }

    const entry = db.get('projects').find({
      id: projectId,
      owner: email,
    });

    const newItem = {
      id: uuidv4(),
      description,
      created: new Date(),
    };

    console.log(entry.value());

    const tasks = [...entry.value().tasks, newItem];

    entry.assign({ tasks }).write();
    res.status(201);
    res.json(newItem);
  },
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

  const id = uuidv4();
  const newItem = {
    id,
    name,
    tasks: [],
  };

  db.get('projects')
    .push({
      ...newItem,
      owner: email,
    })
    .write();

  res.status(201);
  res.json(newItem);
});

router.get('/', authenticateUser, function (req, res) {
  const { email } = req.user;

  const projects = db
    .get('projects')
    .filter({ owner: email })
    .value()
    .map(({ id, name, tasks }) => ({
      id,
      name,
      tasks,
    }));

  res.status(200);
  res.json(projects);
});

module.exports = router;
