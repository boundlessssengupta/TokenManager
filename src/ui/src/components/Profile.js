var React = require('react/addons');
var EnvironmentList = require('./EnvironmentList');

var Profile = React.createClass({
  getInitialState: function() {
    return {
      environmentList: []
    };
  },
  componentDidMount: function() {
    var url = this.props.data._links.environments.href;
    $.ajax({
      url: url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({
          environmentList: data._embedded.environments
        });
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
      <div key={this.props.data.appUsername} className="profile">
        <div className="profile-title">
          <span className="profile-bars">
            <i className="fa fa-bars" onClick={this.handleProfileExpansion}></i>
          </span>
          <span className="profile-del" onClick={this.handleProfileDelete}>
            <i className="fa fa-times"></i>
          </span>
          <span>Profile: {this.props.data.appUsername}</span>
        </div>
        <EnvironmentList environmentList={this.state.environmentList} />
      </div>
    );
  }
});

module.exports = Profile;
