'use strict';

var Reflux = require('reflux');
var HTTP = require('superagent');
var WorkspaceActions = require('../actions/WorkspaceActions');

var Constants = require('../Constants.js');
var BaseWorkspacesUrl = Constants.BaseUrl + '/workspaces';

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
  },
  onAdd: function(workspace, allWorkspacesUrl) {
    HTTP.post(BaseWorkspacesUrl)
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(workspace))
      .end(function() {
        this.fetchAll(allWorkspacesUrl);
      }.bind(this));
  },
  onDelete: function(workspaceUrl, allWorkspacesUrl) {
    HTTP.del(workspaceUrl)
      .end(function() {
        this.fetchAll(allWorkspacesUrl);
      }.bind(this));
  }
});

module.exports = WorkspaceStore;
