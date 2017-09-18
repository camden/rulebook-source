// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { default as EditIcon } from 'components/icons/Edit';
import Icon from 'components/Icon';

const EditButton = props => {
  return (
    <Link
      tabIndex={1}
      style={{ height: '100%', textDecoration: 'none' }}
      {...props}
    >
      <Icon aria-label={'Edit button'} label={'Edit'}>
        <EditIcon size={24} />
      </Icon>
    </Link>
  );
};

EditButton.propTypes = {
  to: PropTypes.string.isRequired,
};

export default EditButton;
