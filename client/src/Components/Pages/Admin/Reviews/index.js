import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import { routes } from "./../../../../constants/adminRoutes";
const { REVIEWS_ALL, REVIEWS_VERIFY } = routes;

export default class Reviews extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path={REVIEWS_ALL}
          render={props => <h1>all reviews</h1>}
        />
        <Route
          exact
          path={REVIEWS_VERIFY}
          render={props => <h1>verify reviews</h1>}
        />
      </Switch>
    );
  }
}
