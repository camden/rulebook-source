// @flow

import React from 'react';
import PropTypes from 'prop-types';
import ReactMedia from 'react-media';

import queries from 'media-queries';

const Media = ({ query, children }) => {
  return (
    <ReactMedia query={`(min-width: ${queries[query]})`}>
      {children}
    </ReactMedia>
  );
};

Media.propTypes = {
  query: PropTypes.oneOf(Object.keys(queries)).isRequired,
  children: PropTypes.func.isRequired,
};

export default Media;
