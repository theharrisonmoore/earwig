import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import { routes } from "./../../../../constants/adminRoutes";

import AllReviews from "./AllReviews";
import SingleReview from "./SingleReview";

const { REVIEWS_ALL, REVIEWS_VERIFY, SINGLE_REVIEW } = routes;

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
        <Route
          exact
          path={SINGLE_REVIEW}
          render={props => <SingleReview {...props} />}
        />
      </Switch>
    );
  }
}
