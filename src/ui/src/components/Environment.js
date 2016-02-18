var React = require('react/addons');
var Reflux = require('reflux');

var TokenStore = require('../stores/TokenStore');
var WorkspaceStore = require('../stores/WorkspaceStore');

var EnvironmentActions = require('../actions/EnvironmentActions');
var TokenActions = require('../actions/TokenActions');
var WorkspaceActions = require('../actions/WorkspaceActions');

var TokenList = require('./TokenList');
var WorkspaceList = require('./WorkspaceList');

var Environment = React.createClass({
  mixins: [Reflux.connect(TokenStore, 'tokenList'),
    Reflux.connect(WorkspaceStore, 'workspaceList')],
  componentDidMount: function() {
    var environment = this.props.data;
    var environmentUrl = environment._links.self.href.replace('{?projection}', '');
    var tokensUrl = environmentUrl + '/tokens';

    TokenActions.load(tokensUrl);
    WorkspaceActions.load(this.props.data._links.workspaces.href);
  },
  handleEnvironmentDelete: function() {
    var environment = this.props.data;
    var profile = this.props.profile;
    var environmentUrl = environment._links.self.href.replace('{?projection}', '');
    var allEnvironmentsUrl = profile._links.environments.href;

    EnvironmentActions.delete(environmentUrl, allEnvironmentsUrl);
  },
  render: function() {
    return (
      <div className='environment'>
        <div className='environment-title'>
          <span className='environment-name'>Environment: {this.props.data.name}</span>
          <span className='environment-del' onClick={this.handleEnvironmentDelete}>
            <i className='fa fa-times'></i>
          </span>
        </div>
        <div className='token-title'>App token: {this.props.data.appToken}</div>
        <div className='token-title'>GeoServer URL: <a href="{this.props.data.geoserverUrl}">{this.props.data.geoserverUrl}</a></div>
        <TokenList data={this.state.tokenList} environment={this.props.data} profile={this.props.profile} />
        <WorkspaceList data={this.state.workspaceList} environment={this.props.data} />
      </div>
    );
  }
});

module.exports = Environment;
