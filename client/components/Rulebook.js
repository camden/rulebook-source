import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { fetchRulebookData } from 'utils';

export default class Rulebook extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    fetchRulebookData(this.props.match.params.rulebookName);
  }

  render() {
    return (
      <div>
        This is the rulebook for {this.props.match.params.rulebookName}
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
