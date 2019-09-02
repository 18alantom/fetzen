import { withStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core";

// CustomButtons where the text is left or right aligned

export const RightButton = withStyles(theme => ({
  root: {
    "& .MuiButton-label": {
      display: "flex",
      justifyContent: "flex-end"
    }
  }
}))(Button);
export const LeftButton = withStyles(theme => ({
  root: {
    "& .MuiButton-label": {
      display: "flex",
      justifyContent: "flex-start"
    }
  }
}))(Button);
