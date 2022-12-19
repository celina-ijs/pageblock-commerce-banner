import { Styles } from '@ijstech/components';

const Theme = Styles.Theme.ThemeVars as any;

Styles.cssRule('#mainPnl', {
  $nest: {
    '.changePageBtn:hover': {
      backgroundColor: 'black'
    },
    '.removeImg': {
      visibility: 'visible',
      zIndex: 10
    },
    'i-panel.container': {
      width: Theme.layout.container.width,
      maxWidth: Theme.layout.container.maxWidth,
      overflow: Theme.layout.container.overflow,
      textAlign: (Theme.layout.container.textAlign as any),
      margin: '0 auto'
    }
  }
});
