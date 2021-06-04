const compression = require('compression');
const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const apiRouter = require('./router');
const { initDatabase } = require('./db');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());

app.use(express.static(path.join(__dirname, '../build')));
app.use('/api', apiRouter);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

const port = process.env.PORT || 80;

initDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
  });
});