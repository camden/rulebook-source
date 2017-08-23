// Application entrypoint.

// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import initReactFastClick from 'react-fastclick';

initReactFastClick();

ReactDOM.render(<App />, document.getElementById('react-root'));
