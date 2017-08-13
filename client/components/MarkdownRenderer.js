// @flow

import React, { createElement } from 'react';
import PropTypes from 'prop-types';
import marksy from 'marksy';
import styled from 'styled-components';

const ColoredDiv = styled.h1`color: blue;`;

const compile = marksy({
  // Pass in whatever creates elements for your
  // virtual DOM library. h('h1', {})
  createElement,

  // You can override the default elements with
  // custom VDOM trees
  elements: {
    h1({ id, children }) {
      return (
        <h1>
          {children}
        </h1>
      );
    },
  },
});

const MarkdownRenderer = ({ markdownData }: { markdownData: string }) => {
  const output = compile(markdownData);
  console.log(output.toc);

  return (
    <div>
      {output.tree}
    </div>
  );
};

MarkdownRenderer.propTypes = {
  markdownData: PropTypes.string.isRequired,
};

export default MarkdownRenderer;
