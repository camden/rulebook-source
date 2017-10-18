// @flow

import React from 'react';
import styled from 'styled-components';

import Search from 'components/Search';
import SearchResult from 'components/SearchResult';

const SUGGESTION_MARGIN = '0.5rem';

const Suggestions = styled.div`
  margin: 3rem 0 1rem;
  display: flex;
  flex-direction: column;
`;

const SuggestionCategory = styled.h3`
  align-self: flex-start;
  margin-left: ${SUGGESTION_MARGIN};
  margin-bottom: 0.5rem;
`;

const SuggestionCards = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const RulebookCard = styled.div`margin: 0.5rem ${SUGGESTION_MARGIN};`;

const HomeInner = props => {
  return (
    <div>
      <Search {...props} />
      <Suggestions>
        <SuggestionCategory>Featured</SuggestionCategory>
        <SuggestionCards>
          <RulebookCard>
            <SearchResult title="The Resistance" linkTo="#" card={true} />
          </RulebookCard>
          <RulebookCard>
            <SearchResult
              title="One Night Ultimate Werewolf"
              linkTo="#"
              card={true}
            />
          </RulebookCard>
          <RulebookCard>
            <SearchResult title="Spikeball" linkTo="#" card={true} />
          </RulebookCard>
          <RulebookCard>
            <SearchResult title="The Resistance" linkTo="#" card={true} />
          </RulebookCard>
          <RulebookCard>
            <SearchResult
              title="One Night Ultimate Werewolf"
              linkTo="#"
              card={true}
            />
          </RulebookCard>
          <RulebookCard>
            <SearchResult title="Spikeball" linkTo="#" card={true} />
          </RulebookCard>
        </SuggestionCards>
      </Suggestions>
    </div>
  );
};

export default HomeInner;
