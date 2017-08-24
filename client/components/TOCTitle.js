// @flow

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Link from 'components/Link';

const IndentedTitle = styled.div`
  padding: 0.5rem 0;
  padding-left: ${props => props.level}rem;
`;

const TOCTitle = ({ children, level, id }) => {
  return (
    <Link to={`#${id}`}>
      <IndentedTitle level={level}>
        {children}
      </IndentedTitle>
    </Link>
  );
};

TOCTitle.propTypes = {
  children: PropTypes.node.isRequired,
  level: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};

export default TOCTitle;
