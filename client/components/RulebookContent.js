// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const RulebookBody = styled.div`padding: 1rem 3rem 3rem;`;

class RulebookContent extends Component {
  render() {
    return (
      <RulebookBody>
        <input
          type="button"
          onClick={this.props.onSidebarToggleClick}
          value="Toggle Sidebar"
        />
        <h1>
          {this.props.attributes.title}
        </h1>
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
