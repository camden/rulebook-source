// @flow

import React from 'react';
import { Tooltip } from 'react-tippy';
import styled from 'styled-components';

import 'react-tippy/dist/tippy.css';

import type { GlossaryItem } from 'types';

const HighlightedWord = styled.span`
  font-weight: bold;
  cursor: pointer;
  text-decoration: underline;
  text-decoration-skip: ink;
  color: ${props => props.theme.colors.primary};
`;
const Definition = styled.div`text-align: left;`;
const DefinitionTitle = styled.div`font-weight: bold;`;
const DefinitionBody = styled.div``;

const DefinitionPopup = ({
  match,
  glossaryItem,
}: {
  match: string,
  glossaryItem: GlossaryItem,
}) => {
  return (
    <Definition>
      <DefinitionTitle>
        {glossaryItem.name}
      </DefinitionTitle>
      <DefinitionBody>
        {glossaryItem.definition}
      </DefinitionBody>
    </Definition>
  );
};

const HighlightedString = ({
  match,
  glossaryItem,
}: {
  match: string,
  glossaryItem: GlossaryItem,
}) => {
  return (
    <Tooltip
      interactive
      position="top"
      trigger="focus click"
      animateFill={false}
      arrow={true}
      html={<DefinitionPopup match={match} glossaryItem={glossaryItem} />}
      theme={'light'}
    >
      <HighlightedWord tabIndex={0}>
        {match}
      </HighlightedWord>
    </Tooltip>
  );
};

export default HighlightedString;
