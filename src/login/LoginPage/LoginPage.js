import React from "react";
import LoginForm from "./LoginForm/LoginForm";
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import styles from "./login-page-styles";

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
