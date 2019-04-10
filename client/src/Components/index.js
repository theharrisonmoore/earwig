import React from "react";
import { Route, Switch } from "react-router-dom";

import UploadImage from "./UploadImage";

export default function index(props) {
  return (
    <>
      <Switch>
        <Route exact path="/upload" component={UploadImage} />
        {/* 404 Error Page -need to be created */}
        <Route component={PageNotFound} />
      </Switch>
    </>
  );
}

function PageNotFound() {
  return <h1>Page Not Found</h1>;
}
