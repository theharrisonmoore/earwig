import React from "react";
import { Route, Switch } from "react-router-dom";

import {
  SIGNUP_URL,
  LOGIN_URL,
  THANKYOU_URL
} from "./../constants/naviagationUrls";

import UploadImage from "./Pages/UploadImage";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Thankyou from "./Pages/ThankYou";
import Review from "./Pages/Review";
import StaticPages from "./Pages/Static";
import Navbar from "./Common/Navbar";
import QuickReview from "./Pages/QuickReview";

import {
  RESOURCES_URL,
  CONTACT_URL,
  FAQ_URL,
  PRIVACY_URL
} from "./../constants/naviagationUrls";

export default function index(props) {
  const { handleChangeState, isMobile, isLoggedIn, state } = props;

  return (
    <>
      <Switch>
        <Route path="/review" component={Review} />
        <Route path="/review-quick" component={QuickReview} />
        <Route
          exact
          path={SIGNUP_URL}
          render={props => (
            <Signup {...props} handleChangeState={handleChangeState} />
          )}
        />
        {/* orgType required as state in Link for this */}
        <Route path={THANKYOU_URL} component={Thankyou} />
        <Route
          exact
          path={LOGIN_URL}
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

        {[FAQ_URL, RESOURCES_URL, CONTACT_URL, PRIVACY_URL].map(route => (
          <Route
            key={route}
            exact
            path={route}
            render={props => (
              <StaticPages
                {...props}
                handleChangeState={handleChangeState}
                {...state}
              />
            )}
          />
        ))}

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
