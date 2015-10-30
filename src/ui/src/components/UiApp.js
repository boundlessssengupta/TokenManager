'use strict';

var ProfileAddForm = require('./ProfileAddForm');
var ProfileList = require('./ProfileList');
var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;

// CSS
require('normalize.css');
require('../styles/main.css');

var UiApp = React.createClass({
  getInitialState: function() {
    return {
      profileList: []
    };
  },
  addProfile: function(name) {
    var body = {
      'appUsername': name
    };
    if (name) {
      $.ajax({
        url: 'http://localhost:8081/profiles',
        method: 'POST',
        contentType: 'application/json;charset=utf-8',
        data: JSON.stringify(body),
        processData: false,
        cache: false,
        success: function(data, textStatus, jqXHR) {
          var location = jqXHR.getResponseHeader('Location');

          if (location) {
            $.ajax({
              url: location,
              dataType: 'json',
              cache: false,
              success: function(profile) {
                this.state.profileList.concat(profile);
              }
            });
          }
        },
        error: function(xhr, textStatus, errorThrown) {
          this.setState({
            textStatus: textStatus,
            errorThrown: errorThrown
          });
        }
      });
    }
  },
  componentDidMount: function() {
    $.ajax({
      url: 'http://localhost:8081/profiles',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({
          profileList: data._embedded.profiles
        });
      }.bind(this),
      error: function(xhr, textStatus, errorThrown) {
        this.setState({
          textStatus: textStatus,
          errorThrown: errorThrown
        });
      }.bind(this)
    });
  },
  render: function() {
    return (
      <div className="main">
        <ReactTransitionGroup transitionName="fade">
          <h3>Create a new profile</h3>
          <ProfileAddForm onSubmit={this.addProfile} />
          <h3>Or start working with an existing profile from below</h3>
          <ProfileList profiles={this.state.profileList} />
        </ReactTransitionGroup>
      </div>
    );
  }
});

module.exports = UiApp;
