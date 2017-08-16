// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { spring, Motion } from 'react-motion';

const HoveredDiv = styled.div`
  padding: 1rem 3rem;
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.24);
  background-color: white;
  position: absolute;
  top: 0;
  left: ${props => props.translate}%;
`;

class RulebookContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: true,
    };
  }

  componentDidMount() {}

  render() {
    return (
      // TODO add stiffness to spring etc
      <Motion
        style={{
          translate: spring(
            this.state.isOpen ? this.props.sidebarPercentage : 0
          ),
        }}
      >
        {interpolatedStyle =>
          <HoveredDiv translate={interpolatedStyle.translate}>
            {this.props.markdown}
          </HoveredDiv>}
      </Motion>
    );
  }
}

RulebookContent.propTypes = {
  markdown: PropTypes.node.isRequired,
  sidebarPercentage: PropTypes.number.isRequired,
};

export default RulebookContent;
