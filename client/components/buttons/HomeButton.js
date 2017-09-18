// @flow

import React from 'react';
import { Link } from 'react-router-dom';

import { default as HomeIcon } from 'components/icons/Home';
import Icon from 'components/Icon';

const HomeButton = props => {
  return (
    <Link
      to="/"
      tabIndex={1}
      style={{ height: '100%', textDecoration: 'none' }}
      {...props}
    >
      <Icon aria-label={'Home button'} label={'Home'}>
        <HomeIcon size={24} />
      </Icon>
    </Link>
  );
};

export default HomeButton;
