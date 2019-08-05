import { createMuiTheme } from "@material-ui/core/styles";
import { deepOrange, grey, green, red } from "@material-ui/core/colors";

export default createMuiTheme({
  palette: {
    primary: {
      main: deepOrange[500]
    },
    secondary: {
      main: grey[900]
    },
    success: green,
    error: red
  },
  typography: {
    fontFamily: "'Lato', 'sans-serif'",
    titleFontFamily: "'Righteous', 'sans-serif'"
  }
});
