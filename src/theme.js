import { createMuiTheme } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';

const COLORS = {
  PURPLE: purple[500], // Purple and green play nicely together.
  GREEN:  '#11cb5f'  // This is green.A700 as hex.
}

export const themeMain = {
  palette: {
    primary: {
      main: COLORS.GREEN,
    },
    secondary: {
      main: COLORS.PURPLE,
    },
    type: 'light',
  },
};


export const themeDark = {
  
  palette: {
    ...themeMain.palette,
    type: 'dark',
    // primary: {
    //   main: themeMain.palette.secondary.main
    // },
    // secondary: {
    //   main: themeMain.palette.primary.main,
    // },
  },
};

