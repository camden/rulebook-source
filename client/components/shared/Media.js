// @flow

import React from 'react';
import PropTypes from 'prop-types';
import ReactMedia from 'react-media';

import { queryStrings } from 'media-queries';

const Media = ({ query, children }) => {
  return <ReactMedia query={`${queryStrings[query]}`}>{children}</ReactMedia>;
};

Media.propTypes = {
  query: PropTypes.oneOf(Object.keys(queryStrings)).isRequired,
  children: PropTypes.func.isRequired,
};

export default Media;
