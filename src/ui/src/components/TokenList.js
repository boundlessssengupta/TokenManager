var React = require('react/addons');
var Token = require('./Token');

var TokenActions = require('../actions/TokenActions');

var TokenList = React.createClass({
  handleTokenAdd: function() {
    TokenActions.generate(this.props.environmentUrl);
  },
  handleTokenRevokeAll: function() {
    TokenActions.revokeAll(this.props.environmentUrl);
  },
  render: function() {
    var createToken = function(token) {
      return (
        <Token data={token} />
      );
    };

    if (this.props.data && this.props.data.length > 0) {
      return (
        <div>
          <div className="token-title">
            <span>
              User Tokens ({this.props.data.length})
            </span>
            <span className="action" onClick={this.handleTokenAdd}>
              <i className="fa fa-plus"></i>
            </span>
            <span className="action" onClick={this.handleTokenRevokeAll}>
              <i className="fa fa-minus"></i>
            </span>
          </div>
          <div>
            {this.props.data.map(createToken)}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="token-title">
            <span>
              Tokens ({this.props.data.length})
            </span>
            <span className="action" onClick={this.handleTokenAdd}>
              <i className="fa fa-plus"></i>
            </span>
          </div>
          <div>
            <div className="token-list-header">No tokens have been generated yet.</div>
          </div>
        </div>
      );
    }
  }
});

module.exports = TokenList;
