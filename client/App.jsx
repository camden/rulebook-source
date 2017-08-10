import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import { getMarkdown } from 'utils';

import Home from 'components/Home';
import Rulebook from 'components/Rulebook';
import PageNotFound from 'components/PageNotFound';

class App extends Component {
  constructor() {
    super();
    console.log(getMarkdown());
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/rules/:rulebookName" component={Rulebook} />
          <Route component={PageNotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
