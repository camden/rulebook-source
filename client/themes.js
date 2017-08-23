// @flow

import queries from 'media-queries';

export const MainTheme = {
  colors: {
    primary: 'hsl(340, 60%, 65%)',
    primary_transparent: 'hsla(340, 60%, 65%, .3)',
    black: '#333',
    border: '#efefef',
  },
  shadows: {
    strong: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
    medium: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    light: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
  },
  media: queries,
};
