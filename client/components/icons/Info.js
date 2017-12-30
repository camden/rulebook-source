// @flow

import React from 'react';

import GenericIcon from 'components/icons/GenericIcon';

const Info = props => {
  return (
    <GenericIcon {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="8" />
    </GenericIcon>
  );
};

export default Info;
