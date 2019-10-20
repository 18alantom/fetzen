import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./themes";

let URL;
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  URL = "http://localhost:3001";
} else {
  URL = "https://fetzen-server.herokuapp.com";
}

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App URL={URL}/>
  </ThemeProvider>,
  document.getElementById("root")
);
