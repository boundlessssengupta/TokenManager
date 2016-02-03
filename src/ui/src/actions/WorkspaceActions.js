'use strict';

var Reflux = require('reflux');

var WorkspaceActions = Reflux.createActions([
  'load',
  'add',
  'delete',
  'syncWithGeoServer'
]);

module.exports = WorkspaceActions;
