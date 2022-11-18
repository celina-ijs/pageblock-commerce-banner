import { Styles } from '@ijstech/components';

const Theme = Styles.Theme.ThemeVars as any;

Styles.cssRule('#bannerPage', {
    $nest: {
        '.changePageBtn:hover': {
            backgroundColor: 'black'
        }
    }
});