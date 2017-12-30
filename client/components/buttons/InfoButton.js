// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'react-tippy';
import styled from 'styled-components';

import { default as InfoIcon } from 'components/icons/Info';
import { Anchor } from 'components/shared/Link';
import Icon from 'components/shared/Icon';

import 'react-tippy/dist/tippy.css';

const Info = styled.div`
  text-align: left;
  padding: 1rem;
`;

const Field = styled.div`
  font-weight: bolder;
  display: inline-block;
  margin-right: 0.3rem;
`;

const FieldBlock = styled.div`
  margin: 0.2rem 0;
`;

const Value = styled.div`
  word-break: break-all;
  hyphens: auto;
  display: inline-block;
`;

const InfoPopup = props => {
  const source = props.source;
  const information = props.information;

  return (
    <Info>
      <FieldPair
        field={'Publisher:'}
        value={information && information.publisher}
      />
      <FieldPair
        field={'Source:'}
        value={
          <Anchor href={source} target={'_blank'}>
            {source}
          </Anchor>
        }
      />
      <FieldPair
        field={'Player Count:'}
        value={information && information['player-count']}
      />
      <FieldPair
        field={'Play Time:'}
        value={information && information['play-time']}
      />
    </Info>
  );
};

const FieldPair = ({ field, value }) => {
  if (!value) {
    return null;
  }

  return (
    <FieldBlock>
      <Field>{field}</Field>
      <Value>{value}</Value>
    </FieldBlock>
  );
};

const InfoButton = props => {
  return (
    <Tooltip
      key={'info'}
      interactive
      position="bottom"
      trigger="focus click"
      animateFill={false}
      arrow={true}
      theme={'light'}
      html={<InfoPopup source={props.source} information={props.information} />}
      useContext
      popperOptions={{
        modifiers: {
          preventOverflow: {
            enabled: true,
            boundariesElement: 'window',
          },
          flip: {
            enabled: true,
          },
        },
      }}
      {...props}
    >
      <Icon aria-label={'Info button'} label={'Info'}>
        <InfoIcon size={24} />
      </Icon>
    </Tooltip>
  );
};

InfoButton.propTypes = {
  source: PropTypes.string.isRequired,
};

export default InfoButton;
