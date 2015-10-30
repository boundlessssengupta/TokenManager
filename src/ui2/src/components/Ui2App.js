'use strict';

var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;
var Reflux = require('reflux');

var ProfileActions = require('../actions/ProfileActions');
var ProfileStore = require('../stores/ProfileStore');
var ProfileAddForm = require('./ProfileAddForm');
var ProfileList = require('./ProfileList');

// CSS
require('normalize.css');
require('../styles/main.css');

var Ui2App = React.createClass({
  mixins: [Reflux.connect(ProfileStore, "profileList")],
  componentDidMount: function() {
    ProfileActions.load();
  },
  render: function() {
    return (
      <div className="main">
        <ReactTransitionGroup transitionName="fade">
          <ProfileAddForm />
          <ProfileList profiles={this.state.profileList} />
        </ReactTransitionGroup>
      </div>
    );
  }
});

module.exports = Ui2App;
