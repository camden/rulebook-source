// @flow

import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { Base64 } from 'js-base64';
import { safeLoad } from 'js-yaml';
import { Helmet } from 'react-helmet';
import { Link as ReactRouterLink, Route, Switch } from 'react-router-dom';

import LogoImageSource from 'assets/images/master_favicon.svg';

import type { RulebookType } from 'types';

import config from 'config';
import Browse from 'components/home/Browse';
import Page from 'components/home/Page';
import Link, { NavLink } from 'components/shared/Link';
import PageNotFound from 'components/home/PageNotFound';
import ProgressBar from 'components/shared/ProgressBar';
import HomeInner from 'components/home/HomeInner';
import { fetchAllRulebooks, fetchHomepageData, fetchPageData } from 'utils';

export default class Home extends Component {
  state: {
    loading: boolean,
  };

  constructor() {
    super();

    this.state = {
      loading: true,
      data: {
        pages: {
          about: '',
          howToHelp: '',
        },
        homepageData: {},
        allRulebooks: [],
      },
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const response = await fetchAllRulebooks();
    const allRulebooks = response.data;

    const homepageRes = await fetchHomepageData();
    const homepageYaml = Base64.decode(homepageRes.data);
    const homepageData = safeLoad(homepageYaml);

    const aboutRes = await fetchPageData({
      pageName: 'about',
    });
    const about = aboutRes.data;

    const howToHelpRes = await fetchPageData({
      pageName: 'how-to-help',
    });
    const howToHelp = howToHelpRes.data;

    this.setState({
      loading: false,
      data: {
        ...this.state.data,
        homepageData,
        pages: {
          about,
          howToHelp,
        },
        allRulebooks,
      },
    });
  }

  pageHead() {
    return (
      <Helmet defer={false}>
        <meta name="description" content={config.homeDescription} />
        <meta property="og:description" content={config.homeDescription} />
        <meta property="og:title" content={config.homeTitle} />
        <meta property="og:url" content={config.homeUrl} />
        <meta property="og:site_name" content={config.homeTitle} />
        <title>{config.homeTitle}</title>
      </Helmet>
    );
  }

  header() {
    return (
      <HomeHeader>
        <HeaderLogo>
          <LogoTitleLink to="/">
            <LogoImage src={LogoImageSource} />
            <LogoTitle>Rulebook.io</LogoTitle>
          </LogoTitleLink>
          <LogoSubtitle>Community-curated Rulebooks</LogoSubtitle>
        </HeaderLogo>
        <HeaderLinks>
          <HeaderLink exact to="/">
            Home
          </HeaderLink>
          <HeaderLink exact to="/about">
            About
          </HeaderLink>
          <HeaderLink exact to="/how-to-help">
            How to Help
          </HeaderLink>
          <HeaderLink exact to="/browse">
            Browse
          </HeaderLink>
        </HeaderLinks>
      </HomeHeader>
    );
  }

  footer() {
    return (
      <HomeFooter>
        Made with <AnimatedEmoji>💛</AnimatedEmoji> by{' '}
        <Link to="http://cam.bickel.io" target={'_blank'}>
          Camden Bickel
        </Link>
      </HomeFooter>
    );
  }

  render() {
    return (
      <div>
        {this.pageHead()}
        <ProgressBar loading={this.state.loading} />
        <HomeMain>
          {this.header()}
          <HomeBody>
            <Switch>
              <Route
                path="/"
                exact
                render={() => (
                  <HomeInner
                    allRulebooks={this.state.data.allRulebooks}
                    homepageData={this.state.data.homepageData}
                  />
                )}
              />
              <Route
                path="/about"
                exact
                render={() => <Page data={this.state.data.pages.about} />}
              />
              <Route
                path="/how-to-help"
                exact
                render={() => <Page data={this.state.data.pages.howToHelp} />}
              />
              <Route
                path="/browse"
                exact
                render={() => (
                  <Browse allRulebooks={this.state.data.allRulebooks} />
                )}
              />
              <Route component={PageNotFound} />
            </Switch>
            {this.footer()}
          </HomeBody>
        </HomeMain>
      </div>
    );
  }
}

const HomeMain = styled.div`
  max-width: 1000px;
  margin: 0 auto;

  padding: 1rem;
  @media (min-width: ${props => props.theme.media.desktop}) {
    padding: 3rem 4rem;
  }
`;

const HomeHeader = styled.div`
  margin-bottom: 3rem;
  @media (min-width: ${props => props.theme.media.desktop}) {
    margin-bottom: 3rem;
  }

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const HeaderLogo = styled.div`
  flex: 1 0 100%;

  @media (min-width: ${props => props.theme.media.desktop}) {
    flex: 1;
  }
`;

const HeaderLinks = styled.div`
  padding-top: 1rem;

  display: flex;
  flex-wrap: wrap;

  margin-top: 2rem;
  flex: 1;
  flex-basis: 100%;

  @media (min-width: ${props => props.theme.media.desktop}) {
    margin-top: 0;
    flex: 1;
  }
`;

const HeaderLink = styled(NavLink)`
  margin: 0 1rem;
  padding: 0.5rem;
  &.active {
    font-weight: bolder;
  }
`;

const LogoTitleLink = styled(ReactRouterLink)`
  text-decoration: none;
  color: ${props => props.theme.colors.black};
  display: flex;
  align-items: center;
`;

const LogoImage = styled.img`
  width: 2.5rem;
  margin-right: 1rem;
`;

const LogoTitle = styled.div`
  font-size: 2.5rem;
`;
const LogoSubtitle = styled.div`
  font-size: 1.5rem;
`;

const HomeBody = styled.div`
  min-height: 35vh;
`;

const HomeFooter = styled.div`
  margin-top: 4rem;
  padding: 1rem;
  text-align: center;
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
`;

const rainbow = keyframes`
  from {
    filter: hue-rotate(0deg);
  }

  to {
    filter: hue-rotate(360deg);
  }
`;

const AnimatedEmoji = styled.div`
  animation: ${pulse} 1s ease infinite, ${rainbow} 5s linear infinite;
  display: inline-block;
`;
