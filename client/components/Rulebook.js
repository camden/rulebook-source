// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import frontMatter from 'front-matter';
import { Page, Row, Column } from 'hedron';

import Sidebar from 'components/Sidebar';
import { fetchRulebookData } from 'utils';
import { compileMarkdown } from 'markdown-utils';

export default class Rulebook extends Component {
  state: {
    data: {
      front_matter: Object,
      markdown: string,
      toc: Array<Object>,
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      data: {
        front_matter: {},
        markdown: '',
        toc: [],
      },
    };
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const rulebookName = this.props.match.params.rulebookName + '.md';

    const data = await fetchRulebookData({
      rulebookName: rulebookName,
    });

    const rulebookData = data.rulebookData;

    if (!rulebookData) {
      throw new Error('response must have rulebookData');
    }

    // Base64 string decoding
    const content = atob(rulebookData.content);

    const markdown = frontMatter(content);

    const frontMatterData = markdown.attributes;

    const compiledMarkdown = compileMarkdown(markdown.body);
    const toc = compiledMarkdown.toc;
    const markdownData = compiledMarkdown.tree;

    this.setState({
      data: {
        front_matter: frontMatterData,
        markdown: markdownData,
        toc: toc,
      },
    });
  }

  render() {
    return (
      <Page fluid>
        <Row>
          <Column md={3}>
            <Sidebar tableOfContents={this.state.data.toc} />
          </Column>
          <Column md={9}>
            <div>
              <h1>
                {this.props.match.params.rulebookName}
              </h1>
              <hr />
              <div>
                {this.state.data.markdown}
              </div>
            </div>
          </Column>
        </Row>
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
