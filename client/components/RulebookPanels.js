// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RulebookContent from 'components/RulebookContent';
import Sidebar from 'components/Sidebar';
import styled from 'styled-components';

const Panel = styled.div`
  position: absolute;
  top: 0;
  left: ${props => props.offset};
  bottom: 0;
  overflow-y: auto;
  width: ${props => props.width || 'auto'};
`;

const sidebarValues = {
  offset: 300,
  width: 300,
  unit: 'px',
};

class RulebookPanels extends Component {
  state: {
    sidebarOpen: boolean,
  };

  handleToggleSidebarClick: Function;

  constructor(props) {
    super(props);

    this.state = {
      sidebarOpen: true,
    };

    this.handleToggleSidebarClick = this.handleToggleSidebarClick.bind(this);
  }

  calculateSidebarWidth(): string {
    return sidebarValues.width + sidebarValues.unit;
  }

  calculateSidebarOffset(): string {
    let offsetValue = -sidebarValues.offset;
    if (this.state.sidebarOpen) {
      offsetValue = sidebarValues.offset - sidebarValues.width;
    }

    return offsetValue + sidebarValues.unit;
  }

  calculateContentOffset(): string {
    let offsetValue = 0;
    if (this.state.sidebarOpen) {
      offsetValue = sidebarValues.offset;
    }

    return offsetValue + sidebarValues.unit;
  }

  handleToggleSidebarClick(): void {
    this.setState({
      sidebarOpen: !this.state.sidebarOpen,
    });
  }

  render() {
    return (
      <div>
        <Panel
          offset={this.calculateSidebarOffset()}
          width={this.calculateSidebarWidth()}
        >
          <Sidebar tableOfContents={this.props.data.toc} />
        </Panel>
        <Panel offset={this.calculateContentOffset()}>
          <RulebookContent
            attributes={this.props.data.front_matter}
            markdown={this.props.data.markdown}
            onSidebarToggleClick={this.handleToggleSidebarClick}
          />
        </Panel>
      </div>
    );
  }
}

RulebookPanels.propTypes = {
  data: PropTypes.shape({
    front_matter: PropTypes.object.isRequired,
    markdown: PropTypes.array.isRequired,
    toc: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

export default RulebookPanels;
