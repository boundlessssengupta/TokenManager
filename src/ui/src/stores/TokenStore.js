'use strict';

var Reflux = require('reflux');
var HTTP = require('superagent');
var TokenActions = require('../actions/TokenActions');

var Constants = require('../Constants.js');

var BaseTokensUrl = Constants.BaseUrl + '/tokens';

var TokenStore = Reflux.createStore({
  listenables: [TokenActions],
  init: function() {
    this.listenTo(TokenActions.load, this.fetchAll);
  },
  getInitialState: function() {
    this.tokenList = [];
    return this.tokenList;
  },
  fetchAll: function(url) {
    HTTP.get(url)
      .end(function(req, res) {
        this.process(res.text);
      }.bind(this)
    );
  },
  onGenerate: function(token, allTokensUrl) {
    HTTP.post(BaseTokensUrl)
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(token))
      .end(function() {
        this.fetchAll(allTokensUrl);
      }.bind(this));
  },
  onRevoke: function(tokenUrl, allTokensUrl) {
    HTTP.del(tokenUrl)
      .end(function() {
        this.fetchAll(allTokensUrl);
      }.bind(this));
  },
  onRevokeAll: function(url) {
    HTTP.put(url)
      .set('Content-Type', 'text/uri-list')
      .send(' ')
      .end(function() {
        this.fetchAll(url);
      }.bind(this));
  },
  process: function(jsonAsText) {
    this.tokenList = (!JSON.parse(jsonAsText)._embedded) ? [] :
      JSON.parse(jsonAsText)._embedded.tokens;
    this.trigger(this.tokenList);
  }
});

module.exports = TokenStore;
