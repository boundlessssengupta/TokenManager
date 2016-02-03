var React = require('react/addons');
var Workspace = require('./Workspace');

var WorkspaceActions = require('../actions/WorkspaceActions');

var WorkspaceList = React.createClass({
  handleSyncWithGeoServer: function() {
    WorkspaceActions.syncWithGeoServer('url');
  },
  render: function() {
    var createWorkspace = function(workspace) {
      return (
        <Workspace data={workspace} environment={this.props.environment} />
      );
    };
    return (
      <div>
        <div className="workspace-title">Workspaces ({this.props.data.length})
          <span className="action" onClick={this.handleSyncWithGeoServer}>
            <i className="fa fa-refresh"></i>
          </span>
        </div>
        <div className="workspaces">
          {this.props.data.map(createWorkspace, this)}
        </div>
      </div>
    );
  }
});

module.exports = WorkspaceList;
