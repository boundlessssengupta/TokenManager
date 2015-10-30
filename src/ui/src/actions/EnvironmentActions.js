'use strict';

var Reflux = require('reflux');

var EnvironmentActions = Reflux.createActions([
  'load',
  'add',
  'delete'
]);

module.exports = EnvironmentActions;
