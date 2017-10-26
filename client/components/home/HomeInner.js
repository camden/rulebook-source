// @flow

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Search from 'components/home/Search';
import RulebookCarousel from 'components/shared/RulebookCarousel';

const HomeInner = props => {
  const { homepageData, allRulebooks } = props;

  // TODO clean this up
  const carousels = Object.keys(homepageData).map(categoryName => {
    const rulebookNames = homepageData[categoryName];
    const rulebooks = rulebookNames.map(rulebookName => {
      return allRulebooks.find(rulebook => rulebook.name === rulebookName);
    });

    return (
      <RulebookCarousel
        key={categoryName}
        title={categoryName}
        rulebooks={rulebooks}
      />
    );
  });

  return (
    <div>
      <Search allRulebooks={allRulebooks} />
      <Featured>{carousels}</Featured>
    </div>
  );
};

const Featured = styled.section`
  margin-top: 4rem;
`;

HomeInner.propTypes = {
  allRulebooks: PropTypes.array.isRequired,
  homepageData: PropTypes.object.isRequired,
};

export default HomeInner;
