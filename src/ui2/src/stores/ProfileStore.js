'use strict';

var Reflux = require('reflux');
var HTTP = require('superagent');
var ProfileActions = require('../actions/ProfileActions');

var ProfileStore = Reflux.createStore({
  listenables: [ProfileActions],
  init: function() {
    this.listenTo(ProfileActions.load, this.fetchAll);
  },
  getInitialState: function() {
    this.profileList = [];

    return this.profileList;
  },
  fetchAll: function() {
    HTTP.get('http://localhost:8081/profiles')
      .end(function(req, res) {
        this.profileList = JSON.parse(res.text)._embedded.profiles;
        this.trigger(this.profileList);
      }.bind(this)
    );
  },
  onAdd: function(appUsername) {
    var self = this;

    HTTP.post('http://localhost:8081/profiles')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify({
        appUsername: appUsername
      }))
      .end(function(req, res) {
        var location = res.headers.location;
        HTTP.get(location)
          .end(function(reqI, resI) {
            this.profileList.push(JSON.parse(resI.text));
            this.trigger(this.profileList);
          }.bind(self)
        );
      }.bind(this));
  },
  onDelete: function(key) {
    var self = this;

    HTTP.del(key)
      .end(function() {
        HTTP.get('http://localhost:8081/profiles')
          .end(function(reqI, resI) {
            this.profileList = JSON.parse(resI.text)._embedded.profiles;
            this.trigger(this.profileList);
          }.bind(self)
        );
      }.bind(this));
  }
});

module.exports = ProfileStore;
