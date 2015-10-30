'use strict';

var TokenManagerApp = require('./TokenManagerApp');
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

var content = document.getElementById('content');

var Routes = (
  <Route handler={TokenManagerApp}>
    <Route name="/" handler={TokenManagerApp}/>
  </Route>
);

Router.run(Routes, function (Handler) {
  React.render(<Handler/>, content);
});
