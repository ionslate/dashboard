import { create } from '@storybook/theming/create';

export default create({
  base: 'dark',

  colorPrimary: 'rgb(244, 114, 182)',
  colorSecondary: 'rgb(110, 231, 183)',

  // UI
  appBg: 'rgb(17, 24, 39)',
  appContentBg: 'rgb(31, 41, 55)',
  appBorderColor: 'rgb(17, 24, 39)',
  appBorderRadius: 8,

  // Typography
  fontBase: 'Arial, Helvetica, sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: 'rgb(243, 244, 246)',
  textInverseColor: 'rgb(31, 41, 55)',

  // Toolbar default and active colors
  barTextColor: 'rgb(243, 244, 246)',
  barSelectedColor: 'rgb(236, 72, 153)',
  barBg: 'rgb(55, 65, 81)',

  // Form colors
  inputBg: 'rgba(0, 0, 0, 80)',
  inputTextColor: 'rgb(243, 244, 246)',
  inputBorder: 'rgb(31, 41, 55)',
  inputBorderRadius: 4,

  brandTitle: 'Ion Slate',
  // brandUrl: 'https://example.com',
  // brandImage: SomeImage,
});
