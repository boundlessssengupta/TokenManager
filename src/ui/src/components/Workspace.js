var React = require('react/addons');

var WorkspaceActions = require('../actions/WorkspaceActions');

var Workspace = React.createClass({
  handleWorkspaceAdd: function() {
    debugger;
    var environmentUrl = this.props.environment._links.self.href.replace('{?projection}', '');

    WorkspaceActions.add({
      name: this.props.data.name,
      environment: environmentUrl
    }, this.props.environment._links.workspaces.href);
  },
  handleWorkspaceDelete: function() {
    // var tokenUrl = this.props.data._links.self.href;
    // var allTokensUrl = this.props.data._embedded.environment._links.self.href.replace('{?projection}', '') + '/tokens';
    // TokenActions.revoke(tokenUrl, allTokensUrl);
  },
  render: function() {
    if (this.props.data.active) {
      return (
        <div className="workspace">
          <span className="workspace-name">{this.props.data.name}</span>
          <span className="action" onClick={this.handleWorkspaceDelete}>
            <i className="fa fa-check-square"></i>
          </span>
        </div>
      );
    } else {
      return (
        <div className="workspace">
          <span className="workspace-name">{this.props.data.name}</span>
          <span className="action" onClick={this.handleWorkspaceAdd}>
            <i className="fa fa-check-square-o"></i>
          </span>
        </div>
      );
    }
  }
});

module.exports = Workspace;
