var React = require('react/addons');
var Reflux = require('reflux');

var EnvironmentStore = require('../stores/EnvironmentStore');
var ActiveProfileStore = require('../stores/ActiveProfileStore');

var ProfileActions = require('../actions/ProfileActions');
var ActiveProfileActions = require('../actions/ActiveProfileActions');
var EnvironmentActions = require('../actions/EnvironmentActions');

var EnvironmentList = require('./EnvironmentList');
var EnvironmentAddForm = require('./EnvironmentAddForm');

var Profile = React.createClass({
  mixins: [Reflux.connect(EnvironmentStore, 'environmentList'),
    Reflux.connect(ActiveProfileStore, 'activeProfile')],
  getInitialState: function() {
    return {
      profileDisplayState: false
    };
  },
  componentDidUpdate: function(nextProps) {
    var thisProfile = nextProps.data.appUsername;
    var activeProfile = this.state.activeProfile;

    if (thisProfile === activeProfile) {
      this.state.profileDisplayState = !this.state.profileDisplayState;

      if (this.state.profileDisplayState) {
        EnvironmentActions.load(this.props.data._links.environments.href);

        this.refs.profileBody.getDOMNode().className = 'profile-body-container-show-true';
      }
    } else {
      this.refs.profileBody.getDOMNode().className = 'profile-body-container-show-false';
    }
  },
  handleProfileToggle: function() {
    ActiveProfileActions.toggle(this.props.data.appUsername);
  },
  handleProfileDelete: function() {
    ProfileActions.delete(this.props.data._links.self.href);
  },
  render: function() {
    return (
      <div key={this.props.data._links.self.href} data-id={this.props.data._links.self.href} className="profile-container">
        <div className="profile-title-container">
          <span className="profile-name">Profile name: {this.props.data.appUsername}</span>
          <span className="profile-action">
            <i className="fa fa-toggle-down" onClick={this.handleProfileToggle}></i>
          </span>
          <span className="profile-action" onClick={this.handleProfileDelete}>
            <i className="fa fa-times"></i>
          </span>
        </div>
        <div className={'profile-body-container-show-' + this.state.profileDisplayState} ref="profileBody">
          <EnvironmentAddForm profile={this.props.data._links.self.href} />
          <EnvironmentList environments={this.state.environmentList} profile={this.props.data.appUsername} />
        </div>
      </div>
    );
  }
});

module.exports = Profile;
