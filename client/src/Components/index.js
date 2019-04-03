import React from "react";
import { Route, Switch } from "react-router-dom";

export default function index(props) {
  return (
    <>
      <Switch>
        {/* 404 Error Page -need to be created */}
        <Route component={PageNotFound} />
      </Switch>
    </>
  );
}

function PageNotFound() {
  return <h1>Page Not Found</h1>;
}
