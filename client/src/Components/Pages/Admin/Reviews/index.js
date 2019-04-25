import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import { routes } from "./../../../../constants/adminRoutes";

import AllReviews from "./AllReviews";
const { REVIEWS_ALL, REVIEWS_VERIFY } = routes;

export default class Reviews extends Component {
  render() {
    return (
      <Switch>
        <Route exact path={REVIEWS_ALL} render={props => <AllReviews />} />
        <Route
          exact
          path={REVIEWS_VERIFY}
          render={props => <AllReviews awaitingReview />}
        />
      </Switch>
    );
  }
}
