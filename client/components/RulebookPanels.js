// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
    width: 300,
    unit: 'px',
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
`;

class RulebookPanels extends Component {
  state: {
    sidebarOpen: boolean,
  };

  handleToggleSidebarClick: Function;
  closeSidebar: Function;
  content: Function;

  constructor(props) {
    super(props);

    this.state = {
      sidebarOpen: false,
    };

    this.handleToggleSidebarClick = this.handleToggleSidebarClick.bind(this);
    this.closeSidebar = this.closeSidebar.bind(this);
    this.content = this.content.bind(this);
  }

  calculateSidebarWidth({ isMobile }): string {
    const currentSidebarValue: SidebarValue =
      sidebarValues[isMobile ? 'mobile' : 'desktop'];

    return currentSidebarValue.width + currentSidebarValue.unit;
  }

  calculateSidebarOffset({ isMobile }): string {
    const currentSidebarValue: SidebarValue =
      sidebarValues[isMobile ? 'mobile' : 'desktop'];

    let offsetValue = -currentSidebarValue.width;
    if (this.state.sidebarOpen) {
      offsetValue = 0;
    }
    return offsetValue + currentSidebarValue.unit;
  }

  calculateContentOffset({ isMobile }): string {
    const currentSidebarValue: SidebarValue =
      sidebarValues[isMobile ? 'mobile' : 'desktop'];

    let offsetValue = 0;
    if (this.state.sidebarOpen) {
      offsetValue = currentSidebarValue.width;
    }
    return offsetValue + currentSidebarValue.unit;
  }

  calculateSidebarStyle({ isMobile }): Object {
    const offset: string = this.calculateSidebarOffset({ isMobile });
    const transform: string = `translate3d(${offset}, 0, 0)`;
    const width: string = this.calculateSidebarWidth({ isMobile });

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

  content() {
    return (
      <div
        style={{
          height: window.innerHeight + 'px',
        }}
      >
        <PageHeader
          height={HEADER_HEIGHT}
          onToggleSidebarClick={this.handleToggleSidebarClick}
          title={this.props.data.front_matter.title}
        />
        <Media query={'mobile'}>
          {isMobile =>
            <SidebarWrapper style={this.calculateSidebarStyle({ isMobile })}>
              <Sidebar
                glossary={this.props.data.front_matter.glossary}
                tableOfContents={this.props.data.toc}
                onCloseSidebarClick={this.closeSidebar}
              />
            </SidebarWrapper>}
        </Media>
        <PageContent>
          <Overlay
            visible={this.state.sidebarOpen}
            onClick={this.closeSidebar}
          />
          <RulebookContent
            style={this.calculateContentStyle()}
            glossary={this.props.data.front_matter.glossary}
            markdown={this.props.data.markdown}
          />
        </PageContent>
      </div>
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
