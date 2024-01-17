const config = require('config');

module.exports = function () {
  if (!config.get('jwtPrivateKey')) {
    throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
  }
  if (!config.get('server.database')) {
    throw new Error('FATAL ERROR: database is not defined.');
  }
  if (!config.get('server.port')) {
    throw new Error('FATAL ERROR: port is not defined.');
  }
};
