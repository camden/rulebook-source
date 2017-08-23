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

const RulebookTitle = styled.div`
  // This redundancy is for browsers
  // that don't support position: sticky
  position: relative;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  background-color: white;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.95);
`;

class RulebookContent extends Component {
  render() {
    return (
      <RulebookBody>
        <input
          type="button"
          onClick={this.props.onSidebarToggleClick}
          value="Toggle Sidebar"
        />
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
