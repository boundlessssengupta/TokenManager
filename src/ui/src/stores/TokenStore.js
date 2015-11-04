'use strict';

var Reflux = require('reflux');
var HTTP = require('superagent');
var TokenActions = require('../actions/TokenActions');

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
        this.tokenList = (!JSON.parse(res.text)._embedded) ? [] : JSON.parse(res.text)._embedded.tokens;
        this.trigger(this.tokenList);
      }.bind(this)
    );
  },
  onGenerate: function(url) {
    var self = this;

    HTTP.post('http://localhost:8081/tokens/')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify({
        tokenValue: 'dummyValue',
        environment: url
      }))
      .end(function() {
        var location = url + '/tokens';
        HTTP.get(location)
          .end(function(reqI, resI) {
            this.tokenList = (!JSON.parse(resI.text)._embedded) ? [] : JSON.parse(resI.text)._embedded.tokens;
            this.trigger(this.tokenList);
          }.bind(self)
        );
      }.bind(this));
  },
  onRevoke: function(urlOfTokenToBeDeleted, urlOfTokensToBeFetched) {
    var self = this;

    HTTP.del(urlOfTokenToBeDeleted)
      .end(function() {
        HTTP.get(urlOfTokensToBeFetched)
          .end(function(reqI, resI) {
            this.tokenList = (!JSON.parse(resI.text)._embedded) ? [] : JSON.parse(resI.text)._embedded.tokens;
            this.trigger(this.tokenList);
          }.bind(self)
        );
      }.bind(this));
  },
  onRevokeAll: function(urlOfOwningEnvironment) {
    var self = this;

    HTTP.del(urlOfOwningEnvironment + '/tokens')
      .end(function() {
        HTTP.get(urlOfOwningEnvironment + '/tokens')
          .end(function(reqI, resI) {
            this.tokenList = (!JSON.parse(resI.text)._embedded) ? [] : JSON.parse(resI.text)._embedded.tokens;
            this.trigger(this.tokenList);
          }.bind(self)
        );
      }.bind(this));
  }
});

module.exports = TokenStore;
