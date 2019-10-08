import { createMuiTheme } from "@material-ui/core/styles";
import { deepOrange, grey, green, red } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: deepOrange[500]
    },
    secondary: {
      light: grey[600],
      main: grey[900]
    },
    success: green,
    error: red
  },
  typography: {
    fontFamily: "'Lato', 'sans-serif'",
    titleFontFamily: "'Righteous', Arial, 'sans-serif'"
  }
});

document.getElementsByTagName("html")[0].style.backgroundColor = theme.palette.secondary.light;
document.getElementsByTagName("body")[0].style.backgroundColor = theme.palette.secondary.light;
document.getElementById("root").style.backgroundColor = theme.palette.secondary.light;
export default theme;
