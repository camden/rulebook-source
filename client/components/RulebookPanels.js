// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FixedPage from 'react-fixed-page';

import Media from 'components/Media';
import RulebookContent from 'components/RulebookContent';
import Sidebar from 'components/Sidebar';
import PageHeader from 'components/PageHeader';

type SidebarValue = {
  width: number,
  unit: string,
};

const sidebarValues = {
  desktop: {
    width: 500,
    unit: 'px',
  },
  mobile: {
    width: 85,
    unit: 'vw',
  },
};

const HEADER_HEIGHT = '5rem';
const transitionTime = '250ms';

const PageContent = styled.div`
  margin-top: ${HEADER_HEIGHT};
  overflow-y: auto;
  position: relative;
`;

const Overlay = styled.div`
  pointer-events: ${props => (props.visible ? 'auto' : 'none')};
  background-color: ${props =>
    props.visible ? 'hsla(0, 0%, 0%, 0.1)' : 'transparent'};
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  transition: background-color ${transitionTime} ease;
`;

const SidebarWrapper = styled.div`
  transition: all ${transitionTime} ease;
  position: fixed;
  top: ${HEADER_HEIGHT};
  bottom: 0;
  left: 0;
  overflow-y: auto;
  z-index: 1;
  -webkit-overflow-scrolling: touch;
`;

class RulebookPanels extends Component {
  state: {
    sidebarOpen: boolean,
  };

  handleToggleSidebarClick: Function;
  closeSidebar: Function;
  content: Function;
  pageTitle: Function;
  pageMarkdown: Function;

  constructor(props) {
    super(props);

    this.state = {
      sidebarOpen: false,
    };

    this.handleToggleSidebarClick = this.handleToggleSidebarClick.bind(this);
    this.closeSidebar = this.closeSidebar.bind(this);
    this.content = this.content.bind(this);
    this.pageTitle = this.pageTitle.bind(this);
    this.pageMarkdown = this.pageMarkdown.bind(this);
  }

  calculateSidebarWidth({ isDesktop }): string {
    const currentSidebarValue: SidebarValue =
      sidebarValues[isDesktop ? 'desktop' : 'mobile'];

    return currentSidebarValue.width + currentSidebarValue.unit;
  }

  calculateSidebarOffset({ isDesktop }): string {
    const currentSidebarValue: SidebarValue =
      sidebarValues[isDesktop ? 'desktop' : 'mobile'];

    let offsetValue = -currentSidebarValue.width;
    if (this.state.sidebarOpen) {
      offsetValue = 0;
    }
    return offsetValue + currentSidebarValue.unit;
  }

  calculateContentOffset({ isDesktop }): string {
    const currentSidebarValue: SidebarValue =
      sidebarValues[isDesktop ? 'desktop' : 'mobile'];

    let offsetValue = 0;
    if (this.state.sidebarOpen) {
      offsetValue = currentSidebarValue.width;
    }
    return offsetValue + currentSidebarValue.unit;
  }

  calculateSidebarStyle({ isDesktop }): Object {
    const offset: string = this.calculateSidebarOffset({ isDesktop });
    const transform: string = `translate3d(${offset}, 0, 0)`;
    const width: string = this.calculateSidebarWidth({ isDesktop });

    return {
      width,
      transform,
    };
  }

  calculateContentStyle(): Object {
    return {
      flex: '1',
    };
  }

  handleToggleSidebarClick(): void {
    this.setState({
      sidebarOpen: !this.state.sidebarOpen,
    });
  }

  closeSidebar(): void {
    this.setState({
      sidebarOpen: false,
    });
  }

  pageTitle(): string {
    let title = this.props.data.front_matter.title;
    if (this.props.not_found) {
      title = 'Not Found';
    }
    return title;
  }

  pageMarkdown(): Object {
    let markdown = this.props.data.markdown;
    if (this.props.not_found) {
      markdown = (
        <div style={{ textAlign: 'center' }}>
          <h2>{`Rulebook '${this.props.rulebookName}' doesn't exist.`}</h2>
        </div>
      );
    }
    return markdown;
  }

  content(isDesktop: boolean) {
    return (
      <div
        style={{
          height: window.innerHeight + 'px',
          // This line is needed to fix stacking issues with progress bar
          opacity: 0.999,
        }}
      >
        <PageHeader
          rulebookName={this.props.rulebookName}
          height={HEADER_HEIGHT}
          onToggleSidebarClick={this.handleToggleSidebarClick}
          title={this.pageTitle()}
        />
        <SidebarWrapper style={this.calculateSidebarStyle({ isDesktop })}>
          <Sidebar
            rulebookName={this.props.rulebookName}
            glossary={
              this.props.not_found
                ? null
                : this.props.data.front_matter.glossary
            }
            tableOfContents={this.props.data.toc}
            onCloseSidebarClick={this.closeSidebar}
          />
        </SidebarWrapper>
        <PageContent>
          <Overlay
            visible={this.state.sidebarOpen}
            onClick={this.closeSidebar}
            onWheel={this.closeSidebar}
          />
          <RulebookContent
            style={this.calculateContentStyle()}
            glossary={
              this.props.not_found
                ? null
                : this.props.data.front_matter.glossary
            }
            markdown={this.pageMarkdown()}
          />
          <FixedPage fixed={this.state.sidebarOpen} />
        </PageContent>
      </div>
    );
  }

  render() {
    return (
      <Media query={'desktop'}>{isDesktop => this.content(isDesktop)}</Media>
    );
  }
}

RulebookPanels.propTypes = {
  rulebookName: PropTypes.string.isRequired,
  data: PropTypes.shape({
    front_matter: PropTypes.object.isRequired,
    markdown: PropTypes.array.isRequired,
    toc: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  not_found: PropTypes.bool,
};

export default RulebookPanels;
