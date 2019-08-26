import { withStyles } from "@material-ui/styles";
import { Dialog } from "@material-ui/core";

const CustomDialog = withStyles(theme => ({
  root: {
    "& .MuiPaper-rounded": {
      borderRadius: "0px",
      backgroundColor: theme.palette.secondary.main
    }
  }
}))(Dialog);

export default CustomDialog;
