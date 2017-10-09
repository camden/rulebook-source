// @flow

import React from 'react';
import styled from 'styled-components';

import Search from 'components/Search';

const SUGGESTION_MARGIN = '1rem';

const Suggestions = styled.div`
  margin: 3rem 0 1rem;
  display: flex;
  flex-direction: column;
`;

const SuggestionCategory = styled.h3`
  align-self: flex-start;
  margin-left: ${SUGGESTION_MARGIN};
  margin-bottom: 0;
`;

const SuggestionCards = styled.div`display: flex;`;

const RulebookCard = styled.div`
  padding: 1rem 1.5rem;
  margin: ${SUGGESTION_MARGIN};
  box-shadow: ${props => props.theme.shadows.light};
  background-color: white;
`;

const HomeInner = props => {
  return (
    <div>
      <Search {...props} />
      <Suggestions>
        <SuggestionCategory>Featured</SuggestionCategory>
        <SuggestionCards>
          <RulebookCard>The Resistance</RulebookCard>
          <RulebookCard>One Night Ultimate Werewolf</RulebookCard>
          <RulebookCard>Spikeball</RulebookCard>
        </SuggestionCards>
      </Suggestions>
    </div>
  );
};

export default HomeInner;
