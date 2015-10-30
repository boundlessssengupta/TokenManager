var React = require('react/addons');
var TokenList = require('./TokenList');
var WorkspaceList = require('./WorkspaceList');
var EnvironmentActions = require('../actions/EnvironmentActions');

var Environment = React.createClass({
  getInitialState: function() {
    return {
      tokenList: [],
      workspaceList: []
    };
  },
  componentDidMount: function() {
    var tokenListUrl = this.props.data._links.tokens.href;
    $.ajax({
      url: tokenListUrl,
      dataType: 'json',
      cache: false,
      success: function(data) {
        var tokenList = [];

        if (data._embedded && data._embedded.tokens) {
          tokenList = {
            tokenList: data._embedded.tokens
          };
        }
        this.setState(tokenList);
      }.bind(this),
      error: function(xhr, textStatus, errorThrown) {
        this.setState({
          textStatus: textStatus,
          errorThrown: errorThrown
        });
      }.bind(this)
    });

    var workspaceListUrl = this.props.data._links.workspaces.href;
    $.ajax({
      url: workspaceListUrl,
      dataType: 'json',
      cache: false,
      success: function(data) {
        var workspaceList = [];
        if (data._embedded && data._embedded.workspaces) {
          workspaceList = {
            workspaceList: data._embedded.workspaces
          };
        }
        this.setState(workspaceList);
      }.bind(this),
      error: function(xhr, textStatus, errorThrown) {
        this.setState({
          textStatus: textStatus,
          errorThrown: errorThrown
        });
      }.bind(this)
    });
  },
  handleEnvironmentDelete: function() {
    EnvironmentActions.delete(this.props.data._links.self.href.replace('{?projection}', ''));
  },
  render: function() {
    return (
      <div key={this.props.data._links.self.href} data-id={this.props.data._links.self.href} className="environment">
        <div className="environment-title">
          <span className="environment-del" onClick={this.handleEnvironmentDelete}>
            <i className="fa fa-times"></i>
          </span>
          <span>Environment: {this.props.data.name}</span>
        </div>
        <div className="token-title">App token: {this.props.data.appToken}</div>
        <div className="token-title">GeoServer URL: {this.props.data.geoserverUrl}</div>
        <TokenList data={this.state.tokenList} />
        <WorkspaceList data={this.state.workspaceList} />
      </div>
    );
  }
});

module.exports = Environment;
