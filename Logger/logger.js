const {
  createLogger,
  transports,
  format,
  info,
} = require('winston');

const logger = createLogger({
  transports: [
    new transports.File({
      filename: './Logger/info.log',
      level: 'info',
      format: format.combine(format.timestamp(), format.json()),
    }),

    new transports.File({
      filename: './Logger/error.log',
      level: 'error',
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});

module.exports = logger;
