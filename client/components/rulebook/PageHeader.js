// @flow

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Media from 'components/shared/Media';
import EditButton from 'components/buttons/EditButton';
import HomeButton from 'components/buttons/HomeButton';
import InfoButton from 'components/buttons/InfoButton';
import Icon from 'components/shared/Icon';
import { default as MenuIcon } from 'components/icons/Menu';

import { editLink } from 'utils';

const Header = styled.div`
  background-color: white;

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

  @media print {
    position: relative;
  }
`;

const HeaderSection = styled.div`
  flex: 1;
  display: flex;
  height: 100%;
  justify-content: ${props =>
    props.justifyContent ? props.justifyContent : 'flex-start'};
`;

const RulebookTitle = styled.span`
  font-size: 2em;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const HideOnPrint = styled.div`
  @media print {
    display: none;
  }
`;

const rightButtons = ({ rulebookName, rulebookData }) => {
  return (
    <div style={{ display: 'flex' }}>
      <EditButton to={editLink({ rulebookName })} />
      <InfoButton
        source={rulebookData.source}
        information={rulebookData.information}
      />
    </div>
  );
};

const PageHeader = props => {
  const {
    rulebookName,
    onToggleSidebarClick,
    title,
    height,
    rulebookData,
  } = props;

  return (
    <Header height={height}>
      <HeaderSection>
        <Media query={'print'}>
          {isPrint =>
            isPrint ? null : (
              <Media query={'desktop'}>
                {isDesktop => (
                  <HideOnPrint>
                    <Icon
                      tabIndex={1}
                      aria-label={'Side menu toggle'}
                      label={isDesktop ? 'Contents' : 'Menu'}
                      onClick={onToggleSidebarClick}
                    >
                      <MenuIcon size={24} />
                    </Icon>
                  </HideOnPrint>
                )}
              </Media>
            )
          }
        </Media>
        <Media query={'desktop'}>
          {isDesktop => (isDesktop ? <HomeButton /> : null)}
        </Media>
      </HeaderSection>
      <RulebookTitle>{title}</RulebookTitle>
      <HeaderSection justifyContent={'flex-end'}>
        <Media query={'desktop'}>
          {isDesktop =>
            isDesktop ? rightButtons({ rulebookName, rulebookData }) : null
          }
        </Media>
      </HeaderSection>
    </Header>
  );
};

PageHeader.defaultProps = {
  onToggleSidebarClick: () => {},
  title: '',
  height: '5rem',
};

PageHeader.propTypes = {
  rulebookName: PropTypes.string.isRequired,
  rulebookData: PropTypes.object.isRequired,
  onToggleSidebarClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
};

export default PageHeader;
