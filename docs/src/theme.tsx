import { createMuiTheme } from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';

export const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#3647ad'
    }
    // secondary: {
    //   main: '#4ec9b0'
    //, },
  },
  typography: {
    // fontFamily: `'Roboto Mono', monospace;`
  },
  overrides: {
    MuiButton: {
      text: {
        textTransform: 'none'
      }
    }
  }
});
