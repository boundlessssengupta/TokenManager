var React = require('react/addons');
var Environment = require('./Environment');

var EnvironmentList = React.createClass({
  render: function() {
    var createEnvironment = function(environment) {
      return (
        <Environment data={environment} />
      );
    };
    return (
      <div>
        {this.props.environmentList.map(createEnvironment)}
      </div>
    );
  }
});

module.exports = EnvironmentList;
