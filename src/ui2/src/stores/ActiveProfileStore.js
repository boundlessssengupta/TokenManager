'use strict';

var Reflux = require('reflux');
var ActiveProfileActions = require('../actions/ActiveProfileActions');

var ActiveProfileStore = Reflux.createStore({
  listenables: [ActiveProfileActions],
  getInitialState: function() {
    this.activeProfile = '';

    return this.activeProfile;
  },
  onToggle: function(profileName) {
    this.activeProfile = profileName;
    this.trigger(this.activeProfile);
  }
});

module.exports = ActiveProfileStore;
