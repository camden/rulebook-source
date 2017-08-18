// @flow

import React, { createElement } from 'react';
import marksy from 'marksy';
import styled from 'styled-components';

import HighlightedString from 'components/HighlightedString';
import Highlight from 'components/Highlight';
import Header from 'components/Header';

import type { Glossary } from 'types';

const Image = styled.img`
  width: 100%;
  padding: 1.5rem;
`;

const highlightWrapper = HighlightedString;

export const compileMarkdown = ({
  markdown,
  glossary,
}: {
  markdown: string,
  glossary: Glossary,
}) => {
  return marksy({
    // Pass in whatever creates elements for your
    // virtual DOM library. h('h1', {})
    createElement,

    // You can override the default elements with
    // custom VDOM trees
    elements: {
      h1({ id, children }) {
        return (
          <Header id={id} level={1}>
            {children}
          </Header>
        );
      },
      h2({ id, children }) {
        return (
          <Header id={id} level={2}>
            {children}
          </Header>
        );
      },
      h3({ id, children }) {
        return (
          <Header id={id} level={3}>
            {children}
          </Header>
        );
      },
      h4({ id, children }) {
        return (
          <Header id={id} level={4}>
            {children}
          </Header>
        );
      },
      h5({ id, children }) {
        return (
          <Header id={id} level={5}>
            {children}
          </Header>
        );
      },
      h6({ id, children }) {
        return (
          <Header id={id} level={6}>
            {children}
          </Header>
        );
      },
      img({ src, alt }) {
        return <Image src={src} alt={alt} />;
      },
      p({ children }) {
        return <Highlight text={children} glossary={glossary} />;
      },
    },
  })(markdown);
};
