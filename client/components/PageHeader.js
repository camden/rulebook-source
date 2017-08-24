// @flow

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { default as MenuIcon } from 'components/icons/Menu';

const Header = styled.div`
  background-color: white;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  position: relative;
  top: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;
`;

const HeaderSection = styled.div`flex: 1;`;

const MenuToggle = styled.div`
  // To center align the icon
  display: flex;
  align-items: center;
  -webkit-tap-highlight-color: ${props => props.theme.colors.webkitTapDefault};

  cursor: pointer;
  padding: 1.5rem;
  transition: all 150ms linear;
  color: ${props => props.theme.colors.icon.default};

  &:hover {
    color: ${props => props.theme.colors.icon.hover};
  }
`;

const RulebookTitle = styled.span`
  font-size: 2em;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PageHeader = ({ onToggleSidebarClick, title }) => {
  return (
    <Header>
      <HeaderSection>
        <MenuToggle onClick={onToggleSidebarClick}>
          <MenuIcon />
        </MenuToggle>
      </HeaderSection>
      <RulebookTitle>
        {title}
      </RulebookTitle>
      <HeaderSection />
    </Header>
  );
};

PageHeader.propTypes = {
  onToggleSidebarClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default PageHeader;
