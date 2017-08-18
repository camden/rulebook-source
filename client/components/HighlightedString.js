// @flow

import React from 'react';
import { Tooltip } from 'react-tippy';
import styled from 'styled-components';

import 'react-tippy/dist/tippy.css';

import type { GlossaryItem } from 'types';

const HighlightedWord = styled.span`
  font-weight: bold;
  cursor: pointer;
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
      position="bottom"
      trigger="mouseenter"
      animateFill={false}
      html={<DefinitionPopup match={match} glossaryItem={glossaryItem} />}
      theme={'light'}
    >
      <HighlightedWord>
        {match}
      </HighlightedWord>
    </Tooltip>
  );
};

export default HighlightedString;
