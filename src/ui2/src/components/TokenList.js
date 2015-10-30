var React = require('react/addons');

var TokenList = React.createClass({
  render: function() {
    var createToken = function(token) {
      return token.tokenValue;
    };
    return (
      <div>
        <div className="token-title">Tokens ({this.props.data.length})</div>
        <div className="tokens">
          <span className="token-value">{this.props.data.map(createToken)}</span>
          <span className="action">Revoke</span>
        </div>
      </div>
    );
  }
});

module.exports = TokenList;
