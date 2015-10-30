var React = require('react/addons');
var TokenList = require('./TokenList');
var WorkspaceList = require('./WorkspaceList');

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
  handleProfileExpansion: function() {
  },
  handleProfileDelete: function() {
  },
  render: function() {
    return (
      <div key={this.props.data.name} className="environment">
        <div className="environment-title">
          Environment: {this.props.data.name}
        </div>
        <TokenList data={this.state.tokenList} />
        <WorkspaceList data={this.state.workspaceList} />
      </div>
    );
  }
});

module.exports = Environment;
