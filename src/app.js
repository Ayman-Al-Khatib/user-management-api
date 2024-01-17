require('express-async-errors'); // Import and use express-async-errors
const winston = require('winston');
const app = require('express')();
require('dotenv').config();
const config = require('config');
require('../start/execution')(app);

const port = config.get('server.port') || 3000;
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));
module.exports = server;
