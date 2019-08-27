import { withStyles } from "@material-ui/styles";
import { TextField } from "@material-ui/core";
import { fade, darken } from "@material-ui/core/styles/colorManipulator";
// Custom Text Field to change the default colors.
const CustomTextField = withStyles(theme => ({
  root: {
    "& label": {
      color: darken(theme.palette.primary.main, 0.2)
    },
    "& .MuiInput-underline:before": {
      borderBottom: `solid 1px ${fade(theme.palette.primary.main, 0.5)}`
    },
    "& .MuiInput-underline:after": {
      borderBottom: `solid 2px ${darken(theme.palette.primary.main, 0.2)}`
    },
    "& .MuiInputBase-input": {
      color: theme.palette.primary.main
    }
  }
}))(TextField);

export default CustomTextField;
