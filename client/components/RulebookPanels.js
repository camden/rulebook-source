// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import RulebookContent from 'components/RulebookContent';
import Sidebar from 'components/Sidebar';
import PageHeader from 'components/PageHeader';

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
    let offsetValue = -sidebarValues.width;
    if (this.state.sidebarOpen) {
      offsetValue = 0;
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
    const offset: string = this.calculateSidebarOffset();
    const transform: string = `translate3d(${offset}, 0, 0)`;
    const width = this.calculateSidebarWidth();
    return {
      transform,
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
