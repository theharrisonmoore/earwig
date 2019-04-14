import React, { Component } from "react";

import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";

import Routes from "./Components/";

class App extends Component {
  state = {
    isLoggedIn: true,
    id: "",
    trade: "",
    verified: false,
    awaitingReview: false,
    userId: "",
    points: 0,
    isAdmin: false,
    email: ""
  };

  handleChangeState = data => {
    this.setState(data);
  };

  componentDidMount() {}

  render() {
    return (
      <Router>
        <div className="App">
          <Routes
            handleChangeState={this.handleChangeState}
            state={this.state}
          />
        </div>
      </Router>
    );
  }
}

export default App;
