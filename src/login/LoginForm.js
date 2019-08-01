import React from "react";
import { withStyles } from "@material-ui/styles";
import { fade, darken } from "@material-ui/core/styles/colorManipulator";
import { Collapse, Link, Paper, Typography, TextField, Button } from "@material-ui/core";
const CustomTextField = withStyles(theme => ({
  root: {
    "& label": {
      color: theme.palette.primary[900]
    },
    "& label.Mui-focused": {
      color: theme.palette.primary[900]
    },
    "& .MuiInput-underline:after": {
      color: theme.palette.primary[900]
    },
    "& .MuiInputBase-input": {
      color: theme.palette.primary[400]
    }
  }
}))(TextField);
const styles = theme => {
  return {
    form: {
      marginTop: 64,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px",
      width: "288px",
      marginBottom: 8,
      background: fade(darken(theme.palette.secondary[900], 0.3), 0.6),
      borderRadius: "0px",
      backdropFilter: "blur(5px)" // Only from chrome 76
    },
    loginTitle: {
      color: theme.palette.primary[700],
      textTransform: "uppercase"
    },
    textField: {
      marginBottom: "16px",
      color: theme.palette.primary[500]
    },
    button: {
      borderRadius: 0,
      color: theme.palette.primary[700]
    },
    link: {
      textShadow: "0px 1px 2px black",
      textTransform: "uppercase",
      cursor: "pointer",
      color: theme.palette.primary[900],
      textAlign: "center"
    }
  };
};

// TODO: Add text change listener make the text go somewhere.
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRegister: false
    };
    this.linkClickHandler = this.linkClickHandler.bind(this);
    this.submitClickHandler = this.submitClickHandler.bind(this);
  }
  linkClickHandler() {
    this.setState(({ isRegister }) => ({ isRegister: !isRegister }));
  }
  submitClickHandler(e) {
    e.preventDefault();
    alert("SUBMITTED");
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper elevation={10} className={classes.form} id="login-form">
          <Typography component="h3" className={classes.loginTitle}>
            {this.state.isRegister ? "register" : "login"}
          </Typography>
          <CustomTextField label="Username" fullWidth className={classes.textField} />
          <CustomTextField label="Password" fullWidth type="password" className={classes.textField} />
          <Collapse in={this.state.isRegister}>
            <CustomTextField label="Re Password" fullWidth type="password" className={classes.textField} />
            <CustomTextField label="Email" fullWidth type="email" className={classes.textField} />
          </Collapse>
          <Button size="large" className={classes.button} onClick={this.submitClickHandler}>
            submit
          </Button>
        </Paper>
        <Link className={classes.link} onClick={this.linkClickHandler}>
          <Typography>{this.state.isRegister ? "login" : "register"}</Typography>
        </Link>
      </div>
    );
  }
}
export default withStyles(styles)(LoginForm);
