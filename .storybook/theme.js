import { create } from '@storybook/theming';

export default create({
    base: 'dark',
    colorPrimary: 'red',
    colorSecondary: '#58487b',
      brandTitle: 'Appexchange Shared Library',
    brandUrl: 'https://appx-shared.herokuapp.com',
    brandImage: 'https://placehold.it/350x150',
    appContentBg: '#251f33',
    appBg: '#6d608a',
    barBg: '#3b3152',
    barSelectedColor: 'white',
    background: { content: 'red' },
  
    addonActionsTheme: {
      // ...chromeLight,
      // BASE_FONT_FAMILY: typography.fonts.mono,
      BASE_BACKGROUND_COLOR: 'black',
    },
  
});