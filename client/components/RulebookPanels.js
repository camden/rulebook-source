// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';

import RulebookContent from 'components/RulebookContent';
import Sidebar from 'components/Sidebar';
import styled from 'styled-components';

const Panel = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
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
  content: Function;

  constructor(props) {
    super(props);

    this.state = {
      sidebarOpen: true,
    };

    this.handleToggleSidebarClick = this.handleToggleSidebarClick.bind(this);
    this.content = this.content.bind(this);
  }

  calculateSidebarWidth(): string {
    return sidebarValues.width + sidebarValues.unit;
  }

  calculateSidebarDestinationOffset(): number {
    let offsetValue = -sidebarValues.offset;
    if (this.state.sidebarOpen) {
      offsetValue = sidebarValues.offset - sidebarValues.width;
    }
    return offsetValue;
  }

  calculateSidebarOffset({ currentSidebarOffset }): string {
    return currentSidebarOffset + sidebarValues.unit;
  }

  calculateContentOffset({ currentSidebarOffset }): string {
    const offsetValue = sidebarValues.width + currentSidebarOffset;
    return offsetValue + sidebarValues.unit;
  }

  handleToggleSidebarClick(): void {
    this.setState({
      sidebarOpen: !this.state.sidebarOpen,
    });
  }

  content({ currentSidebarOffset }) {
    return (
      <div>
        <Panel
          style={{
            left: this.calculateSidebarOffset({ currentSidebarOffset }),
            width: this.calculateSidebarWidth(),
          }}
        >
          <Sidebar tableOfContents={this.props.data.toc} />
        </Panel>
        <Panel
          style={{
            left: this.calculateContentOffset({
              currentSidebarOffset,
            }),
          }}
        >
          <RulebookContent
            attributes={this.props.data.front_matter}
            markdown={this.props.data.markdown}
            onSidebarToggleClick={this.handleToggleSidebarClick}
          />
        </Panel>
      </div>
    );
  }

  getSidebarTransitionStyle() {
    return {
      currentOffset: spring(this.calculateSidebarDestinationOffset()),
    };
  }

  render() {
    return (
      <Motion style={this.getSidebarTransitionStyle()}>
        {interpolatingStyle =>
          this.content({
            currentSidebarOffset: interpolatingStyle.currentOffset,
          })}
      </Motion>
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
