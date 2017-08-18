// @flow

import React from 'react';
import { Tooltip } from 'react-tippy';
import styled from 'styled-components';

import 'react-tippy/dist/tippy.css';

const HighlightedWord = styled.span`
  font-weight: bold;
  cursor: pointer;
`;

const Definition = styled.div`text-align: left;`;
const DefinitionTitle = styled.div`font-weight: bold;`;
const DefinitionBody = styled.div``;

const DefinitionPopup = ({ match, definition }) => {
  return (
    <Definition>
      <DefinitionTitle>
        {match}
      </DefinitionTitle>
      <DefinitionBody>
        {definition}
      </DefinitionBody>
    </Definition>
  );
};

const HighlightedString = ({ match, definition }) => {
  return (
    <Tooltip
      interactive
      title={definition}
      position="bottom"
      trigger="mouseenter"
      animateFill={false}
      html={<DefinitionPopup match={match} definition={definition} />}
      theme={'light'}
    >
      <HighlightedWord>
        {match}
      </HighlightedWord>
    </Tooltip>
  );
};

export default HighlightedString;
