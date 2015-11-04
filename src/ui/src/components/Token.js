var React = require('react/addons');

var TokenActions = require('../actions/TokenActions');

var Token = React.createClass({
  handleTokenDelete: function() {
    var urlOfTokenToBeDeleted = this.props.data._links.self.href;
    var urlOfTokensToBeFetched = this.props.data._embedded.environment._links.self.href.replace('{?projection}', '') + '/tokens';
    TokenActions.revoke(urlOfTokenToBeDeleted, urlOfTokensToBeFetched);
  },
  render: function() {
    return (
      <div className="tokens">
        <span className="token-value">{this.props.data.tokenValue}</span>
        <span className="action" onClick={this.handleTokenDelete}>
          <i className="fa fa-times"></i>
        </span>
      </div>
    );
  }
});

module.exports = Token;
