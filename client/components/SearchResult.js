// @flow

import React from 'react';
import { Link } from 'react-router-dom';

const SearchResult = props => {
  const { result } = props;

  return (
    <Link to={`/rules/${result.name}`}>
      {result.title}
    </Link>
  );
};

export default SearchResult;
