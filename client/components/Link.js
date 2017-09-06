// @flow

import { Link as ReactRouterLink } from 'react-router-dom';
import styled from 'styled-components';

const Link = styled(ReactRouterLink)`
text-decoration: none;
-webkit-tap-highlight-color: ${props => props.theme.colors.webkitTapDefault};
`;

export default Link;
