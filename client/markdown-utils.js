// @flow

import React, { createElement } from 'react';
import marksy from 'marksy';
import styled from 'styled-components';

import Link from 'components/shared/Link';
import HighlightedString from 'components/rulebook/HighlightedString';
import Highlight from 'components/rulebook/Highlight';
import MarkdownHeader from 'components/rulebook/MarkdownHeader';
import MarkdownParagraph from 'components/rulebook/MarkdownParagraph';

import type { Glossary } from 'types';

const Image = styled.img`
  box-sizing: border-box;
  width: 100%;
  padding: 1.5rem;
`;

const BlockQuote = styled.blockquote`
  margin: 0.5rem 0;
  padding-left: 1rem;
  border-left: 0.25rem solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.quote};
`;

const Table = styled.table`
  display: block;
  width: 100%;
  overflow: auto;
  margin: 1rem 0;
  border-collapse: collapse;
`;

const TD = styled.td`
  text-align: center;
  padding: 1rem;
  font-weight: ${props => (props.bold ? 'bold' : 'normal')};
  border: 1px solid ${props => props.theme.colors.border};
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
            {children[0]}
          </MarkdownHeader>
        );
      },
      h2({ id, children }) {
        return (
          <MarkdownHeader id={id} level={2}>
            {children[0]}
          </MarkdownHeader>
        );
      },
      h3({ id, children }) {
        return (
          <MarkdownHeader id={id} level={3}>
            {children[0]}
          </MarkdownHeader>
        );
      },
      h4({ id, children }) {
        return (
          <MarkdownHeader id={id} level={4}>
            {children[0]}
          </MarkdownHeader>
        );
      },
      h5({ id, children }) {
        return (
          <MarkdownHeader id={id} level={5}>
            {children[0]}
          </MarkdownHeader>
        );
      },
      h6({ id, children }) {
        return (
          <MarkdownHeader id={id} level={6}>
            {children[0]}
          </MarkdownHeader>
        );
      },
      img({ src, alt }) {
        return <Image src={src} alt={alt} />;
      },
      p({ children }) {
        return (
          <MarkdownParagraph>
            <Highlight text={children} glossary={glossary} />
          </MarkdownParagraph>
        );
      },
      blockquote({ children }) {
        return <BlockQuote>{children}</BlockQuote>;
      },
      table({ children }) {
        return <Table>{children}</Table>;
      },
      th({ children }) {
        return <TD bold>{children}</TD>;
      },
      td({ children }) {
        return <TD>{children}</TD>;
      },
      a(props) {
        return <Link to={props.href} {...props} />;
      },
    },
  })(markdown);
};
