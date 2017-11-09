// @flow

import React from 'react';
import { Tooltip } from 'react-tippy';
import styled from 'styled-components';

import 'react-tippy/dist/tippy.css';

import { compileMarkdown } from 'markdown-utils';
import type { GlossaryItem } from 'types';

const HighlightedWord = styled.span`
  @media not print {
    font-weight: bold;
    cursor: pointer;
    text-decoration: underline;
    text-decoration-skip: ink;
    color: ${props => props.theme.colors.primary};
    cursor: help;
  }
`;

const Definition = styled.div`
  text-align: left;
  padding: 1rem;
`;
const DefinitionTitle = styled.div`
  font-weight: bold;
  padding-bottom: 0.5rem;
`;
const DefinitionBody = styled.div`
  text-align: left;
`;

const DefinitionPopup = ({
  match,
  glossaryItem,
}: {
  match: string,
  glossaryItem: GlossaryItem,
}) => {
  const markdown = compileMarkdown({
    markdown: glossaryItem.definition,
  });

  return (
    <Definition>
      <DefinitionTitle>{glossaryItem.name}</DefinitionTitle>
      <DefinitionBody>{markdown.tree}</DefinitionBody>
    </Definition>
  );
};

const HighlightedString = ({
  match,
  glossaryItem,
  index,
  offset,
}: {
  match: string,
  glossaryItem: GlossaryItem,
  index: number,
  offset: number,
}) => {
  return (
    <Tooltip
      key={`${match}-${index}-${offset}`}
      interactive
      position="top"
      trigger="focus click"
      animateFill={false}
      arrow={true}
      html={<DefinitionPopup match={match} glossaryItem={glossaryItem} />}
      theme={'light'}
    >
      <HighlightedWord tabIndex={0}>{match}</HighlightedWord>
    </Tooltip>
  );
};

export default HighlightedString;
