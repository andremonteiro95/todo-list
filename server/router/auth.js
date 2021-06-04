const express = require('express');
const db = require('../db');
const { hashPassword, checkPassword } = require('../utils/auth');

const router = express.Router();

router.use(function (req, res, next) {
  res.type('json');
  next();
});

router.post('/signup', function (req, res) {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    res.status(400);
    res.send({ error: 'Missing information' });
    return;
  }

  const hashedPassword = hashPassword(password);
  db.get('users')
    .push({
      email,
      name,
      password: hashedPassword,
    })
    .write();
  res.status(200);
  res.send();
});

router.post('/login', function (req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    res.send({ error: 'Missing information.' });
    return;
  }

  const user = db.get('users').find({ email }).value();

  if (!user) {
    res.status(400);
    res.send({ error: 'Invalid credentials.' });
    return;
  }

  const isPasswordValid = checkPassword(password, user.password);

  if (!isPasswordValid) {
    res.status(400);
    res.send({ error: 'Invalid credentials.' });
    return;
  }

  res.status(200);
  res.send();
});

module.exports = router;
