import React from "react";
import { Route, Switch } from "react-router-dom";

import Login from "./Pages/Login";
import Navbar from "./Common/Navbar";

export default function index(props) {
  const { handleChangeState, width } = props;
  return (
    <>
      <Switch>
        <Route
          exact
          path="/login"
          render={props => (
            <>
              <Navbar {...props} title="Page Not Found" width={width} />
              <Login {...props} handleChangeState={handleChangeState} />
            </>
          )}
        />

        {/* 404 Error Page -need to be created */}
        <Route component={PageNotFound} />
      </Switch>
    </>
  );
}

function PageNotFound(props) {
  return (
    <>
      <h1>Page Not Found</h1>
    </>
  );
}
