// @flow

import queries from 'media-queries';
import Color from 'color';

export const MainTheme = {};

MainTheme.colors = {
  primary: 'hsl(342, 69%, 50%)',
  black: '#333',
  quote: '#888',
  border: '#efefef',
  webkitTapDefault: 'transparent',
  icon: {},
};

MainTheme.colors.primary_transparent = Color(MainTheme.colors.primary)
  .fade(0.5)
  .string();

MainTheme.colors.icon = {
  default: Color(MainTheme.colors.primary)
    .lighten(0.2)
    .string(),
  hover: Color(MainTheme.colors.primary).string(),
  focus: Color(MainTheme.colors.primary)
    .lighten(0.85)
    .string(),
};

MainTheme.shadows = {
  strong: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
  medium: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
  light: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
};

MainTheme.media = queries;
