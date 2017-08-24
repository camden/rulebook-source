// @flow

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { decode as decodeHTMLEntities } from 'he';

import { generateId } from 'utils';
import Link from 'components/Link';

const TOCLink = styled(Link)`
  padding: 0.5rem 0;
  padding-left: ${props => props.level}rem;
  display: block;
  color: ${props => props.theme.colors.primary};
  text-decoration: underline;
  text-decoration-skip: ink;
  text-decoration-color: transparent;
  font-weight: ${props => (props.bold ? 'bolder' : 'normal')};

  transition: all 150ms linear;

  &:hover {
    text-decoration-color: ${props => props.theme.colors.primary}
  }
`;

const TOCTitle = ({ children, level }) => {
  const formattedId = generateId({ title: children });

  const decodedTitle = decodeHTMLEntities(children);
  return (
    <TOCLink to={`#${formattedId}`} level={level} bold={level === 1}>
      {decodedTitle}
    </TOCLink>
  );
};

TOCTitle.propTypes = {
  children: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};

export default TOCTitle;
