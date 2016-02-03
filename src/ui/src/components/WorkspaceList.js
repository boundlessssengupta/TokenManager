var React = require('react/addons');
var Workspace = require('./Workspace');

var WorkspaceList = React.createClass({
  render: function() {
    var createWorkspace = function(workspace) {
      return (
        <Workspace data={workspace} environment={this.props.environment} />
      );
    };
    return (
      <div>
        <div className="workspace-title">Workspaces ({this.props.data.length})</div>
        <div className="workspaces">
          {this.props.data.map(createWorkspace, this)}
        </div>
      </div>
    );
  }
});

module.exports = WorkspaceList;
