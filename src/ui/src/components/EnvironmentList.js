var React = require('react/addons');
var Environment = require('./Environment');

var EnvironmentList = React.createClass({
  render: function() {
    var createEnvironment = function(environment) {
      return (
        <Environment data={environment} profile={this} />
      );
    };

    var environmentList = this.props.environments ? this.props.environments : [];

    if (environmentList && environmentList.length > 0) {
      return (
        <div>
          <h2>List of current environments</h2>
          <div>
            {environmentList.map(createEnvironment, this.props.profile)}
          </div>
        </div>
      );
    } else {
      return (
        <div className="environment-list-header">No environments found!!! Please add one.</div>
      );
    }
  }
});

module.exports = EnvironmentList;
