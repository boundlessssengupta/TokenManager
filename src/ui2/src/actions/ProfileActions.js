'use strict';

var Reflux = require('reflux');

var ProfileActions = Reflux.createActions([
  'load',
  'add',
  'delete'
]);

module.exports = ProfileActions;
