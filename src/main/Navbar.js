import React from "react";
import { withStyles } from "@material-ui/styles";
import { AppBar, Typography } from "@material-ui/core";

const styles = theme => {
  return {
    title: {
      fontFamily: theme.typography.titleFontFamily,
      color: theme.palette.primary.main,
      letterSpacing: "5px",
      fontSize: "2rem",
      padding: "8px 32px",
    },
    navbar: {
      zIndex: theme.zIndex.drawer + 1,
      background: theme.palette.secondary.dark
    }
  };
};

class Navbar extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    const { classes } = this.props;
    return (
      <AppBar component="nav" className={`${classes.navbar}`}>
        <Typography className={classes.title} component="h1">
          FETZEN
        </Typography>
      </AppBar>
    );
  }
}
export default withStyles(styles)(Navbar);
