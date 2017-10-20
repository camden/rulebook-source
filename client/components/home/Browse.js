// @flow

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { default as RulebookCardNoMargin } from 'components/shared/RulebookCard';

const RulebookCard = styled(RulebookCardNoMargin)`margin: 1rem 0;`;

const Browse = props => {
  const { allRulebooks } = props;

  return (
    <div>
      <h2>Browse</h2>
      {listRulebooks(allRulebooks)}
    </div>
  );
};

const listRulebooks = allRulebooks => {
  return (
    <div>
      {allRulebooks
        .sort((a, b) =>
          a.title.toLowerCase().localeCompare(b.title.toLowerCase())
        )
        .map(rulebook => {
          return <RulebookCard rulebook={rulebook} />;
        })}
    </div>
  );
};

Browse.propTypes = {
  allRulebooks: PropTypes.array.isRequired,
};

export default Browse;
