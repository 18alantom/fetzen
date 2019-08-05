import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import LoginPage from "./login/LoginPage";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./themes";
// Main page imports
import userData from "./main/dummy-data";
import Main from "./main/Main";

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
    <Main data={userData} />
  </ThemeProvider>,
  document.getElementById("root")
);
