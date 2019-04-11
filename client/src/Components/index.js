import React from "react";
import { Route, Switch } from "react-router-dom";

import Review from "./Pages/Review";
import Formik from "./Pages/Formik";
import Checkboxes from "./Pages/Formik/CheckBox";
import Radio from "./Pages/Formik/Radio";

export default function index(props) {
  return (
    <>
      <Switch>
        <Route path="/review" render={props => <Review />} />
        <Route path="/form" render={props => <Formik />} />
        <Route path="/check" render={props => <Checkboxes />} />
        <Route path="/radio" render={props => <Radio />} />

        {/* 404 Error Page -need to be created */}
        <Route component={PageNotFound} />
      </Switch>
    </>
  );
}

function PageNotFound() {
  return <h1>Page Not Found</h1>;
}
