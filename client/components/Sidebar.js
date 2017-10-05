// @flow

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Media from 'components/Media';
import EditButton from 'components/buttons/EditButton';
import HomeButton from 'components/buttons/HomeButton';
import TableOfContents from 'components/TableOfContents';

import { editLink } from 'utils';

const TopMenu = styled.div`
  border-bottom: 1px solid ${props => props.theme.colors.border};
  display: flex;
  justify-content: center;
  justify-content: space-around;
  justify-content: space-evenly;
`;

const TOCWrapper = styled.div`
  padding: 1rem 0.5rem 1rem 1rem;
  @media (min-width: ${props => props.theme.media.desktop}) {
    padding: 1rem 2rem;
  }
`;

const SidebarBody = styled.nav`
  background-color: white;
  width: 100%;
`;

const Sidebar = props => {
  return (
    <SidebarBody>
      <Media query={'desktop'}>
        {isDesktop =>
          isDesktop ? null : (
            <TopMenu>
              <HomeButton />
              <EditButton to={editLink({ rulebookName: props.rulebookName })} />
            </TopMenu>
          )}
      </Media>
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
  rulebookName: PropTypes.string.isRequired,
  glossary: PropTypes.array,
  onCloseSidebarClick: PropTypes.func.isRequired,
  tableOfContents: PropTypes.array.isRequired,
};

export default Sidebar;
