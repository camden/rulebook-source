// @flow

import React, { createElement } from 'react';
import marksy from 'marksy';
import styled from 'styled-components';

import Link, { Anchor } from 'components/shared/Link';
import Highlight from 'components/rulebook/Highlight';
import MarkdownHeader from 'components/rulebook/MarkdownHeader';
import MarkdownParagraph from 'components/rulebook/MarkdownParagraph';

import type { Glossary } from 'types';

const Wrapper = styled.div`
  & [class^='language-'] {
    display: block;
    background-color: ${props =>
      props.theme.colors ? props.theme.colors.border : '#efefef'};
    padding: 0.2rem;
    overflow-y: auto;
  }
`;

const Code = styled.code`
  background-color: ${props => props.theme.colors.border};
  padding: 0.2rem;
`;

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

export const compileMarkdown = ({
  markdown,
  glossary,
  anchorOffset,
}: {
  markdown: string,
  glossary: ?Glossary,
  anchorOffset: ?boolean,
}) => {
  if (anchorOffset === undefined) {
    anchorOffset = true;
  }

  const compiled = marksy({
    createElement,

    elements: {
      h1({ id, children }) {
        return (
          <MarkdownHeader id={id} level={1} anchorOffset={anchorOffset}>
            {children[0]}
          </MarkdownHeader>
        );
      },
      h2({ id, children }) {
        return (
          <MarkdownHeader id={id} level={2} anchorOffset={anchorOffset}>
            {children[0]}
          </MarkdownHeader>
        );
      },
      h3({ id, children }) {
        return (
          <MarkdownHeader id={id} level={3} anchorOffset={anchorOffset}>
            {children[0]}
          </MarkdownHeader>
        );
      },
      h4({ id, children }) {
        return (
          <MarkdownHeader id={id} level={4} anchorOffset={anchorOffset}>
            {children[0]}
          </MarkdownHeader>
        );
      },
      h5({ id, children }) {
        return (
          <MarkdownHeader id={id} level={5} anchorOffset={anchorOffset}>
            {children[0]}
          </MarkdownHeader>
        );
      },
      h6({ id, children }) {
        return (
          <MarkdownHeader id={id} level={6} anchorOffset={anchorOffset}>
            {children[0]}
          </MarkdownHeader>
        );
      },
      img({ src, alt }) {
        return <Image src={src} alt={alt} />;
      },
      p({ children }) {
        if (glossary) {
          return (
            <MarkdownParagraph>
              <Highlight text={children} glossary={glossary} />
            </MarkdownParagraph>
          );
        } else {
          return <MarkdownParagraph>{children}</MarkdownParagraph>;
        }
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
        // URL is external
        if (/^https?:\/\//.test(props.href)) {
          return (
            <Anchor href={props.href} target={'_blank'}>
              {props.children}
            </Anchor>
          );
        } else {
          return <Link to={props.href} {...props} />;
        }
      },
      code({ language, children, code }) {
        return <Code>{children}</Code>;
      },
    },
  })(markdown);

  compiled.tree = <Wrapper>{compiled.tree}</Wrapper>;
  return compiled;
};
