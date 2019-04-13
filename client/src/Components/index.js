import React from "react";
import { Route, Switch } from "react-router-dom";

import Review from "./Pages/Review";
import Formik from "./Pages/Formik";
import Checkboxes from "./Pages/Formik/CheckBox";
import Radio from "./Pages/Formik/Radio";
import Login from "./Pages/Login";
import Thankyou from "./Pages/ThankYou";

export default function index(props) {
  const { handleChangeState } = props;
  return (
    <>
      <Switch>
        <Route path="/review" render={props => <Review />} />
        <Route path="/form" render={props => <Formik />} />
        <Route path="/check" render={props => <Checkboxes />} />
        <Route path="/radio" render={props => <Radio />} />
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
