import React from "react";
import { withStyles } from "@material-ui/styles";
import { useScrollTrigger, AppBar, Typography } from "@material-ui/core";
import styles from "./navbar-styles";

const Navbar = props => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 8
  });
  const { classes } = props;
  return (
    <AppBar elevation={trigger ? 3 : 0} component="nav" className={`${classes.navbar}`}>
      <Typography className={classes.title} component="h1">
        FETZEN
      </Typography>
      <div className={`${classes.linkContainer}`}>
        <Typography className={classes.link} component="button" onClick={props.openProfileModal}>
          Profile
        </Typography>
        <Typography className={classes.link} component="button" onClick={props.handleLogout}>
          Logout
        </Typography>
      </div>
    </AppBar>
  );
};

export default withStyles(styles)(Navbar);
