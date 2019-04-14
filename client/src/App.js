import React, { Component } from "react";

import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";

import Routes from "./Components/";

import { isMobile } from "./helpers";

class App extends Component {
  state = {
    isLoggedIn: false,
    isMobile: false
  };

  updateWindowDimensions = this.updateWindowDimensions.bind(this);

  updateWindowDimensions() {
    this.setState({ isMobile: isMobile(window.innerWidth) });
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
    const { isLoggedIn, isMobile } = this.state;
    return (
      <Router>
        <div className="App">
          <Routes
            handleChangeState={this.handleChangeState}
            isMobile={isMobile}
            isLoggedIn={isLoggedIn}
          />
        </div>
      </Router>
    );
  }
}

export default App;
