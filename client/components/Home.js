// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

import config from 'config';
import ProgressBar from 'components/ProgressBar';
import Search from 'components/Search';

const HomeMain = styled.div`padding: 2rem;`;
const HomeHeader = styled.div`margin-bottom: 2rem;`;
const HomeBody = styled.div``;

const LogoTitle = styled.div`font-size: 2.5rem;`;

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

  header() {
    return (
      <Helmet defer={false}>
        <meta name="description" content={config.homeDescription} />
        <meta property="og:description" content={config.homeDescription} />
        <meta property="og:title" content={config.homeTitle} />
        <meta property="og:url" content={config.homeUrl} />
        <meta property="og:site_name" content={config.homeTitle} />
        <title>
          {config.homeTitle}
        </title>
      </Helmet>
    );
  }

  render() {
    return (
      <div>
        {this.header()}
        <ProgressBar loading={this.state.loading} />
        <HomeMain>
          <HomeHeader>
            <LogoTitle>Rulebook.io</LogoTitle>
          </HomeHeader>
          <HomeBody>
            <Search />
          </HomeBody>
        </HomeMain>
      </div>
    );
  }
}
