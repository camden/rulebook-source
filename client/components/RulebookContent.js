// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { spring, Motion } from 'react-motion';

import Media from 'components/Media';

const contentHorizontalPadding = '3rem';

const PageTitle = styled.div`
  font-size: 2.25em;
  font-weight: bold;
  position: relative;
  top: 0;
  box-shadow: ${props => props.theme.shadows.light};
`;

const HoveredDiv = styled.div`
  box-shadow: ${props => props.theme.shadows.strong};
  background-color: white;
  overflow: hidden;
  position: relative;
  top: 0;
`;

const InnerContent = styled.div`
  margin: 0 auto;

  width: ${props => 60 + props.translateX}%;
  padding: 1rem ${contentHorizontalPadding};

  @media (max-width: ${props => props.theme.media.tablet}) {
    width: ${props => Math.min(80 + props.translateX, 100)}%;
  }

  @media (max-width: ${props => props.theme.media.mobile}) {
    padding: 1rem 1rem 2rem;
    width: auto;
  }
`;

const MarkdownContent = styled.div`
  padding-bottom: 3rem;
  @media (max-width: ${props => props.theme.media.mobile}) {
    padding-bottom: 2rem;
  }
`;

class RulebookContent extends Component {
  content({ isMobile, translateX }) {
    return (
      <HoveredDiv
        style={{
          left: `${translateX}%`,
          width: `${100 - translateX}%`,
        }}
      >
        <PageTitle>
          <InnerContent translateX={translateX}>
            {this.props.attributes.title}
          </InnerContent>
        </PageTitle>
        <InnerContent translateX={translateX}>
          {!isMobile
            ? <input
                type="button"
                value="Toggle Sidebar"
                onClick={this.props.onSidebarToggleClick}
              />
            : null}
          <MarkdownContent>
            {this.props.markdown}
          </MarkdownContent>
        </InnerContent>
      </HoveredDiv>
    );
  }

  sidebarTransitionStyle({ isMobile }) {
    let sidebarPercentage = this.props.sidebarPercentage.desktop;

    if (isMobile) {
      sidebarPercentage = this.props.sidebarPercentage.mobile;
    }

    return {
      translateX: spring(this.props.sidebarOpen ? sidebarPercentage : 0),
    };
  }

  render() {
    return (
      // TODO clean this up!!
      <Media query={'mobile'}>
        {isMobile =>
          // TODO add stiffness to spring etc
          <Motion style={this.sidebarTransitionStyle({ isMobile })}>
            {interpolatedStyle =>
              this.content({
                isMobile,
                translateX: interpolatedStyle.translateX,
              })}
          </Motion>}
      </Media>
    );
  }
}

RulebookContent.propTypes = {
  attributes: PropTypes.object.isRequired,
  markdown: PropTypes.node.isRequired,
  sidebarPercentage: PropTypes.shape({
    mobile: PropTypes.number.isRequired,
    desktop: PropTypes.number.isRequired,
  }).isRequired,
  sidebarOpen: PropTypes.bool.isRequired,
  onSidebarToggleClick: PropTypes.func.isRequired,
};

export default RulebookContent;
