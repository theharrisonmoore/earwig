import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

export default class Reviews extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/admin/reviews/"
          render={props => <h1>all reviews</h1>}
        />
        <Route
          exact
          path="/admin/reviews/verify"
          render={props => <h1>verify reviews</h1>}
        />
      </Switch>
    );
  }
}
