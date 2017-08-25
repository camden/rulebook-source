// @flow

import React from 'react';

import GenericIcon from 'components/icons/GenericIcon';

const Menu = props => {
  return (
    <GenericIcon {...props}>
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </GenericIcon>
  );
};

export default Menu;
