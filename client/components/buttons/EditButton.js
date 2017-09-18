// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { default as EditIcon } from 'components/icons/Edit';
import Icon from 'components/Icon';

const EditButton = props => {
  return (
    <Link tabIndex={1} style={{ height: '100%' }} {...props}>
      <Icon aria-label={'Edit button'}>
        <EditIcon size={20} />
      </Icon>
    </Link>
  );
};

EditButton.propTypes = {
  to: PropTypes.string.isRequired,
};

export default EditButton;
