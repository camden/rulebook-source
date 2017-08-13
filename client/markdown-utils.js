// @flow

import React, { createElement } from 'react';
import marksy from 'marksy';
import { Link } from 'react-router-dom';
import { Link as LinkIcon } from 'react-feather';
import styled from 'styled-components';

const AnchorLink = styled(LinkIcon)`
  color: #ccc;
  padding-right: 0.5rem;
  transition: all 150ms linear;

  &:hover {
    cursor: pointer;
    color: #888;
  }
`;

const GenericHeader = styled.div`
  font-size: ${props => props.size};
  font-weight: bold;
  margin: 0.5px 0;
  display: inline-block;
`;

const Header = ({ id, level, children }) => {
  const levelToSizeMap = {
    '1': '2em',
    '2': '1.5em',
    '3': '1.17em',
    '4': '1.12em',
    '5': '.83em',
    '6': '.75em',
  };

  return (
    <div>
      <Link to={`#${id}`}>
        <AnchorLink size={level * 15} />
      </Link>
      <GenericHeader size={levelToSizeMap[level.toString()]}>
        {children}
      </GenericHeader>
    </div>
  );
};

export const compileMarkdown = marksy({
  // Pass in whatever creates elements for your
  // virtual DOM library. h('h1', {})
  createElement,

  // You can override the default elements with
  // custom VDOM trees
  elements: {
    h1({ id, children }) {
      return (
        <div>
          <Header id={id} level={1}>
            {children}
          </Header>
        </div>
      );
    },
  },
});
