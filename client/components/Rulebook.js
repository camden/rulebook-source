// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
        This is the rulebook for {this.props.match.params.rulebookName}
        <pre>{this.state.data.markdown}</pre>
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
