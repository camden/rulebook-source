// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Base64 } from 'js-base64';

import { compileMarkdown } from 'markdown-utils';
import { fetchPageData } from 'utils';

class Page extends Component {
  constructor() {
    super();
  }

  generateMarkdown(data) {
    // Base64 string decoding
    const pageContent = Base64.decode(data);

    const compiledMarkdown = compileMarkdown({
      markdown: pageContent,
    });

    return compiledMarkdown.tree;
  }

  render() {
    return <div>{this.generateMarkdown(this.props.data)}</div>;
  }
}

Page.defaultProps = {
  data: '',
};

Page.propTypes = {
  data: PropTypes.string,
};

export default Page;
