// @flow

import React, { createElement } from 'react';
import PropTypes from 'prop-types';
import marksy from 'marksy';
import styled from 'styled-components';

import Highlighter from 'components/Highlighter';

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
        <Highlighter
          search="sed"
          textToHighlight={children[0]}
          wrapper={ColoredDiv}
        />
      );
    },
  },
});

const MarkdownRenderer = ({ markdownData }: { markdownData: string }) => {
  const output = compile(markdownData);

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
