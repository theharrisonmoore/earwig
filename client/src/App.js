import React, { Component } from "react";

import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";

import Routes from "./Components/";

class App extends Component {
  state = {
    isLoggedIn: false,
    width: 0
  };

  updateWindowDimensions = this.updateWindowDimensions.bind(this);

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth });
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
    const { isLoggedIn, width } = this.state;
    return (
      <Router>
        <div className="App">
          <Routes
            handleChangeState={this.handleChangeState}
            width={width}
            isLoggedIn={isLoggedIn}
          />
        </div>
      </Router>
    );
  }
}

export default App;
