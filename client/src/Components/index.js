import React from "react";
import { Route, Switch } from "react-router-dom";

import HelloWorld from "./Pages/HelloWorld";

export default function index(props) {
  return (
    <>
      <Switch>
        <Route exact path="/hello" component={HelloWorld} />
        {/* 404 Error Page -need to be created */}
        <Route component={A} />
      </Switch>
    </>
  );
}

function A() {
  return <h1>Page Not Found</h1>;
}
