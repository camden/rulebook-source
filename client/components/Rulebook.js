// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import frontMatter from 'front-matter';

import MarkdownRenderer from 'components/MarkdownRenderer';
import { fetchRulebookData } from 'utils';

export default class Rulebook extends Component {
  state: {
    data: {
      front_matter: Object,
      markdown: string,
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      data: {
        front_matter: {},
        markdown: '',
      },
    };
  }

  componentDidMount() {
    const rulebookName = this.props.match.params.rulebookName + '.md';

    fetchRulebookData({
      rulebookName: rulebookName,
    }).then(rulebookData => {
      const markdownData = rulebookData.markdownData;

      if (!markdownData) {
        throw new Error('response must have markdownData');
      }

      const content = frontMatter(markdownData);

      console.log(markdownData);
      console.log(content);
      this.setState({
        data: {
          front_matter: content.attributes,
          markdown: content.body,
        },
      });
    });
  }

  render() {
    return (
      <div>
        <h1>
          {this.props.match.params.rulebookName}
        </h1>
        <hr />
        <MarkdownRenderer markdownData={this.state.data.markdown} />
      </div>
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
