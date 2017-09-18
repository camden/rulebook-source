import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const IconLabel = styled.label`
  text-decoration: none;
  text-align: center;
  font-size: 0.875rem;
  flex-basis: 100%;
  cursor: pointer;
`;

const IconWrapper = styled.div`
  // To center align the icon
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-tap-highlight-color: ${props => props.theme.colors.webkitTapDefault};

  flex-wrap: wrap;

  width: auto;
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

const Icon = props => {
  return (
    <IconWrapper {...props}>
      {props.children}
      <IconLabel>
        {props.label}
      </IconLabel>
    </IconWrapper>
  );
};

Icon.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
};

export default Icon;
