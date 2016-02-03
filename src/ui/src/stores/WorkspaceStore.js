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
        this.workspaceList.forEach(function (workspace) {
          workspace.active = true;
        });
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
  onDelete: function() {

  },
  onSyncWithGeoServer: function(url) {
      //   HTTP.get(url)
      // .auth('admin', 'geoserver')
      // .set('Accept', 'application/json')
      // .withCredentials()
    var response = '{"workspaces":{"workspace":[{"name":"it.geosolutions","href":"http:\/\/localhost:8080\/geoserver\/rest\/workspaces\/it.geosolutions.json"},{"name":"topp","href":"http:\/\/localhost:8080\/geoserver\/rest\/workspaces\/topp.json"}]}}';
    this.workspaceList = JSON.parse(response).workspaces.workspace;
    this.trigger(this.workspaceList);
  }
});

module.exports = WorkspaceStore;
