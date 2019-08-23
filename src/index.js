import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./themes";
// Main page imports
import Main from "./main/Main/Main";
// Login page imports
// import LoginPage from "./login/LoginPage/LoginPage";

// ReactDOM.render(
//   <ThemeProvider theme={theme}>
//     <CssBaseline />
//     <LoginPage />
//   </ThemeProvider>,
//   document.getElementById("root")
// );

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Main />
  </ThemeProvider>,
  document.getElementById("root")
);
