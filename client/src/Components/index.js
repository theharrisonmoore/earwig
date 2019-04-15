import React from "react";
import { Route, Switch } from "react-router-dom";

import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Thankyou from "./Pages/ThankYou";
import Navbar from "./Common/Navbar";

export default function index(props) {
  const { handleChangeState, isMobile, isLoggedIn } = props;
  return (
    <>
      <Switch>
        <Route
          exact
          path="/signup"
          render={props => (
            <Signup {...props} handleChangeState={handleChangeState} />
          )}
        />
        {/* orgType required as state in Link for this */}
        <Route path="/thank-you" component={Thankyou} />
        <Route
          exact
          path="/login"
          render={props => (
            <>
              <Navbar
                {...props}
                title="Page Not Found"
                isMobile={isMobile}
                search
                isLoggedIn={isLoggedIn}
              />
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
