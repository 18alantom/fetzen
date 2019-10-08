import React from "react";
import moment from "moment";
import { getEndPoint as gEP, endpoints as ep } from "./helpers/endpoints";
import { getLoginJson, getRegisterJson } from "./helpers/json-getters";
import Main from "./main/Main/Main";
import LoginPage from "./login/LoginPage/LoginPage";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loggedin: false, registered: false, userData: {}, status: {}, error: "", info: "" };
    this.loginHandler = this.loginHandler.bind(this);
    this.logoutHandler = this.logoutHandler.bind(this);
    this.dataLoaded = this.dataLoaded.bind(this);
    this.registerHandler = this.registerHandler.bind(this);
    this.dismissRegister = this.dismissRegister.bind(this);
    this.saveToLocalStorage = this.saveToLocalStorage.bind(this);
    this.getFromLocalStorage = this.getFromLocalStorage.bind(this);
    this.clearLocalStroage = this.clearLocalStroage.bind(this);
  }

  dismissRegister() {
    this.setState({ userData: {}, status: {}, error: "", info: "", registered: false, loggedin: false });
  }

  dataLoaded() {
    this.setState({ userData: {}, status: {}, error: "", info: "" });
  }

  componentDidMount() {
    if (JSON.parse(this.getFromLocalStorage("loggedin"))) {
      const userData = this.getFromLocalStorage("userData");
      const loginTime = JSON.parse(this.getFromLocalStorage("loginTime"));
      if (userData && this.isNotTimeout(loginTime)) {
        this.setState({ loggedin: true, userData: JSON.parse(userData) });
      } else {
        this.clearLocalStroage();
      }
    }
  }

  isNotTimeout(loginTime) {
    const loginMoment = moment(loginTime);
    const duration = moment.duration(moment(new Date().toISOString()).diff(loginMoment)).asHours();
    // Timeout is one hour;
    return duration < 1;
  }

  saveToLocalStorage(name, data) {
    try {
      if (localStorage) {
        if (!data) {
          localStorage.setItem(name, JSON.stringify(this.state.userData));
        } else {
          localStorage.setItem(name, JSON.stringify(data));
        }
        // Prevent timeout if activity.
        localStorage.setItem("loginTime", JSON.stringify(new Date().toISOString()));
      } else {
        console.error("local storage not present");
      }
    } catch (err) {
      console.error(err);
    }
  }

  getFromLocalStorage(name) {
    try {
      if (localStorage) {
        return localStorage.getItem(name);
      } else {
        console.error("local storage not present");
      }
    } catch (err) {
      console.error(err);
    }
  }

  clearLocalStroage() {
    try {
      if (localStorage) {
        localStorage.clear();
      } else {
        console.error("local storage not present");
      }
    } catch (err) {
      console.error(err);
    }
  }

  loginHandler(values) {
    const headers = new Headers({ "Content-Type": "application/json" });
    const init = {
      method: "POST",
      body: getLoginJson(values),
      headers
    };
    const req = new Request(gEP(this.props.URL, ep.users.login), init);
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
          return "network error";
        }
      })
      .then(data => {
        const { ok } = this.state.status;
        if (ok) {
          this.saveToLocalStorage("loginTime", new Date().toISOString());
          this.saveToLocalStorage("userData", data);
          this.setState({ userData: data });
          return true;
        } else {
          throw new Error(`${data}`);
        }
      })
      .then(dataSet => {
        if (dataSet) {
          this.saveToLocalStorage("loggedin", true);
          this.setState({ loggedin: true, info: "logging in" });
        }
      })
      .catch(err => {
        this.setState({ error: err.message });
      });
  }

  registerHandler(values) {
    const headers = new Headers({ "Content-Type": "application/json" });
    const init = {
      method: "POST",
      body: getRegisterJson(values),
      headers
    };
    const req = new Request(gEP(this.props.URL, ep.users.register), init);
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
          return "network error";
        }
      })
      .then(data => {
        const { ok } = this.state.status;
        if (ok) {
          this.setState({ registered: true, info: data });
        } else {
          throw new Error(`${data}`);
        }
      })
      .catch(err => {
        this.setState({ error: err.message });
      });
  }

  logoutHandler() {
    this.clearLocalStroage();
    this.setState({ loggedin: false, registered: false, userData: {}, status: {}, error: "", info: "" });
  }

  render() {
    const { loggedin, userData, error, info, registered } = this.state;
    const { URL } = this.props;
    return (
      <React.Fragment>
        {loggedin && (
          <Main
            userData={userData}
            dataLoadedHandler={this.dataLoaded}
            URL={URL}
            logoutHandler={this.logoutHandler}
            saveToLocalStorage={this.saveToLocalStorage}
          />
        )}
        {!loggedin && (
          <LoginPage
            loginHandler={this.loginHandler}
            registerHandler={this.registerHandler}
            fetchError={error}
            fetchInfo={info}
            registered={registered}
            dismissRegister={this.dismissRegister}
          />
        )}
      </React.Fragment>
    );
  }
}

export default App;
