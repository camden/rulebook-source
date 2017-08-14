// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import frontMatter from 'front-matter';
import { Page, Row, Column } from 'hedron';

import ProgressBar from 'react-progress';

import Sidebar from 'components/Sidebar';
import { fetchRulebookData } from 'utils';
import { compileMarkdown } from 'markdown-utils';

const PROGRESS_INTERVAL_TIME = 500;

export default class Rulebook extends Component {
  state: {
    data: {
      front_matter: Object,
      markdown: string,
      toc: Array<Object>,
    },
    progress: {
      percent: number,
      interval: ?number,
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
      progress: {
        percent: 0,
        interval: null,
      },
    };
  }

  componentWillMount() {
    const interval = setInterval(
      this.incrementProgress.bind(this),
      PROGRESS_INTERVAL_TIME
    );

    const nextProgress = Object.assign({}, this.state.progress, { interval });

    this.setState({
      progress: nextProgress,
    });
  }

  componentDidMount() {
    this.loadData();
  }

  incrementProgress() {
    if (this.state.progress.percent >= 100) {
      return;
    }

    const remainingPercent = 100 - this.state.progress.percent;
    const toAdd = remainingPercent * Math.random() / 2;

    this.setState({
      progress: {
        percent: this.state.progress.percent + toAdd,
      },
    });
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

    const compiledMarkdown = compileMarkdown(markdown.body);
    const toc = compiledMarkdown.toc;
    const markdownData = compiledMarkdown.tree;

    if (this.state.progress.interval) {
      clearInterval(this.state.progress.interval);
    }

    this.setState({
      data: {
        front_matter: frontMatterData,
        markdown: markdownData,
        toc: toc,
      },
      progress: {
        interval: null,
        percent: 100,
      },
    });
  }

  render() {
    return (
      <Page fluid>
        <ProgressBar percent={this.state.progress.percent} />
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
