// @flow

import React from 'react';
import { ThemeProvider } from 'styled-components';

import { MainTheme } from 'themes';

import { injectGlobal } from 'styled-components';

// TODO remove star selector
injectGlobal`
  body {
    box-sizing: border-box;
    font-family: 'Open Sans', sans;
    margin: 0;
    height: 100%;
    min-height: 100%;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }
`;

const RootTheme = ({ children }) => {
  return (
    <ThemeProvider theme={MainTheme}>
      {children}
    </ThemeProvider>
  );
};

export default RootTheme;
