// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RulebookContent extends Component {
  content() {
    return (
      <div>
        <input
          type="button"
          onClick={this.props.onSidebarToggleClick}
          value="Toggle Sidebar"
        />
        <h1>
          {this.props.attributes.title}
        </h1>
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
  onSidebarToggleClick: PropTypes.func.isRequired,
};

export default RulebookContent;
