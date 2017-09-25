// @flow

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import { anchorate } from 'anchorate';

import Analytics from 'analytics';
import { getMarkdown } from 'utils';
import Home from 'components/Home';
import Rulebook from 'components/Rulebook';
import PageNotFound from 'components/PageNotFound';
import RootTheme from 'components/RootTheme';

class App extends Component {
  render() {
    return (
      <RootTheme>
        <BrowserRouter>
          <div>
            <Route
              render={() => {
                anchorate();
                return null;
              }}
            />
            <Switch>
              <Route path="/rules/:rulebookName" component={Rulebook} />
              <Route path="/" component={Home} />
              <Route component={PageNotFound} />
            </Switch>
            <Route component={Analytics} />
          </div>
        </BrowserRouter>
      </RootTheme>
    );
  }
}

export default App;
