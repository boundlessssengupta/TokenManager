var React = require('react/addons');

var WorkspaceActions = require('../actions/WorkspaceActions');

var Workspace = React.createClass({
  handleWorkspaceAdd: function() {
    var environmentUrl = this.props.environment._links.self.href.replace('{?projection}', '');

    WorkspaceActions.add({
      name: this.props.data.name,
      environment: environmentUrl
    }, this.props.environment._links.workspaces.href);
  },
  handleWorkspaceDelete: function() {
    var workspaceUrl = this.props.data._links.self.href;

    WorkspaceActions.delete(workspaceUrl, this.props.environment._links.workspaces.href);
  },
  render: function() {
    if (this.props.data.registered) {
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
