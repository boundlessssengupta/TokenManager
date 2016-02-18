var React = require('react/addons');
var TokenActions = require('../actions/TokenActions');

var TokenAddForm = React.createClass({
  getInitialState: function() {
    return {
      userName: ''
    };
  },
  handleUserNameChange: function(e) {
    this.setState({
      userName: e.target.value
    });
  },
  handleSubmit: function(e) {
    e.preventDefault();

    var userName = this.state.userName;

    if (userName) {
      var environment = this.props.environment;
      var environmentUrl = environment._links.self.href.replace('{?projection}', '');
      var allTokensUrl = environmentUrl + '/tokens';

      TokenActions.generate({
        tokenValue: 'somedummyvalue',
        userName: userName,
        environment: environmentUrl
      }, allTokensUrl);

      this.setState({
        userName: ''
      });
    }
  },
  render: function() {
    return (
      <div>
        <form className="token-add-form-container">
          <input type="text" placeholder="Enter user name" value={this.state.userName} onChange={this.handleUserNameChange} />
          <button onClick={this.handleSubmit}>Generate Token</button>
        </form>
      </div>
    );
  }
});

module.exports = TokenAddForm;
