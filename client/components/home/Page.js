// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Base64 } from 'js-base64';
import { Helmet } from 'react-helmet';

import { compileMarkdown } from 'markdown-utils';
import TableOfContents from 'components/rulebook/TableOfContents';

class Page extends Component {
  constructor() {
    super();
  }

  generateMarkdown(data) {
    // Base64 string decoding
    const pageContent = Base64.decode(data);

    const compiledMarkdown = compileMarkdown({
      anchorOffset: false,
      markdown: pageContent,
    });

    return compiledMarkdown;
  }

  render() {
    const markdown = this.generateMarkdown(this.props.data);
    const pageTitle = this.props.title;

    return (
      <div>
        <TableOfContents tableOfContents={markdown.toc} />
        {markdown.tree}
        <Helmet defer={false}>
          <title>{pageTitle} - Rulebook.io</title>
        </Helmet>
      </div>
    );
  }
}

Page.defaultProps = {
  data: '',
};

Page.propTypes = {
  data: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default Page;
