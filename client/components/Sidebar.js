// @flow

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import TableOfContents from 'components/TableOfContents';

const TopMenu = styled.div`
  border-bottom: 1px solid ${props => props.theme.colors.border};
  padding: 2rem;
`;

const TOCWrapper = styled.div`padding: 1rem 2rem;`;

const SidebarBody = styled.nav`
  background-color: white;
  width: 100%;
`;

const Sidebar = props => {
  return (
    <SidebarBody>
      <TopMenu>Menu!</TopMenu>
      <TOCWrapper>
        <TableOfContents
          {...props}
          onCloseTableOfContentsClick={props.onCloseSidebarClick}
        />
      </TOCWrapper>
    </SidebarBody>
  );
};

Sidebar.defaultProps = {
  glossary: [],
  tableOfContents: [],
};

Sidebar.propTypes = {
  glossary: PropTypes.array.isRequired,
  onCloseSidebarClick: PropTypes.func.isRequired,
  tableOfContents: PropTypes.array.isRequired,
};

export default Sidebar;
