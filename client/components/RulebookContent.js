// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RulebookContent extends Component {
  content() {
    return (
      <div>
        {this.props.attributes.title}
        {this.props.markdown}
      </div>
    );
  }

  render() {
    return this.content();
  }
}

RulebookContent.propTypes = {
  attributes: PropTypes.object.isRequired,
  markdown: PropTypes.node.isRequired,
};

export default RulebookContent;
