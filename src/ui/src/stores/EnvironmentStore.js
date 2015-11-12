'use strict';

var Reflux = require('reflux');
var HTTP = require('superagent');
var EnvironmentActions = require('../actions/EnvironmentActions');

var Constants = require('../Constants.js');

var BaseEnvironmentsUrl = Constants.BaseUrl + '/environments';

var EnvironmentStore = Reflux.createStore({
  listenables: [EnvironmentActions],
  init: function() {
    this.listenTo(EnvironmentActions.load, this.fetchAll);
  },
  getInitialState: function() {
    this.environmentList = [];
    return this.environmentList;
  },
  fetchAll: function(url) {
    HTTP.get(url)
      .end(function(req, res) {
        this.process(res.text);
      }.bind(this)
    );
  },
  onAdd: function(environment, allEnvironmentsUrl) {
    HTTP.post(BaseEnvironmentsUrl)
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(environment))
      .end(function() {
        this.fetchAll(allEnvironmentsUrl);
      }.bind(this));
  },
  onDelete: function(environmentUrl, allEnvironmentsUrl) {
    HTTP.del(environmentUrl)
      .end(function() {
        this.fetchAll(allEnvironmentsUrl);
      }.bind(this));
  },
  process: function(jsonAsText) {
    this.environmentList = (!JSON.parse(jsonAsText)._embedded) ? [] :
      JSON.parse(jsonAsText)._embedded.environments;
    this.trigger(this.environmentList);
  }
});

module.exports = EnvironmentStore;
