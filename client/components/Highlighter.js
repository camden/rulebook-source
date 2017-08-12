// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Highlighter extends Component {
  render() {
    const Wrapper = this.props.wrapper;

    return (
      <Wrapper>
        {this.props.textToHighlight}
      </Wrapper>
    );
  }
}

Highlighter.propTypes = {
  wrapper: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  textToHighlight: PropTypes.string.isRequired,
};

export default Highlighter;
