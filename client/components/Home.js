// @flow

import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { Helmet } from 'react-helmet';
import { Link as ReactRouterLink, Route, Switch } from 'react-router-dom';

import LogoImageSource from 'assets/images/master_favicon.svg';

import config from 'config';
import About from 'components/About';
import Contribute from 'components/Contribute';
import Link, { NavLink } from 'components/Link';
import PageNotFound from 'components/PageNotFound';
import ProgressBar from 'components/ProgressBar';
import Search from 'components/Search';

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

  text-align: center;
  margin-top: 2rem;
  flex: 1;
  flex-basis: 100%;

  @media (min-width: ${props => props.theme.media.desktop}) {
    text-align: right;
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

const LogoTitle = styled.div`font-size: 2.5rem;`;
const LogoSubtitle = styled.div`font-size: 1.5rem;`;

const HomeBody = styled.div`min-height: 35vh;`;

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
        <title>{config.homeTitle}</title>
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
              <HeaderLink exact to="/contribute">
                Contribute
              </HeaderLink>
            </HeaderLinks>
          </HomeHeader>
          <HomeBody>
            <Switch>
              <Route path="/" exact component={Search} />
              <Route path="/about" exact component={About} />
              <Route path="/contribute" exact component={Contribute} />
              <Route component={PageNotFound} />
            </Switch>
            <HomeFooter>
              Made with <AnimatedEmoji>💛</AnimatedEmoji> by{' '}
              <Link to="http://cam.bickel.io" target={'_blank'}>
                Camden Bickel
              </Link>
            </HomeFooter>
          </HomeBody>
        </HomeMain>
      </div>
    );
  }
}
