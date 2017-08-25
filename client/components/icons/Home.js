// @flow

import React from 'react';

import GenericIcon from 'components/icons/GenericIcon';

const Home = props => {
  return (
    <GenericIcon {...props}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </GenericIcon>
  );
};

export default Home;
