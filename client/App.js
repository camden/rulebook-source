// @flow

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import { anchorate } from 'anchorate';

import Analytics from 'components/shared/Analytics';
import { getMarkdown } from 'utils';
import Home from 'components/home/Home';
import Rulebook from 'components/rulebook/Rulebook';
import CustomRulebook from 'components/rulebook/CustomRulebook';
import RootTheme from 'components/shared/RootTheme';

class App extends Component {
  render() {
    return (
      <RootTheme>
        <BrowserRouter>
          <div>
            <Route
              render={() => {
                window.scrollTo(0, 0);
                anchorate();
                return null;
              }}
            />
            <Switch>
              <Route path="/custom-rules" component={CustomRulebook} />
              <Route path="/rules/:rulebookName" component={Rulebook} />
              <Route path="/" component={Home} />
            </Switch>
            <Route component={Analytics} />
          </div>
        </BrowserRouter>
      </RootTheme>
    );
  }
}

export default App;
