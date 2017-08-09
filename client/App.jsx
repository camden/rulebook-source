import React, { Component } from 'react';
import { getMarkdown } from 'utils';

class App extends Component {
  constructor() {
    super();
    console.log(getMarkdown());
  }

  render() {
    return <h1>Yo React :)</h1>;
  }
}
export default App;
