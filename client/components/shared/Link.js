// @flow

import {
  Link as ReactRouterLink,
  NavLink as ReactRouterNavLink,
} from 'react-router-dom';
import styled from 'styled-components';

const styling = styleFn => styleFn`
  -webkit-tap-highlight-color: ${props => props.theme.colors.webkitTapDefault};

  display: ${props => (props.block ? 'block' : 'inline')};
  color: ${props => props.theme.colors.primary};

  text-decoration: none;
  text-decoration: underline;
  text-decoration-skip: ink;
  -webkit-text-decoration-skip: ink;
  text-decoration-color: transparent;
  -webkit-text-decoration-color: transparent;

  transition: all 150ms linear;

  &:hover {
    text-decoration-color: ${props => props.theme.colors.primary};
    -webkit-text-decoration-color: ${props => props.theme.colors.primary};
  }
`;

const Link = styling(styled(ReactRouterLink));

export const NavLink = styling(styled(ReactRouterNavLink));
export const Anchor = styling(styled.a);

export default Link;
