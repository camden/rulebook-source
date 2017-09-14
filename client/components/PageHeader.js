// @flow

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { default as HomeIcon } from 'components/icons/Home';
import { default as MenuIcon } from 'components/icons/Menu';

const Header = styled.div`
  background-color: white;
  border-bottom: 1px solid ${props => props.theme.colors.border};

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  height: ${props => props.height};

  z-index: 10;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderSection = styled.div`
  flex: 1;
  display: flex;
  height: 100%;
`;

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

const RulebookTitle = styled.span`
  font-size: 2em;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PageHeader = props => {
  const { onToggleSidebarClick, title, height } = props;

  return (
    <Header height={height}>
      <HeaderSection>
        <Icon
          tabIndex={1}
          aria-label={'Side menu toggle'}
          onClick={onToggleSidebarClick}
        >
          <MenuIcon />
        </Icon>
        <Link to="/" tabIndex={1} style={{ height: '100%' }}>
          <Icon aria-label={'Home button'}>
            <HomeIcon />
          </Icon>
        </Link>
      </HeaderSection>
      <RulebookTitle>
        {title}
      </RulebookTitle>
      <HeaderSection />
    </Header>
  );
};

PageHeader.defaultProps = {
  onToggleSidebarClick: () => {},
  title: '',
  height: '5rem',
};

PageHeader.propTypes = {
  onToggleSidebarClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
};

export default PageHeader;
