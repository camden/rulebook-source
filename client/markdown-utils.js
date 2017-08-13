// @flow

import React, { createElement } from 'react';
import marksy from 'marksy';

export const compileMarkdown = marksy({
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
