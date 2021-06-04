const lowdb = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');

const adapter = new FileAsync('db.json');

const initDatabase = () => {
  return lowdb(adapter).then((db) => {
    db.defaults({ posts: [] }).write();
  });
};

module.exports = {
  init: initDatabase,
};
