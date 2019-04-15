import React from "react";
import { Route, Switch } from "react-router-dom";

import UploadImage from "./Pages/UploadImage";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Thankyou from "./Pages/ThankYou";
import EditProfile from "./Pages/EditProfile";

export default function index(props) {
  const { handleChangeState, state } = props;
  return (
    <>
      <Switch>
        <Route
          exact
          path="/upload-verification-photo"
          render={props => (
            <UploadImage
              {...props}
              handleChangeState={handleChangeState}
              {...state}
            />
          )}
        />
        <Route
          exact
          path="/login"
          render={props => (
            <Login {...props} handleChangeState={handleChangeState} />
          )}
        />
        <Route
          exact
          path="/signup"
          render={props => (
            <Signup {...props} handleChangeState={handleChangeState} />
          )}
        />

        <Route
          exact
          path="/edit-profile"
          render={props => (
            <EditProfile
              {...props}
              handleChangeState={handleChangeState}
              {...state}
            />
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
