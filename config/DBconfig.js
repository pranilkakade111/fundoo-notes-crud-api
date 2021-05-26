'use strict';

const DEBUG_CONNECTING = 'Connecting to db server %s...';
const DEBUG_ALREADY_CONNECTED = 'Already connected to db server %s.';
const DEBUG_ALREADY_CONNECTING = 'Already connecting to db server %s.';
const DEBUG_CONNECTED = 'Successfully connected to db server %s.';
const DEBUG_CONNECTION_ERROR = 'An error has occured while connecting to db server %s.';

const blueBird = require('bluebird');
const debug = require('debug')('db');
const mongoose = require('mongoose');

const isState = function (state) {
  return mongoose.connection.readyState === mongoose.Connection.STATES[state];
};

/**
* @constructor
* @param {string} uri     - Mongoose connection URI.
* @see http://mongoosejs.com/docs/connections.html
* @param {object} options - Mongoose connection options.
*
*/
function MongoDBAdapter(uri, options) {
  this.uri = uri;
  this.options = options;
}

/**
   * @description Add connection listeners without adding more than one for each event.
   * This is done to avoid:
   *  'warning: possible EventEmitter memory leak detected. 11 listeners added'
   * More info: https://github.com/joyent/node/issues/5108
   */
MongoDBAdapter.prototype.addConnectionListener = function (event, cb) {
  const listeners = mongoose.connection.on;

  if (!listeners || !listeners[event] || listeners[event].length === 0) {
    mongoose.connection.once(event, cb.bind(this));
  }
};

/**
*@description Returns a promise that resolved when successfully connected to MongoDB URI,or rejected
* @returns {Promise} Returns promise
*/
MongoDBAdapter.prototype.connect = function () {
  return new blueBird((resolve, reject) => {
    if (isState('connected')) {
      debug(DEBUG_ALREADY_CONNECTED, this.uri);
      return resolve(this.uri);
    }

    this.addConnectionListener('error', function (err) {
      debug(DEBUG_CONNECTION_ERROR, this.uri);
      return reject(err);
    });

    this.addConnectionListener('open', function () {
      debug(DEBUG_CONNECTED, this.uri);
      return resolve(this.uri);
    });

    if (isState('connecting')) {
      debug(DEBUG_ALREADY_CONNECTING, this.uri);
    } else {
      debug(DEBUG_CONNECTING, this.uri);
      mongoose.connect(this.uri, this.options);
    }
  });
};

// Export the mongodb connection instance
module.exports = MongoDBAdapter;
