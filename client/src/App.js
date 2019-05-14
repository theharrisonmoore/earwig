import React, { Component } from "react";
import axios from "axios";

import { BrowserRouter as Router } from "react-router-dom";

import "antd/dist/antd.css";
import "./App.css";

import Routes from "./Components/";

import { isMobile, isTablet } from "./helpers";

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
      .get("/api/user")
      .then(res => {
        this.setState({ ...res.data, isLoggedIn: true, isMounted: true });
        this.updateWindowDimensions();
      })
      .catch(err => {
        if (err.response.status === 401) {
          this.setState({ ...initialState, isMounted: true });
          this.updateWindowDimensions();
        } else {
          this.setState({ error: err.response, isMounted: true });
        }
      });
  };

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
    this.getUserInfo();
    window.scrollTo(0, 0);
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
