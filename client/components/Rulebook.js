// @flow

import React, { createElement, Component } from 'react';
import PropTypes from 'prop-types';

import MarkdownRenderer from 'components/MarkdownRenderer';
import { fetchRulebookData } from 'utils';

export default class Rulebook extends Component {
  state: {
    data: {
      markdown: string,
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      data: {
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

      this.setState({
        data: {
          markdown: markdownData,
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
