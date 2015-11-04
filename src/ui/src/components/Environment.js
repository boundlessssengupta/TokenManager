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
    TokenActions.load(this.props.data._links.tokens.href);
    WorkspaceActions.load(this.props.data._links.workspaces.href);
  },
  handleEnvironmentDelete: function() {
    EnvironmentActions.delete(this.props.data._links.self.href.replace('{?projection}', ''));
  },
  render: function() {
    return (
      <div key={this.props.data._links.self.href} data-id={this.props.data._links.self.href} className='environment'>
        <div className='environment-title'>
          <span className='environment-name'>Environment: {this.props.data.name}</span>
          <span className='environment-del' onClick={this.handleEnvironmentDelete}>
            <i className='fa fa-times'></i>
          </span>
        </div>
        <div className='token-title'>App token: {this.props.data.appToken}</div>
        <div className='token-title'>GeoServer URL: {this.props.data.geoserverUrl}</div>
        <TokenList data={this.state.tokenList} environmentUrl={this.props.data._links.self.href.replace('{?projection}', '')} />
        <WorkspaceList data={this.state.workspaceList} />
      </div>
    );
  }
});

module.exports = Environment;
