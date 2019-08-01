import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import LoginPage from "./login/LoginPage";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./themes";
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <LoginPage />
  </ThemeProvider>,
  document.getElementById("root")
);
