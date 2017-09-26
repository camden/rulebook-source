// @flow

import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: inherit;
`;

const PageNotFound = () => {
  return (
    <Wrapper>
      <h1>Page not found! Try something else!</h1>
    </Wrapper>
  );
};

export default PageNotFound;
