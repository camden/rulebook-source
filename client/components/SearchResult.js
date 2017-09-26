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
`;

const SearchResult = props => {
  const { title, name, linkTo } = props;

  const url = name ? `/rules/${name}` : linkTo;

  return (
    <Link to={url}>
      <ResultWrapper>{title}</ResultWrapper>
    </Link>
  );
};

SearchResult.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string,
  linkTo: PropTypes.string,
};

export default SearchResult;
