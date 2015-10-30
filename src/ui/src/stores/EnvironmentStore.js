'use strict';

var Reflux = require('reflux');
var HTTP = require('superagent');
var EnvironmentActions = require('../actions/EnvironmentActions');

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
        this.environmentList = (!JSON.parse(res.text)._embedded) ? [] : JSON.parse(res.text)._embedded.environments;
        this.trigger(this.environmentList);
      }.bind(this)
    );
  },
  onAdd: function(environment) {
    var self = this;

    HTTP.put('http://localhost:8081/environments/' + environment.name)
      .set('Content-Type', 'application/json')
      .send(JSON.stringify({
        name: environment.name,
        appToken: environment.appToken,
        geoserverUrl: environment.geoserverUrl,
        profile: 'http://localhost:8081/environments' + environment.name + '/profile/' + environment.profile
      }))
      .end(function(req, res) {
        var location = res.headers.location;
        HTTP.get(location.concat('?projection=environmentWithProfileName'))
          .end(function(reqI, resI) {
            this.environmentList.push(JSON.parse(resI.text));
            this.trigger(this.environmentList);
          }.bind(self));
      }.bind(this));
  },
  onDelete: function(key) {
    var self = this;

    HTTP.del(key)
      .end(function() {
        HTTP.get('http://localhost:8081/environments')
          .end(function(reqI, resI) {
            this.environmentList = JSON.parse(resI.text)._embedded.environments;
            this.trigger(this.environmentList);
          }.bind(self));
      }.bind(this));
  }
});

module.exports = EnvironmentStore;
