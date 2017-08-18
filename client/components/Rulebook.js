// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import frontMatter from 'front-matter';
import { Page, Row, Column } from 'hedron';

import Media from 'components/Media';
import RulebookContent from 'components/RulebookContent';
import ProgressBar from 'components/ProgressBar';
import Sidebar from 'components/Sidebar';
import { fetchRulebookData } from 'utils';
import { compileMarkdown } from 'markdown-utils';

const sidebarPercentage = {
  mobile: 0,
  desktop: 30,
};

export default class Rulebook extends Component {
  state: {
    ui: {
      sidebarOpen: boolean,
    },
    data: {
      front_matter: Object,
      markdown: string,
      toc: Array<Object>,
    },
    loading: boolean,
  };

  constructor(props) {
    super(props);

    this.state = {
      ui: {
        sidebarOpen: false,
      },
      data: {
        front_matter: {},
        markdown: '',
        toc: [],
      },
      loading: true,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const rulebookName = this.props.match.params.rulebookName + '.md';

    const response = await fetchRulebookData({
      rulebookName: rulebookName,
    });

    const rulebookData = response.data;

    if (!rulebookData) {
      throw new Error('response must have data property.');
    }

    // Base64 string decoding
    const content = atob(rulebookData);

    const markdown = frontMatter(content);

    const frontMatterData = markdown.attributes;

    const compiledMarkdown = compileMarkdown({
      markdown: markdown.body,
      glossary: frontMatterData.glossary,
    });

    const toc = compiledMarkdown.toc;
    const markdownData = compiledMarkdown.tree;

    this.setState({
      data: {
        front_matter: frontMatterData,
        markdown: markdownData,
        toc: toc,
      },
      loading: false,
    });
  }

  toggleSidebar() {
    const newUIState = Object.assign({}, this.state.ui, {
      sidebarOpen: !this.state.ui.sidebarOpen,
    });

    this.setState({
      ui: newUIState,
    });
  }

  render() {
    return (
      <Page fluid>
        <Row>
          <Media query={'mobile'}>
            {isMobile =>
              !isMobile
                ? <Sidebar
                    sidebarPercentage={sidebarPercentage}
                    tableOfContents={this.state.data.toc}
                  />
                : null}
          </Media>
          <RulebookContent
            onSidebarToggleClick={this.toggleSidebar.bind(this)}
            sidebarOpen={this.state.ui.sidebarOpen}
            sidebarPercentage={sidebarPercentage}
            markdown={this.state.data.markdown}
          />
        </Row>
        <ProgressBar loading={this.state.loading} />
      </Page>
    );
  }
}

Rulebook.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      rulebookName: PropTypes.string,
    }),
  }).isRequired,
};
