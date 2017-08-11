// @flow

import React from 'react';
import { ThemeProvider } from 'styled-components';

import BaseStyle from 'components/BaseStyle';
import { MainTheme } from 'themes';

const RootTheme = ({ children }) => {
  return (
    <BaseStyle>
      <ThemeProvider theme={MainTheme}>
        {children}
      </ThemeProvider>
    </BaseStyle>
  );
};

export default RootTheme;
