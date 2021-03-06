const compression = require('compression');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const apiRouter = require('./router');

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(cookieParser());
app.use(
  cors({
    origin: isProduction ? false : '*',
  }),
);

app.use(express.static(path.join(__dirname, '../build')));
app.use('/api', apiRouter);
app.use((req, res) => {
  res.redirect('/');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

const port = isProduction ? process.env.PORT || 80 : 3001;
app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
