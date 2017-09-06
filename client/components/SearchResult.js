// @flow

import React from 'react';
import styled from 'styled-components';

import Link from 'components/Link';

const ResultWrapper = styled.div`
  width: 100%;
  padding: 1rem;
  margin: 1rem 0;
  box-shadow: ${props => props.theme.shadows.light};
`;

const SearchResult = props => {
  const { result } = props;

  return (
    <Link to={`/rules/${result.name}`}>
      <ResultWrapper>
        {result.title}
      </ResultWrapper>
    </Link>
  );
};

export default SearchResult;
