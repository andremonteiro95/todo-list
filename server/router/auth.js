const express = require('express');
const db = require('../db');
const {
  hashPassword,
  checkPassword,
  generateAccessToken,
} = require('../utils/auth');

const router = express.Router();

router.post('/signup', function (req, res) {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    res.status(400);
    res.json({ error: 'Missing information.' });
    return;
  }

  const user = db.get('users').find({ email }).value();
  if (!!user) {
    res.status(409);
    res.json({ error: 'Email already exists.' });
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

  const token = generateAccessToken({ email, name });

  res.status(201);
  res.json({ token });
});

router.post('/login', function (req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    res.json({ error: 'Missing information.' });
    return;
  }

  const user = db.get('users').find({ email }).value();

  if (!user) {
    res.status(400);
    res.json({ error: 'Invalid credentials.' });
    return;
  }

  const isPasswordValid = checkPassword(password, user.password);

  if (!isPasswordValid) {
    res.status(400);
    res.json({ error: 'Invalid credentials.' });
    return;
  }

  const token = generateAccessToken({ email: user.email, name: user.name });

  res.status(200);
  res.json({ token });
});

module.exports = router;
