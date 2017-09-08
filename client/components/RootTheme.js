// @flow

import React from 'react';
import { MainTheme } from 'themes';

import styled, { injectGlobal, ThemeProvider } from 'styled-components';

injectGlobal`
  body {
    box-sizing: border-box;
    font-family: 'Open Sans', sans;
    margin: 0;
    height: 100%;
    min-height: 100%;

    // Remove webkit tap area on everything but links
    -webkit-tap-highlight-color: transparent;
  }

  * {
    box-sizing: border-box;
  }
`;

const GlobalStyles = styled.div`color: ${props => props.theme.colors.black};`;

const RootTheme = ({ children }) => {
  return (
    <ThemeProvider theme={MainTheme}>
      <GlobalStyles>
        {children}
      </GlobalStyles>
    </ThemeProvider>
  );
};

export default RootTheme;
