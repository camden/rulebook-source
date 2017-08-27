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
    width: 400,
    unit: 'px',
  },
  mobile: {
    width: 300,
    unit: 'px',
  },
};

const PanelWrapper = styled.div``;

const PageContent = styled.div`
  display: flex;
  position: relative;
  top: 5rem;
`;

const transitionTime = '250ms';

const Panel = styled.div`transition: all ${transitionTime} ease;`;

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
    const width: string = this.calculateSidebarWidth({ isMobile });
    const flex: string = '0 0';
    const flexBasis: string = this.state.sidebarOpen ? width : '0';

    return {
      width,
      transform,
      flex,
      flexBasis,
      overflow: 'hidden',
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

  content() {
    return (
      <PanelWrapper
        style={{
          height: window.innerHeight + 'px',
        }}
      >
        <PageHeader
          onToggleSidebarClick={this.handleToggleSidebarClick}
          title={this.props.data.front_matter.title}
        />
        <Media query={'mobile'}>
          {isMobile =>
            <PageContent>
              <Panel style={this.calculateSidebarStyle({ isMobile })}>
                <Sidebar
                  width={this.calculateSidebarWidth({ isMobile })}
                  glossary={this.props.data.front_matter.glossary}
                  tableOfContents={this.props.data.toc}
                />
              </Panel>
              <Panel style={this.calculateContentStyle()}>
                <RulebookContent
                  glossary={this.props.data.front_matter.glossary}
                  markdown={this.props.data.markdown}
                />
              </Panel>
            </PageContent>}
        </Media>
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
