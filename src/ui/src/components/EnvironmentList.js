var React = require('react/addons');
var Environment = require('./Environment');

var EnvironmentList = React.createClass({
  render: function() {
    var createEnvironment = function(environment) {
      if (this.profile === environment.profile.appUsername) {
        return (
          <Environment data={environment} />
        );
      }
    };

    var environmentList = this.props.environments ? this.props.environments : [];

    if (environmentList && environmentList.length > 0) {
      return (
        <div>
          <div>
            {environmentList.map(createEnvironment, this.props)}
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
