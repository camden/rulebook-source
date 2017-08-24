// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { default as MenuIcon } from 'components/icons/Menu';
import RulebookContent from 'components/RulebookContent';
import Sidebar from 'components/Sidebar';
import styled from 'styled-components';

const PanelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

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

const PageContent = styled.div`
  height: 100%;
  position: relative;
`;

const Panel = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  -webkit-overflow-scrolling: touch;
  overflow-y: scroll;

  transition: left 225ms ease;
`;

const PageHeader = styled.div`
  background-color: white;
  border-bottom: 1px solid ${props => props.theme.colors.border};

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;
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
      offsetValue = sidebarValues.width;
    }
    return offsetValue + sidebarValues.unit;
  }

  calculateSidebarStyle(): Object {
    const left = this.calculateSidebarOffset();
    const width = this.calculateSidebarWidth();
    return {
      left,
      width,
    };
  }

  calculateContentStyle(): Object {
    const left = this.calculateContentOffset();
    return {
      left: left,
    };
  }

  handleToggleSidebarClick(): void {
    this.setState({
      sidebarOpen: !this.state.sidebarOpen,
    });
  }

  content() {
    return (
      <PanelWrapper>
        <PageHeader>
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
        <PageContent>
          <Panel style={this.calculateSidebarStyle()}>
            <Sidebar tableOfContents={this.props.data.toc} />
          </Panel>
          <Panel style={this.calculateContentStyle()}>
            <RulebookContent
              attributes={this.props.data.front_matter}
              markdown={this.props.data.markdown}
              onSidebarToggleClick={this.handleToggleSidebarClick}
            />
          </Panel>
        </PageContent>
      </PanelWrapper>
    );
  }

  render() {
    return this.content();
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
