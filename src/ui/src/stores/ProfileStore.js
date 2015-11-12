'use strict';

var Reflux = require('reflux');
var HTTP = require('superagent');
var ProfileActions = require('../actions/ProfileActions');

var Constants = require('../Constants.js');

var BaseProfilesUrl = Constants.BaseUrl + '/profiles';

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
    HTTP.get(BaseProfilesUrl)
      .end(function(req, res) {
        this.process(res.text);
      }.bind(this)
    );
  },
  onAdd: function(profile) {
    HTTP.post(BaseProfilesUrl)
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(profile))
      .end(function() {
        this.fetchAll();
      }.bind(this));
  },
  onDelete: function(profileUrl) {
    HTTP.del(profileUrl)
      .end(function() {
        this.fetchAll();
      }.bind(this));
  },
  process: function(jsonAsText) {
    if (jsonAsText) {
      this.profileList = (!JSON.parse(jsonAsText)._embedded) ? [] :
        JSON.parse(jsonAsText)._embedded.profiles;
      this.trigger(this.profileList);
    }
  }
});

module.exports = ProfileStore;
