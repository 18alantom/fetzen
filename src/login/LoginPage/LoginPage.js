import React from "react";
import LoginForm from "./LoginForm/LoginForm";
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import styles from "./login-page-styles";

class LoginPage extends React.Component {
  render() {
    const { classes, loginHandler, registerHandler, fetchError, fetchInfo, registered, dismissRegister } = this.props;
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
        <LoginForm
          loginHandler={loginHandler}
          fetchError={fetchError}
          registerHandler={registerHandler}
          fetchInfo={fetchInfo}
          registered={registered}
          dismissRegister={dismissRegister}
        />
      </div>
    );
  }
}

export default withStyles(styles)(LoginPage);
