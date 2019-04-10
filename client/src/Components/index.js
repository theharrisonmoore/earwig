import React from "react";
import { Route, Switch } from "react-router-dom";

import Thankyou from "./Pages/ThankYou";

export default function index(props) {
  return (
    <>
      <Switch>
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
