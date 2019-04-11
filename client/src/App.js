import React, { Component } from "react";

import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";

import Routes from "./Components/";

class App extends Component {
  state = {
    isLoggedIn: false
  };

  handleChangeState = data => {
    this.setState(data);
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Routes handleChangeState={this.handleChangeState} />
        </div>
      </Router>
    );
  }
}

export default App;
