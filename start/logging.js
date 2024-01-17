const winston = require('winston');
const path = require('path');

module.exports = function () {
  const logLevel = process.env.NODE_ENV === 'production' ? 'info' : 'debug';
  const logDir = path.join('logs', process.env.NODE_ENV);

  const customFormat = winston.format.printf(({ level, message, timestamp }) => {
    return `\nTime: ${timestamp} \nLevel: [${level}] \nMessage: ${message}\n`;
  });

  const fileFormat = winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    customFormat,
  );

  const transports = [
    new winston.transports.File({
      filename: path.join(logDir, 'error.log'),
      level: 'error',
      format: fileFormat,
    }),
    new winston.transports.File({
      filename: path.join(logDir, 'combined.log'),
      format: fileFormat,
    }),
  ];

  winston.configure({
    level: logLevel,
    transports: transports,
    format: winston.format.json(),
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
          customFormat,
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
