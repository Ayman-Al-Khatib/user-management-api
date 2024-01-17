const winston = require('winston');

module.exports = function () {
  const logLevel = process.env.NODE_ENV === 'production' ? 'info' : 'debug';

  const baseLogTransports = [
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
    new winston.transports.File({
      filename: 'logs/info.log',
      level: 'info',
    }),
    new winston.transports.File({
      filename: 'logs/warn.log',
      level: 'warn',
    }),
  ];

  const transports =
    logLevel !== 'debug'
      ? baseLogTransports
      : baseLogTransports.concat(new winston.transports.File({ filename: 'logs/debug.log' }));

  winston.configure({
    transports: transports,
    format: winston.format.combine(
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      winston.format.json(),
    ),
  });

  if (logLevel === 'debug') {
    winston.add(
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple(),
          winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
          }),
        ),
        level: logLevel,
      }),
    );
  }

  process.on('uncaughtException', (ex) => {
    winston.error(`Synchronous Exception: ${ex.message}`, (err) => {
      process.exit(1);
    });
  });

  process.on('unhandledRejection', (ex) => {
    winston.error(`Asynchronous Exception: ${ex.message}`, (err) => {
      process.exit(1);
    });
  });

  winston.info('Application started.');
};
