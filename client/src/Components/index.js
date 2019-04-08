import React from "react";
import { Route, Switch } from "react-router-dom";

import Thankyou from "./Pages/ThankYou";
import Login from "./Pages/Login";

export default function index(props) {
  const { handleChangeState } = props;
  return (
    <>
      <Switch>
        {/* orgType required as state in Link for this */}
        <Route path="/thank-you" component={Thankyou} />
        <Route
          exact
          path="/login"
          render={props => (
            <Login {...props} handleChangeState={handleChangeState} />
          )}
        />

        {/* 404 Error Page -need to be created */}
        <Route component={PageNotFound} />
      </Switch>
    </>
  );
}

function PageNotFound() {
  return <h1>Page Not Found</h1>;
}
