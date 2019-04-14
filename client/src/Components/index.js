import React from "react";
import { Route, Switch } from "react-router-dom";

import Login from "./Pages/Login";
import Thankyou from "./Pages/ThankYou";
import Review from "./Pages/Review";

export default function index(props) {
  const { handleChangeState } = props;
  return (
    <>
      <Switch>
        <Route path="/review" render={props => <Review />} />
        <Route
          exact
          path="/login"
          render={props => (
            <Login {...props} handleChangeState={handleChangeState} />
          )}
        />
        {/* orgType required as state in Link for this */}
        <Route path="/thank-you" component={Thankyou} />

        {/* 404 Error Page -need to be created */}
        <Route component={PageNotFound} />
      </Switch>
    </>
  );
}

function PageNotFound() {
  return <h1>Page Not Found</h1>;
}
