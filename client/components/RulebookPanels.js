// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Motion, spring, presets } from 'react-motion';
import { Menu as MenuIcon } from 'react-feather';

import RulebookContent from 'components/RulebookContent';
import Sidebar from 'components/Sidebar';
import styled from 'styled-components';

const HEADER_HEIGHT = '5rem';

const MenuToggle = styled.div`
  // To center align the icon
  display: flex;
  align-items: center;
  -webkit-tap-highlight-color: ${props => props.theme.colors.webkitTapDefault};

  cursor: pointer;
  padding: 1.5rem;
  transition: all 150ms linear;
  &:hover {
    color: #888;
  }
`;

const Panel = styled.div`
  position: absolute;
  top: ${props => props.verticalOffset};
  bottom: 0;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
`;

const PageHeader = styled.div`
  background-color: white;
  height: ${props => props.height};
  border-bottom: 1px solid ${props => props.theme.colors.border};

  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderSection = styled.div`flex: 1;`;

const RulebookTitle = styled.span`
  font-size: 2em;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
      sidebarOpen: false,
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
        <PageHeader height={HEADER_HEIGHT}>
          <HeaderSection>
            <MenuToggle onClick={this.handleToggleSidebarClick}>
              <MenuIcon />
            </MenuToggle>
          </HeaderSection>
          <RulebookTitle>
            {this.props.data.front_matter.title}
          </RulebookTitle>
          <HeaderSection />
        </PageHeader>
        <Panel
          verticalOffset={HEADER_HEIGHT}
          style={{
            left: this.calculateSidebarOffset({ currentSidebarOffset }),
            width: this.calculateSidebarWidth(),
          }}
        >
          <Sidebar tableOfContents={this.props.data.toc} />
        </Panel>
        <Panel
          verticalOffset={HEADER_HEIGHT}
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
      currentOffset: spring(
        this.calculateSidebarDestinationOffset(),
        presets.stiff
      ),
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
