// @flow

import {
  Link as ReactRouterLink,
  NavLink as ReactRouterNavLink,
} from 'react-router-dom';
import styled from 'styled-components';

const styling = fn => fn`
  -webkit-tap-highlight-color: ${props => props.theme.colors.webkitTapDefault};

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

export default Link;
