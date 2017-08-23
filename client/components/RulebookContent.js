// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const RulebookBody = styled.div`
  padding: 1rem 3rem 3rem;
  max-width: 65%;
  margin: 0 auto;
  @media (max-width: ${props => props.theme.media.mobile}) {
    padding: 1rem;
    max-width: 100%;
  }
`;

class RulebookContent extends Component {
  render() {
    return (
      <RulebookBody>
        {this.props.markdown}
      </RulebookBody>
    );
  }
}

RulebookContent.propTypes = {
  attributes: PropTypes.object.isRequired,
  markdown: PropTypes.node.isRequired,
  onSidebarToggleClick: PropTypes.func.isRequired,
};

export default RulebookContent;
