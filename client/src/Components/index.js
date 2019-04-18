import React from "react";
import { Route, Switch } from "react-router-dom";

import {
  SIGNUP_URL,
  LOGIN_URL,
  THANKYOU_URL,
  EDIT_PROFILE_URL,
  UPLOAD_VERIFICATION_URL
} from "./../constants/naviagationUrls";

import UploadImage from "./Pages/UploadImage";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Thankyou from "./Pages/ThankYou";
import EditProfile from "./Pages/EditProfile";
import Review from "./Pages/Review";
import StaticPages from "./Pages/Static";
import Navbar from "./Common/Navbar";
import Admin from "./Pages/Admin";

import {
  RESOURCES_URL,
  CONTACT_URL,
  FAQ_URL,
  PRIVACY_URL,
  ADMIN
} from "./../constants/naviagationUrls";

export default function index(props) {
  const { handleChangeState, isMobile, isLoggedIn, isAdmin } = props;

  return (
    <>
      <Switch>
        <Route path="/review" component={Review} />
        <Route
          exact
          path={SIGNUP_URL}
          render={linkProps => (
            <Signup
              {...props}
              {...linkProps}
              handleChangeState={handleChangeState}
            />
          )}
        />

        {/* orgType required as state in Link for this */}
        <Route path={THANKYOU_URL} {...props} component={Thankyou} />

        <Route
          exact
          path={LOGIN_URL}
          render={linkProps => (
            <>
              <Navbar
                {...linkProps}
                {...props}
                title="Page Not Found"
                isMobile={isMobile}
                search
                isLoggedIn={isLoggedIn}
              />
              <Login
                {...props}
                {...linkProps}
                handleChangeState={handleChangeState}
              />
            </>
          )}
        />

        <Route
          exact
          path={UPLOAD_VERIFICATION_URL}
          render={linkProps => (
            <UploadImage
              {...props}
              {...linkProps}
              handleChangeState={handleChangeState}
            />
          )}
        />
        {isAdmin && (
          <Route
            path={ADMIN}
            render={linkProps =>
              isAdmin && (
                <Admin
                  {...props}
                  {...linkProps}
                  handleChangeState={handleChangeState}
                />
              )
            }
          />
        )}
        {[FAQ_URL, RESOURCES_URL, CONTACT_URL, PRIVACY_URL].map(route => (
          <Route
            key={route}
            exact
            path={route}
            render={linkProps => (
              <StaticPages
                {...props}
                {...linkProps}
                handleChangeState={handleChangeState}
              />
            )}
          />
        ))}

        <Route
          exact
          path={EDIT_PROFILE_URL}
          render={linkProps => (
            <EditProfile
              {...props}
              handleChangeState={handleChangeState}
              {...linkProps}
            />
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
