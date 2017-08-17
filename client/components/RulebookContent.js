// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { spring, Motion } from 'react-motion';

import Media from 'components/Media';

const HoveredDiv = styled.div`
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.24);
  background-color: white;
  overflow: hidden;
  position: relative;
  top: 0;
`;

const InnerContent = styled.div`
  padding: 1rem 3rem;
  margin: 0 auto;

  width: ${props => props.width};
  @media (max-width: ${props => props.theme.media.mobile}) {
    width: auto;
  }
`;

class RulebookContent extends Component {
  content({ translateX }) {
    return (
      <HoveredDiv
        style={{
          left: `${translateX}%`,
          width: `${100 - translateX}%`,
        }}
      >
        <InnerContent width={`${60 + translateX}%`}>
          <input
            type="button"
            value="Toggle Sidebar"
            onClick={this.props.onSidebarToggleClick}
          />
          {this.props.markdown}
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
              this.content({ translateX: interpolatedStyle.translateX })}
          </Motion>}
      </Media>
    );
  }
}

RulebookContent.propTypes = {
  markdown: PropTypes.node.isRequired,
  sidebarPercentage: PropTypes.shape({
    mobile: PropTypes.number.isRequired,
    desktop: PropTypes.number.isRequired,
  }).isRequired,
  sidebarOpen: PropTypes.bool.isRequired,
  onSidebarToggleClick: PropTypes.func.isRequired,
};

export default RulebookContent;