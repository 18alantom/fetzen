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
    "& .MuiInput-underline:hover:not($disabled):not($focused):not($error):before": {
      height: "1px",
      border: `1px solid ${darken(theme.palette.primary.main, 0.4)}`
    },
    "& .MuiInputBase-input": {
      color: theme.palette.primary.main
    },
    "& .MuiInputBase-input::-webkit-inner-spin-button": {
      appearance: "none"
    },
  }
}))(TextField);

// Custom Text Field to change the default colors.
export const CustomTextField1 = withStyles(theme => ({
  root: {
    "& .MuiInput-underline:before": {
      borderBottom: "none"
    },
    "& .MuiInput-underline:hover:not($disabled):not($focused):not($error):before": {
      height: "0px",
      border: "none"
    },
    "& .MuiInput-underline:after": {
      borderBottom: `solid 2px ${darken(theme.palette.primary.main, 0.2)}`
    },
    "& .MuiInputBase-input": {
      color: theme.palette.primary.main,
      textAlign: "end",
      cursor: "pointer"
    },
    "& .MuiInputBase-root": {
      cursor: "default"
    },
    "& .MuiInputBase-input::-webkit-inner-spin-button": {
      appearance: "none"
    },
    "& .MuiTypography-colorTextSecondary": {
      color: theme.palette.primary.dark
    }
  }
}))(TextField);

export const CustomTextField2 = withStyles(theme => ({
  root: {
    "& .MuiInputBase-input": {
      textAlign: "center",
      cursor: "default"
    }
  }
}))(CustomTextField1);

export default CustomTextField;
