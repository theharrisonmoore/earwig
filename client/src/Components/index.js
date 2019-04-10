import React from "react";
import { Route, Switch } from "react-router-dom";

import Profile from "./Pages/Profile";

export default function index(props) {
  return (
    <>
      <Switch>
        <Route exact path="/profile/:profileID" component={Profile} />
        {/* 404 Error Page -need to be created */}
        <Route component={PageNotFound} />
      </Switch>
    </>
  );
}

function PageNotFound() {
  return <h1>Page Not Found</h1>;
}
