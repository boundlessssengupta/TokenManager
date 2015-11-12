var React = require('react/addons');
var ProfileActions = require('../actions/ProfileActions');

var ProfileAddForm = React.createClass({
  getInitialState: function() {
    return {
      applicationName: '',
      owner: ''
    };
  },
  handleApplicationNameChange: function(e) {
    this.setState({
      applicationName: e.target.value
    });
  },
  handleOwnerChange: function(e) {
    this.setState({
      owner: e.target.value
    });
  },
  handleSubmit: function(e) {
    e.preventDefault();

    var applicationName = this.state.applicationName;
    var owner = this.state.owner;

    if (applicationName && owner) {
      ProfileActions.add({
        applicationName: applicationName,
        owner: owner
      });
    }
  },
  render: function() {
    return (
      <div>
        <h3>Create a new application profile</h3>
        <form className="profileAddForm">
          <input type="text" placeholder="Enter application name" value={this.state.applicationName} onChange={this.handleApplicationNameChange} />
          <input type="text" placeholder="Enter owner" value={this.state.owner} onChange={this.handleOwnerChange} />
          <button onClick={this.handleSubmit}>Add Profile</button>
        </form>
      </div>
    );
  }
});

module.exports = ProfileAddForm;
