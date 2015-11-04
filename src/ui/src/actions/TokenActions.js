'use strict';

var Reflux = require('reflux');

var TokenActions = Reflux.createActions([
  'load',
  'generate',
  'revoke',
  'revokeAll'
]);

module.exports = TokenActions;
