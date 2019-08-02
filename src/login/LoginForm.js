import React from "react";
import { withStyles } from "@material-ui/styles";
import { fade, darken } from "@material-ui/core/styles/colorManipulator";
import { Collapse, Link, Paper, Typography, TextField, Button } from "@material-ui/core";

// Custom Text Field to change the default colors.
const CustomTextField = withStyles(theme => ({
  root: {
    "& label": {
      color: theme.palette.primary[800]
    },
    "& .MuiInput-underline:before": {
      borderBottom: `solid 1px ${theme.palette.primary[900]}`
    },
    "& .MuiInput-underline:after": {
      borderBottom: `solid 2px ${theme.palette.primary[700]}`
    },
    "& .MuiInputBase-input": {
      color: theme.palette.primary[400]
    }
  }
}))(TextField);

// 'CSS'
const styles = theme => {
  return {
    form: {
      marginTop: 8,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px",
      width: "288px",
      marginBottom: 8,
      background: fade(darken(theme.palette.secondary[900], 0.9), 0.6),
      borderRadius: "0px",
      backdropFilter: "blur(4px)" // Only from chrome 76
    },
    loginTitle: {
      color: theme.palette.primary[700],
      textTransform: "uppercase",
      letterSpacing: "2px"
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
      color: theme.palette.primary[700],
      textAlign: "center"
    },
    error: {
      textAlign: "center",
      textTransform: "uppercase",
      fontSize: "0.8em",
      color: theme.palette.primary[300]
    }
  };
};

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputNames: {
        username: "username",
        password: "password",
        repassword: "repassword",
        fname: "first name",
        lname: "last name"
      },
      // If the inputNames are changed then change the keys below accordingly.
      values: {
        username: "",
        password: "",
        repassword: "",
        "first name": "",
        "last name": ""
      },
      isRegister: false,
      error: ""
    };
    this.linkClickHandler = this.linkClickHandler.bind(this);
    this.submitClickHandler = this.submitClickHandler.bind(this);
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.inputValidator = this.inputValidator.bind(this);
    this.loginValidator = this.loginValidator.bind(this);
    this.registerValidator = this.registerValidator.bind(this);
    this.postRegisterHandler = this.postRegisterHandler.bind(this);
  }
  inputValidator(input) {
    if (input !== "") {
      return true;
    }
    return false;
  }
  loginValidator() {
    const { inputNames, values } = this.state;
    const loginInputs = [inputNames.username, inputNames.password];
    let valid = true;
    loginInputs.forEach(i => {
      if (!this.inputValidator(values[i])) {
        this.setState({ error: `${i} is invalid` });
        valid = false;
      }
    });
    return valid;
  }
  registerValidator() {
    const { inputNames, values } = this.state;
    const registerInputs = [inputNames.password, inputNames.repassword, inputNames.lname, inputNames.fname];
    let valid = true;
    registerInputs.forEach(i => {
      if (!this.inputValidator(values[i])) {
        this.setState({ error: `${i} is invalid` });
        valid = false;
      }
    });
    if (values[inputNames.password] !== values[inputNames.repassword]) {
      this.setState({ error: "passwords don't match" });
      valid = false;
    }
    return valid;
  }
  inputChangeHandler({ target: { name, value } }) {
    this.setState(({ values }) => {
      values[name] = value;
      return {
        values: values
      };
    });
  }
  linkClickHandler() {
    this.setState(({ isRegister }) => ({ isRegister: !isRegister, error: "" }));
  }
  postRegisterHandler() {
    this.setState(({ values, isRegister }) => {
      Object.keys(values).forEach(k => (values[k] = ""));
      return { values, isRegister: !isRegister, error: "registered" };
    });
  }
  submitClickHandler(e) {
    e.preventDefault();
    const { isRegister } = this.state;
    let valid = this.loginValidator();
    if (isRegister && valid) {
      valid = this.registerValidator();
      if (valid) {
        if (this.props.registerHandler(this.state.values)) {
          this.postRegisterHandler();
        } else {
          valid = false;
          this.setState({ error: "registeration failed" });
        }
      }
    } else if (valid) {
      if (!this.props.loginHandler(this.state.values)) {
        this.setState({ error: "login failed" });
      }
    }
  }
  render() {
    const { classes } = this.props;
    const { error, isRegister, inputNames, values } = this.state;
    return (
      <div style={{ marginTop: 48 }}>
        <Collapse in={error !== ""}>
          {/* <Collapse in={true}> */}
          <Typography className={classes.error}>{error}</Typography>
        </Collapse>
        <Paper component="form" elevation={10} className={classes.form} id="login-form">
          <Typography component="h3" className={classes.loginTitle}>
            {isRegister ? "register" : "login"}
          </Typography>
          <CustomTextField
            autoComplete="off"
            label="Username"
            fullWidth
            className={classes.textField}
            name={inputNames.username}
            value={values[inputNames.username]}
            onChange={this.inputChangeHandler}
          />
          <CustomTextField
            label="Password"
            autoComplete="off"
            fullWidth
            type="password"
            className={classes.textField}
            name={inputNames.password}
            value={values[inputNames.password]}
            onChange={this.inputChangeHandler}
          />
          <Collapse in={isRegister}>
            <CustomTextField
              label="Re Password"
              autoComplete="off"
              fullWidth
              type="password"
              className={classes.textField}
              name={inputNames.repassword}
              value={values[inputNames.repassword]}
              onChange={this.inputChangeHandler}
            />
            <CustomTextField
              autoComplete="off"
              label="First Name"
              fullWidth
              className={classes.textField}
              name={inputNames.fname}
              value={values[inputNames.fname]}
              onChange={this.inputChangeHandler}
            />
            <CustomTextField
              autoComplete="off"
              label="Last Name"
              fullWidth
              className={classes.textField}
              name={inputNames.lname}
              value={values[inputNames.lname]}
              onChange={this.inputChangeHandler}
            />
          </Collapse>
          <Button type="submit" size="large" className={classes.button} onClick={this.submitClickHandler}>
            submit
          </Button>
        </Paper>
        <Link className={classes.link} onClick={this.linkClickHandler}>
          <Typography>{isRegister ? "login" : "register"}</Typography>
        </Link>
      </div>
    );
  }
}
export default withStyles(styles)(LoginForm);
