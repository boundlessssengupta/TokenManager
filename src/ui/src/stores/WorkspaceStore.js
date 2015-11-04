'use strict';

var Reflux = require('reflux');
var HTTP = require('superagent');
var WorkspaceActions = require('../actions/WorkspaceActions');

var WorkspaceStore = Reflux.createStore({
  listenables: [WorkspaceActions],
  init: function() {
    this.listenTo(WorkspaceActions.load, this.fetchAll);
  },
  getInitialState: function() {
    this.workspaceList = [];
    return this.workspaceList;
  },
  fetchAll: function(url) {
    HTTP.get(url)
      .end(function(req, res) {
        this.workspaceList = (!JSON.parse(res.text)._embedded) ? [] : JSON.parse(res.text)._embedded.workspaces;
        this.trigger(this.workspaceList);
      }.bind(this)
    );
  }
});

module.exports = WorkspaceStore;
