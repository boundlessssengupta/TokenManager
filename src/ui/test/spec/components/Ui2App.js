'use strict';

describe('Ui2App', () => {
  let React = require('react/addons');
  let Ui2App, component;

  beforeEach(() => {
    let container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    Ui2App = require('components/Ui2App.js');
    component = React.createElement(Ui2App);
  });

  it('should create a new instance of Ui2App', () => {
    expect(component).toBeDefined();
  });
});
