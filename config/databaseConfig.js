const mongoose = require('mongoose');
const logger = require('../Logger/logger');

const dbconfig = require('./databaseUrl');

module.exports = (app) => {
/**
 * @description  Configuring the database
 */

  mongoose.Promise = global.Promise;

  /**
  * @description  Connecting to the database
  */

  mongoose.connect(dbconfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }).then(() => {
    console.log('Successfully connected to database....!!!!');
  }).catch((err) => {
    logger.log('error', 'Could Not connected to database....Now Exiting...', err);
    process.exit();
  });
};
