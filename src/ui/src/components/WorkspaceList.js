var React = require('react/addons');

var WorkspaceList = React.createClass({
  render: function() {
    var createWorkspace = function(workspace) {
      return workspace.name;
    };
    return (
      <div>
        <div className="workspace-title">Workspaces ({this.props.data.length})</div>
        <div className="workspaces">
          <span className="workspace-value">{this.props.data.map(createWorkspace)}</span>
          <span className="action">Remove</span>
        </div>
      </div>
    );
  }
});

module.exports = WorkspaceList;
