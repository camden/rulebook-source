// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

import config from 'config';
import Link from 'components/Link';
import ProgressBar from 'components/ProgressBar';
import Search from 'components/Search';

const HomeMain = styled.div`padding: 3rem 4rem;`;
const HomeHeader = styled.div`
  margin-bottom: 5rem;
  display: flex;
`;

const HeaderSection = styled.div`
  flex: 1;
  justify-content: ${props =>
    props.justifyContent ? props.justifyContent : 'flex-start'};
`;
const HeaderLink = styled(
  Link
)`display:inline-block; margin: 0 1rem; padding: 0.5rem`;

const LogoTitle = styled.div`font-size: 2.5rem;`;
const LogoSubtitle = styled.div`font-size: 1.5rem;`;

const HomeBody = styled.div``;

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
            <HeaderSection>
              <LogoTitle>Rulebook.io</LogoTitle>
              <LogoSubtitle>Community-curated Rulebooks</LogoSubtitle>
            </HeaderSection>
            <HeaderSection
              justifyContent={'flex-end'}
              style={{ textAlign: 'right' }}
            >
              <HeaderLink to="#">About</HeaderLink>
              <HeaderLink to="#">Contribute</HeaderLink>
            </HeaderSection>
          </HomeHeader>
          <HomeBody>
            <Search />
          </HomeBody>
        </HomeMain>
      </div>
    );
  }
}
