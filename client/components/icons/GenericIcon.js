// @flow

import React from 'react';
import PropTypes from 'prop-types';

const GenericIcon = props => {
  const { color, size, children, ...otherProps } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...otherProps}
    >
      {children}
    </svg>
  );
};

GenericIcon.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

GenericIcon.defaultProps = {
  color: 'currentColor',
  size: '30',
};

export default GenericIcon;
