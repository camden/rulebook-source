// @flow

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { default as RulebookCardNoMargin } from 'components/shared/RulebookCard';
import RulebookCarousel from 'components/shared/RulebookCarousel';

const Browse = props => {
  const { allRulebooks } = props;

  return (
    <div>
      <h2>Browse All Rulebooks</h2>
      {listRulebooks(allRulebooks)}
    </div>
  );
};

const RulebookCard = styled(RulebookCardNoMargin)`margin: 1rem 0;`;

const SectionHeader = styled.h4`
  margin-top: 2.5rem;
  margin-bottom: 1rem;
`;

const listRulebooks = allRulebooks => {
  const sortedRulebooks = allRulebooks.sort((a, b) =>
    a.title.toLowerCase().localeCompare(b.title.toLowerCase())
  );

  const buckets = getBuckets(sortedRulebooks);

  return (
    <div>
      {Object.keys(buckets).map(firstLetter => {
        const rulebooksForBucket = buckets[firstLetter];
        return (
          <section key={firstLetter}>
            <RulebookCarousel
              title={firstLetter.toUpperCase()}
              rulebooks={rulebooksForBucket}
            />
          </section>
        );
      })}
    </div>
  );
};

const getBuckets = rulebooks => {
  const buckets = {};
  for (let rulebook of rulebooks) {
    const firstLetter = rulebook.title.charAt(0).toLowerCase();

    if (!buckets[firstLetter]) {
      buckets[firstLetter] = [];
    }

    buckets[firstLetter].push(rulebook);
  }

  return buckets;
};

Browse.propTypes = {
  allRulebooks: PropTypes.array.isRequired,
};

export default Browse;
