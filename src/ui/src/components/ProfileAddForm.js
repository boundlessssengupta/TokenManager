var React = require('react/addons');

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

    if (!profileName) {
      return;
    }

    this.props.onSubmit(profileName);
  },
  render: function() {
    return (
      <form className="profileAddForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Enter profile name" value={this.state.newProfileName} onChange={this.handleChange} />
        <button>Add Profile</button>
      </form>
    );
  }
});

module.exports = ProfileAddForm;
