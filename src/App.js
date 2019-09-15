import React from "react";
import { getEndPoint as gEP, endpoints as ep } from "./helpers/endpoints";
import { getLoginJson } from "./helpers/json-getters";
import Main from "./main/Main/Main";
import LoginPage from "./login/LoginPage/LoginPage";

let URL;
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  URL = "http://localhost:3000";
} else {
  URL = "";
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loggedin: false, userData: {}, status: {}, error: "" };
    this.loginHandler = this.loginHandler.bind(this);
    this.dataLoaded = this.dataLoaded.bind(this);
  }

  dataLoaded() {
    this.setState({ userData: {}, status: {}, error: "" });
  }

  loginHandler(values) {
    const headers = new Headers({ "Content-Type": "application/json" });
    const init = {
      method: "POST",
      body: getLoginJson(values),
      headers
    };
    const req = new Request(gEP(URL, ep.users.login), init);
    fetch(req)
      .catch(err => {
        this.setState(({ status }) => {
          status.ok = false;
          status.code = 503;
          status.message = err.message;
          return { status };
        });
        return false;
      })
      .then(res => {
        if (res) {
          this.setState(({ status }) => {
            status.ok = res.ok;
            status.code = res.status;
            return { status };
          });
          return res.json();
        } else {
          return "server error";
        }
      })
      .then(data => {
        const { ok } = this.state.status;
        if (ok) {
          this.setState({ userData: data });
          return true;
        } else {
          throw new Error(`${data}`);
        }
      })
      .then(dataSet => {
        if (dataSet) {
          this.setState({ loggedin: true });
        }
      })
      .catch(err => {
        this.setState({ error: err.message });
      });
  }

  render() {
    const { loggedin, userData, error } = this.state;
    return (
      <React.Fragment>
        {loggedin && <Main userData={userData} dataLoadedHandler={this.dataLoaded} />}
        {!loggedin && <LoginPage loginHandler={this.loginHandler} fetchError={error} />}
      </React.Fragment>
    );
  }
}

export default App;
