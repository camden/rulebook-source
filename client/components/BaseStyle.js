// @flow

import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`font-family: Monaco;`;

const BaseStyle = ({ children }) => {
  return (
    <StyledDiv>
      {children}
    </StyledDiv>
  );
};

export default BaseStyle;
