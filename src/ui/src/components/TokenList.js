var React = require('react/addons');
var Token = require('./Token');
var TokenAddForm = require('./TokenAddForm');

var TokenActions = require('../actions/TokenActions');

var TokenList = React.createClass({
  // handleTokenAdd: function() {
  //   var environment = this.props.environment;
  //   var environmentUrl = environment._links.self.href.replace('{?projection}', '');
  //   var allTokensUrl = environmentUrl + '/tokens';
  //
  //   TokenActions.generate({
  //     tokenValue: 'somedummyvalue',
  //     environment: environmentUrl
  //   }, allTokensUrl);
  // },
  handleTokenRevokeAll: function() {
    var environment = this.props.environment;
    var environmentUrl = environment._links.self.href.replace('{?projection}', '');
    var allTokensUrl = environmentUrl + '/tokens';

    TokenActions.revokeAll(allTokensUrl);
  },
  shouldComponentUpdate: function(nextProps) {
    var applicationName = nextProps.profile.applicationName;
    var environmentName = nextProps.environment.name;
    var tokenList = nextProps.data;

    if (tokenList) {
      if (tokenList.length === 0) {
        return true;
      }

      if (tokenList[0] && tokenList[0]._embedded) {
        var applicationNameFromToken = tokenList[0]._embedded.environment.profile.applicationName;
        var environmentNameFromToken = tokenList[0]._embedded.environment.name;

        if (applicationNameFromToken && environmentNameFromToken) {
          if ((applicationNameFromToken === applicationName) &&
                (environmentNameFromToken === environmentName)) {
            return true;
          }
        }
      }
    }

    return false;
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
            <span className="action" onClick={this.handleTokenRevokeAll}>
              <i className="fa fa-minus"></i>
            </span>
          </div>
          <div>
            <TokenAddForm environment={this.props.environment} />
          </div>
          <div>
            {this.props.data.map(createToken, this.props)}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="token-title">
            <span>
              User Tokens ({this.props.data.length})
            </span>
          </div>
          <div>
            <TokenAddForm environment={this.props.environment} />
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
