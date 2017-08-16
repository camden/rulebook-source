// @flow

import React from 'react';
import { ThemeProvider } from 'styled-components';

import { MainTheme } from 'themes';

import { injectGlobal } from 'styled-components';

injectGlobal`
  body {
    font-family: 'Open Sans', sans;
    margin: 0;
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
