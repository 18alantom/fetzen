import { withStyles } from "@material-ui/styles";
import { Checkbox } from "@material-ui/core";
import { darken } from "@material-ui/core/styles/colorManipulator";

export const CustomCheckbox = withStyles(theme => ({
  root: {
    "& .MuiSvgIcon-root": {
      color: darken(theme.palette.primary.main, 0.3)
    }
  }
}))(Checkbox);
