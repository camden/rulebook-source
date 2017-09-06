// @flow

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { decode as decodeHTMLEntities } from 'he';

import { generateId } from 'utils';
import Link from 'components/Link';

const TOCLink = styled(({ bold, level, ...rest }) => <Link {...rest} />)`
  padding: 0.5rem 0;
  padding-left: ${props => props.level}rem;
  display: block;
  font-weight: ${props => (props.bold ? 'bolder' : 'normal')};

  transition: all 150ms linear;
`;

const TOCTitle = props => {
  const { children, level } = props;

  const formattedId = generateId({ title: children });

  const decodedTitle = decodeHTMLEntities(children);

  return (
    <TOCLink
      {...props}
      to={`#${formattedId}`}
      level={level}
      bold={level === 1}
      id={`toc-${formattedId}`}
    >
      {decodedTitle}
    </TOCLink>
  );
};

TOCTitle.propTypes = {
  children: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  id: PropTypes.string,
};

export default TOCTitle;
