const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = function () {
  const database = `${process.env.BASE_DB}/${config.get('server.database')}`;
  mongoose
    .connect(database, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => winston.info(`Connected to ${database}...`));
};
