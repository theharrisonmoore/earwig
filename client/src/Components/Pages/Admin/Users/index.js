import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import AllUsers from "./AllUsers";

import { routes } from "./../../../../constants/adminRoutes";

const { USERS_ALL, USERS_VERIFY } = routes;

export default class Users extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path={USERS_ALL}
          render={props => <AllUsers {...props} />}
        />
        <Route
          exact
          path={USERS_VERIFY}
          render={props => <h1>verify users</h1>}
        />
      </Switch>
    );
  }
}
