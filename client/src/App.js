import React, { Component } from "react";
import axios from "axios";

import { BrowserRouter as Router } from "react-router-dom";

import "antd/dist/antd.css";
import "./App.css";

import Routes from "./Components/";

import { isMobile, isTablet } from "./helpers";

import { API_USERS } from "./apiUrls";

export const initialState = {
  isLoggedIn: false,
  isMobile: false,
  isTablet: false,
  id: "",
  trade: "",
  verified: false,
  awaitingReview: false,
  userId: "",
  points: 0,
  isAdmin: false,
  isMounted: false,
  email: ""
};

class App extends Component {
  state = {
    ...initialState
  };

  updateWindowDimensions = this.updateWindowDimensions.bind(this);

  updateWindowDimensions() {
    this.setState({
      isMobile: isMobile(window.innerWidth),
      isTablet: isTablet(window.innerWidth)
    });
  }

  getUserInfo = () => {
    axios
      .get(API_USERS)
      .then(res => {
        this.setState({ ...res.data, isLoggedIn: true, isMounted: true });
      })
      .catch(err => {
        if (err.response.status === 401) {
          this.setState({ ...initialState, isMounted: true });
        } else {
          this.setState({ error: err.response, isMounted: true });
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
    this.setState({ ...data, isMounted: true });
  };

  render() {
    const { isLoggedIn, isMobile, isTablet } = this.state;
    return (
      <Router>
        <div className="App">
          <Routes
            exact
            handleChangeState={this.handleChangeState}
            isMobile={isMobile}
            isTablet={isTablet}
            isLoggedIn={isLoggedIn}
            {...this.state}
          />
        </div>
      </Router>
    );
  }
}

export default App;
