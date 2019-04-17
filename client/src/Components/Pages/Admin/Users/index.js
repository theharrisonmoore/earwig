import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import AllUsers from "./AllUsers";
export default class Users extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/admin/users/"
          render={props => <AllUsers {...props} />}
        />
        <Route
          exact
          path="/admin/users/verify"
          render={props => <h1>verify users</h1>}
        />
      </Switch>
    );
  }
}
