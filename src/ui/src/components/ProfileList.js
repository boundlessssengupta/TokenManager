var React = require('react/addons');
var Profile = require('./Profile');

var ProfileList = React.createClass({
  render: function() {
    var createProfile = function(profile) {
      return (
        <Profile data={profile} />
      );
    };
    return (
      <div>
        <h3>Currently there are {this.props.profiles.length} profile(s) available:</h3>
        <div>
          {this.props.profiles.map(createProfile)}
        </div>
      </div>
    );
  }
});

module.exports = ProfileList;
