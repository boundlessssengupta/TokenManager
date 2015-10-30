var React = require('react/addons');
var Profile = require('./Profile');

var ProfileList = React.createClass({
  getInitialState: function() {
    return {
      expansionState: '+'
    };
  },
  render: function() {
    var createProfile = function(profile) {
      return (
        <Profile data={profile} />
      );
    };
    return (
      <div>
        {this.props.profiles.map(createProfile)}
      </div>
    );
  }
});

module.exports = ProfileList;
