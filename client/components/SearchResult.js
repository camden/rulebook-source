// @flow

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Link from 'components/Link';

const ResultWrapper = styled.div`
  width: 100%;
  padding: 1rem;
  margin: 1rem 0;
  box-shadow: ${props => props.theme.shadows.light};
  transition: all 250ms ease;

  &:hover,
  &:focus {
    box-shadow: ${props => props.theme.shadows.medium};
  }
`;

const getTags = tags => {
  return (
    <div>
      {tags.map(tag => {
        <div>{tag}</div>;
      })}
    </div>
  );
};

const SearchResult = props => {
  const { title, name, linkTo } = props;

  const tags = props.tags || [];

  const url = name ? `/rules/${name}` : linkTo;

  return (
    <Link to={url}>
      <ResultWrapper>
        {title}
        {getTags(tags)}
      </ResultWrapper>
    </Link>
  );
};

SearchResult.propTypes = {
  title: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string,
  linkTo: PropTypes.string,
};

export default SearchResult;
