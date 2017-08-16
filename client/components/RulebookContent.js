// @flow

import React from 'react';
import styled from 'styled-components';

const HoveredDiv = styled.div`
  padding: 1rem 3rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.24);
`;

const RulebookContent = ({ markdown }) => {
  return (
    <HoveredDiv>
      {markdown}
    </HoveredDiv>
  );
};

export default RulebookContent;
