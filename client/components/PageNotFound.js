// @flow

import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: inherit;
  text-align: center;
`;

const ErrorTitle = styled.h1`
  font-size: 5rem;
  margin: 0;
`;

const ErrorDescription = styled.h1`margin: 0;`;

const PageNotFound = () => {
  return (
    <Wrapper>
      <div>
        <ErrorTitle>404</ErrorTitle>
        <ErrorDescription>Page not found!</ErrorDescription>
      </div>
    </Wrapper>
  );
};

export default PageNotFound;
