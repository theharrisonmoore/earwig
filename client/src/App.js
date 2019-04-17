import React, { Component } from "react";
import axios from "axios";

import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";

import Routes from "./Components/";

import { isMobile } from "./helpers";

const initialState = {
  isLoggedIn: false,
  isMobile: false,
  id: "",
  trade: "",
  verified: false,
  awaitingReview: false,
  userId: "",
  points: 0,
  isAdmin: false,
  email: ""
};

class App extends Component {
  state = {
    ...initialState
  };

  updateWindowDimensions = this.updateWindowDimensions.bind(this);

  updateWindowDimensions() {
    this.setState({ isMobile: isMobile(window.innerWidth) });
  }

  getUserInfo = () => {
    axios
      .get("/api/user")
      .then(res => {
        this.setState({ ...res.data, isLoggedIn: true });
      })
      .catch(err => {
        if (err.response.status === 401) {
          this.setState({ ...initialState });
        } else {
          this.setState({ error: err.response });
        }
      });
  };

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
    this.getUserInfo();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  handleChangeState = data => {
    this.setState(data);
  };

  render() {
    const { isLoggedIn, isMobile } = this.state;
    return (
      <Router>
        <div className="App">
          <Routes
            handleChangeState={this.handleChangeState}
            isMobile={isMobile}
            isLoggedIn={isLoggedIn}
            {...this.state}
          />
        </div>
      </Router>
    );
  }
}

export default App;
