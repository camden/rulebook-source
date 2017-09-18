import styled from 'styled-components';

const Icon = styled.div`
  // To center align the icon
  display: flex;
  align-items: center;
  -webkit-tap-highlight-color: ${props => props.theme.colors.webkitTapDefault};

  width: auto;
  width: fit-content;

  height: 100%;

  user-select: none;

  cursor: pointer;
  padding: 1.5rem;
  transition: all 150ms linear;
  color: ${props => props.theme.colors.icon.default};

  &:hover {
    color: ${props => props.theme.colors.icon.hover};
  }

  &:focus {
    background-color: ${props => props.theme.colors.icon.focus};
    outline: none;
  }
`;

export default Icon;
