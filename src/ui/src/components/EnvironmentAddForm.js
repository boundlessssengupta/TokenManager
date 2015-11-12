var React = require('react/addons');
var EnvironmentActions = require('../actions/EnvironmentActions');

var EnvironmentAddForm = React.createClass({
  getInitialState: function() {
    return {
      environmentName: '',
      geoServerUrl: ''
    };
  },
  handleEnvironmentNameChange: function(e) {
    var profile = this.props.profile;

    this.setState({
      environmentName: e.target.value,
      geoServerUrl: 'http://' + e.target.value + '.' +
        profile.applicationName + '.' + profile.owner + '/geoserver'
    });
  },
  handleGeoServerUrlChange: function(e) {
    this.setState({
      geoServerUrl: e.target.value
    });
  },
  handleSubmit: function(e) {
    e.preventDefault();

    var environmentName = this.state.environmentName;
    var geoServerUrl = this.state.geoServerUrl;
    var profile = this.props.profile;
    var profileLink = profile._links.self.href;
    var profileId = profileLink.substring(profileLink.lastIndexOf('/') + 1);
    var finalProfileUrl = '/' + environmentName + '/profile/' + profileId;

    if (environmentName && geoServerUrl) {
      EnvironmentActions.add({
        name: environmentName,
        appToken: 'somedummyvalue',
        geoserverUrl: geoServerUrl,
        profile: finalProfileUrl
      }, this.props.profile._links.environments.href);
    }
  },
  render: function() {
    return (
      <div>
        <h2>Add a new environment</h2>
        <form className="environment-add-form">
          <input type="text" placeholder="Enter environment name" value={this.state.environmentName} onChange={this.handleEnvironmentNameChange} id="environmentName" />
          <input type="text" placeholder="Enter GeoServer URL" value={this.state.geoServerUrl} onChange={this.handleGeoServerUrlChange} id="geoServerUrl" />
          <button onClick={this.handleSubmit}>Add Environment</button>
        </form>
      </div>
    );
  }
});

module.exports = EnvironmentAddForm;
