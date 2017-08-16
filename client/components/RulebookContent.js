// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { spring, Motion } from 'react-motion';

const HoveredDiv = styled.div`
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.24);
  background-color: white;
  position: relative;
  top: 0;
`;

const InnerContent = styled.div`
  padding: 1rem 3rem;
  margin: 0 auto;
  width: ${props => props.width};
`;

class RulebookContent extends Component {
  render() {
    return (
      // TODO add stiffness to spring etc
      <Motion
        style={{
          translate: spring(
            this.props.sidebarOpen ? this.props.sidebarPercentage : 0
          ),
        }}
      >
        {interpolatedStyle =>
          <HoveredDiv
            style={{
              left: `${interpolatedStyle.translate}%`,
              width: `${100 - interpolatedStyle.translate}%`,
            }}
          >
            <InnerContent width={`${60 + interpolatedStyle.translate}%`}>
              <input
                type="button"
                value="Toggle Sidebar"
                onClick={this.props.onSidebarToggleClick}
              />
              {this.props.markdown}
            </InnerContent>
          </HoveredDiv>}
      </Motion>
    );
  }
}

RulebookContent.propTypes = {
  markdown: PropTypes.node.isRequired,
  sidebarPercentage: PropTypes.number.isRequired,
  sidebarOpen: PropTypes.bool.isRequired,
  onSidebarToggleClick: PropTypes.func.isRequired,
};

export default RulebookContent;
