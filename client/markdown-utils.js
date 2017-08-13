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

const Header = styled.h1`
  font-size: ${props => props.size}rem;
  display: inline-block;
`;

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
          <Link to={`#${id}`}>
            <AnchorLink size={20} />
          </Link>
          <Header id={id} size={2}>
            {children}
          </Header>
        </div>
      );
    },
  },
});
