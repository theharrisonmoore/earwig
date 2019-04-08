import React, { Component } from "react";

import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";

import Login from "./Components/Pages/Login";
import Routes from "./Components/";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App container">
          <Routes />
          <Login />
        </div>
      </Router>
    );
  }
}

export default App;
