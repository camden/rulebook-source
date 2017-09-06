// Application entrypoint.

// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import initReactFastClick from 'react-fastclick';
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Open Sans:400,400i,700,700i'],
  },
});

initReactFastClick();

ReactDOM.render(<App />, document.getElementById('react-root'));
