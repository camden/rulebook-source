// @flow

import React from 'react';
import { ThemeProvider } from 'styled-components';

import { MainTheme } from 'themes';

import { injectGlobal } from 'styled-components';

injectGlobal`
  body {
    box-sizing: border-box;
    font-family: 'Open Sans', sans;
    margin: 0;
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
