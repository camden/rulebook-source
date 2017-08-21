// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const OffsetDiv = styled.div`
  position: absolute;
  top: 0;
  left: ${props => props.offset};
  bottom: 0;
  overflow-y: auto;
`;

class RulebookContent extends Component {
  content() {
    return (
      <OffsetDiv
        offset={`${this.props.sidebarOffset.value}${this.props.sidebarOffset
          .unit}`}
      >
        {this.props.attributes.title}
        <input
          type="button"
          value="Toggle Sidebar"
          onClick={this.props.onSidebarToggleClick}
        />
        {this.props.markdown}
      </OffsetDiv>
    );
  }

  render() {
    return this.content();
  }
}

RulebookContent.propTypes = {
  attributes: PropTypes.object.isRequired,
  markdown: PropTypes.node.isRequired,
  sidebarOpen: PropTypes.bool.isRequired,
  onSidebarToggleClick: PropTypes.func.isRequired,
};

export default RulebookContent;
