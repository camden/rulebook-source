// @flow

import React, { createElement } from 'react';
import marksy from 'marksy';
import styled from 'styled-components';

import HighlightedString from 'components/HighlightedString';
import Highlight from 'components/Highlight';
import MarkdownHeader from 'components/MarkdownHeader';

import type { Glossary } from 'types';

const Paragraph = styled.p``;

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
          <MarkdownHeader id={id} level={1}>
            {children}
          </MarkdownHeader>
        );
      },
      h2({ id, children }) {
        return (
          <MarkdownHeader id={id} level={2}>
            {children}
          </MarkdownHeader>
        );
      },
      h3({ id, children }) {
        return (
          <MarkdownHeader id={id} level={3}>
            {children}
          </MarkdownHeader>
        );
      },
      h4({ id, children }) {
        return (
          <MarkdownHeader id={id} level={4}>
            {children}
          </MarkdownHeader>
        );
      },
      h5({ id, children }) {
        return (
          <MarkdownHeader id={id} level={5}>
            {children}
          </MarkdownHeader>
        );
      },
      h6({ id, children }) {
        return (
          <MarkdownHeader id={id} level={6}>
            {children}
          </MarkdownHeader>
        );
      },
      img({ src, alt }) {
        return <Image src={src} alt={alt} />;
      },
      p({ children }) {
        return (
          <Paragraph>
            <Highlight text={children} glossary={glossary} />
          </Paragraph>
        );
      },
    },
  })(markdown);
};
