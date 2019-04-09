import React from "react";
import { Route, Switch } from "react-router-dom";

import Login from "./Pages/Login";
import Navbar from "./Common/Navbar";

export default function index(props) {
  const { handleChangeState } = props;
  return (
    <>
      <Switch>
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
  return (
    <>
      <Navbar />
      <h1>Page Not Found</h1>
    </>
  );
}
