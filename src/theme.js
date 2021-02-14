
import { purple, red } from '@material-ui/core/colors';

const COLORS = {
  PURPLE: purple[500], // Purple and green play nicely together.
  GREEN:  '#11cb5f',  // This is green.A700 as hex.
  RED: red[500]
}

export const customStyles = {
  imgResponsive: {
    width:'100%'
  },
}

export const themeMain = {
  palette: {
    primary: {
      main: COLORS.GREEN,
    },
    secondary: {
      main: COLORS.PURPLE,
    },
    error: {
      main: COLORS.RED
    },
    type: 'light',
  },
};

export const themeDark = {
  
  palette: {
    ...themeMain.palette,
    type: 'dark'
  },
};


