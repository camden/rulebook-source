// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { spring, Motion } from 'react-motion';

const HoveredDiv = styled.div`
  padding: 1rem 3rem;
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.24);
  transform: translate3d(${props => props.translate}%, 0, 0);
`;

class RulebookContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  componentDidMount() {}

  render() {
    return (
      <Motion style={{ translate: spring(this.state.isOpen ? -10 : 0) }}>
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
};

export default RulebookContent;
