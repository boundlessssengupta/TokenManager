'use strict';

describe('UiApp', () => {
  let React = require('react/addons');
  let UiApp, component;

  beforeEach(() => {
    let container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    UiApp = require('components/UiApp.js');
    component = React.createElement(UiApp);
  });

  it('should create a new instance of UiApp', () => {
    expect(component).toBeDefined();
  });
});
