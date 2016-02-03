'use strict';

var Reflux = require('reflux');

var WorkspaceActions = Reflux.createActions([
  'load',
  'add',
  'delete'
]);

module.exports = WorkspaceActions;
