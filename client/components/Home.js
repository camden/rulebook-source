// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

import config from 'config';
import ProgressBar from 'components/ProgressBar';
import Search from 'components/Search';

const HomeWrapper = styled.div`padding: 0 2rem;`;

export default class Home extends Component {
  state: {
    loading: boolean,
  };

  constructor() {
    super();

    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.setState({
      loading: false,
    });
  }

  rulebookInfo({ rulebookName }: { rulebookName: string }) {
    return (
      <div>
        <Link to={`/rules/${rulebookName}`}>
          {rulebookName}
        </Link>
      </div>
    );
  }

  render() {
    return (
      <HomeWrapper>
        <Helmet>
          <meta name="description" content={config.homeDescription} />
          <meta property="og:description" content={config.homeDescription} />
          <meta property="og:title" content={config.homeTitle} />
          <meta property="og:url" content={config.homeUrl} />
          <title>
            {config.homeTitle}
          </title>
        </Helmet>
        <ProgressBar loading={this.state.loading} />
        <h1>Welcome to Rulebook.io!</h1>
        <Search />
      </HomeWrapper>
    );
  }
}
