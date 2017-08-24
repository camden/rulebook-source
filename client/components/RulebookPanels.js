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

const PanelWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const PageContent = styled.div`
  flex: 1;
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

  transition: all 225ms ease;
`;

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
    const width = this.calculateSidebarWidth({ isMobile });
    return {
      transform,
      width,
    };
  }

  calculateContentStyle({ isMobile }): Object {
    const left = this.calculateContentOffset({ isMobile });
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
      <PanelWrapper
        style={{
          height: window.innerHeight + 'px',
        }}
      >
        <PageHeader
          onToggleSidebarClick={this.handleToggleSidebarClick}
          title={this.props.data.front_matter.title || ''}
        />
        <PageContent>
          <Media query={'mobile'}>
            {isMobile =>
              <div>
                <Panel style={this.calculateSidebarStyle({ isMobile })}>
                  <Sidebar tableOfContents={this.props.data.toc} />
                </Panel>
                <Panel style={this.calculateContentStyle({ isMobile })}>
                  <RulebookContent
                    attributes={this.props.data.front_matter}
                    markdown={this.props.data.markdown}
                    onSidebarToggleClick={this.handleToggleSidebarClick}
                  />
                </Panel>
              </div>}
          </Media>
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
