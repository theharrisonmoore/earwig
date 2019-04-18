import React, { Component } from "react";

import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";

import Routes from "./Components/";

import { isMobile, isTablet } from "./helpers";

class App extends Component {
  state = {
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
    email: ""
  };

  updateWindowDimensions = this.updateWindowDimensions.bind(this);

  updateWindowDimensions() {
    this.setState({
      isMobile: isMobile(window.innerWidth),
      isTablet: isTablet(window.innerWidth)
    });
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  handleChangeState = data => {
    this.setState(data);
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
            state={this.state}
          />
        </div>
      </Router>
    );
  }
}

export default App;
