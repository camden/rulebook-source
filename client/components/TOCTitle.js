// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const IndentedTitle = styled.div`
  padding: 0.5rem 0;
  padding-left: ${props => props.level}rem;
`;

const TOCTitle = ({ children, level }) => {
  return (
    <IndentedTitle level={level}>
      {children}
    </IndentedTitle>
  );
};

TOCTitle.propTypes = {
  children: PropTypes.node.isRequired,
  level: PropTypes.number.isRequired,
};

export default TOCTitle;
