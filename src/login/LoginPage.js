import React from "react";
import LoginForm from "./LoginForm";
import Image from "./assets/bg_image_half_res.jpg";
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

const styles = theme => {
  return {
    titleBox: {
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    },
    title: {
      // color: theme.palette.primary[600],
      color: theme.palette.primary.main,
      fontFamily: theme.typography.titleFontFamily,
      letterSpacing: "10px",
      fontSize: "6rem",
      textShadow: "0px 1px 4px rgba(0,0,0,0.7)"
    },
    subtitle: {
      color: theme.palette.primary.main,
      fontFamily: theme.typography.titleFontFamily,
      fontWeight: 400,
      letterSpacing: "8px",
      fontSize: "1.4rem",
      textShadow: "0px 1px 4px rgba(0,0,0,0.7)"
    },
    container: {
      height: "100%",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      background: `url(${Image})`,
      backgroundSize: "cover"
    }
  };
};

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  loginHandler(values) {
    // Add code to post login details.
    console.log("logging in", values);
    return true;
  }
  registerHandler(values) {
    // Add code to register user.
    console.log("registering", values);
    return true;
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <div className={classes.titleBox}>
          <Typography variant="h1" component="h1" className={classes.title}>
            FETZEN
          </Typography>
          <Typography variant="h2" component="h2" className={classes.subtitle}>
            The workout tracker.
          </Typography>
        </div>
        <LoginForm loginHandler={this.loginHandler} registerHandler={this.registerHandler} />
      </div>
    );
  }
}

export default withStyles(styles)(LoginPage);
