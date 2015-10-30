var React = require('react/addons');
var ProfileActions = require('../actions/ProfileActions');

var ProfileAddForm = React.createClass({
  getInitialState: function() {
    return {
      newProfileName: ''
    };
  },
  handleChange: function(e) {
    this.setState({
      newProfileName: e.target.value
    });
  },
  handleSubmit: function(e) {
    e.preventDefault();

    var profileName = this.state.newProfileName;

    if (profileName) {
      ProfileActions.add(profileName);
    }
  },
  render: function() {
    return (
      <div>
        <h3>Create a new profile</h3>
        <form className="profileAddForm">
          <input type="text" placeholder="Enter profile name" value={this.state.newProfileName} onChange={this.handleChange} />
          <button onClick={this.handleSubmit}>Add Profile</button>
        </form>
      </div>
    );
  }
});

module.exports = ProfileAddForm;
