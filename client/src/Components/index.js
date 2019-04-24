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
import QuickReview from "./Pages/QuickReview";
import Profile from "./Pages/Profile";
import Admin from "./Pages/Admin";
import Search from "./Pages/Search";
import JoinMailList from "./Pages/JoinMailList";
import AddProfileSelection from "./Pages/Search/AddProfileSelection";
import AddProfileStartReview from "./Pages/Search/AddProfileReviewStart";

import {
  RESOURCES_URL,
  CONTACT_URL,
  FAQ_URL,
  PRIVACY_URL,
  SEARCH_URL,
  ADD_PROFILE_URL,
  ADD_PROFILE_START_REVIEW_URL,
  ADMIN,
  REVIEW_URL,
  QUICK_REVIEW_URL
} from "./../constants/naviagationUrls";

export default function index(props) {
  const { handleChangeState, isMobile, isTablet, isLoggedIn, isAdmin } = props;

  return (
    <>
      <Switch>
        <Route
          exact
          path={QUICK_REVIEW_URL}
          render={linkProps => (
            <QuickReview
              {...props}
              {...linkProps}
              handleChangeState={handleChangeState}
            />
          )}
        />
        <Route
          exact
          path={REVIEW_URL}
          render={linkProps => (
            <Review
              {...props}
              {...linkProps}
              handleChangeState={handleChangeState}
            />
          )}
        />
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
            <Login
              {...props}
              {...linkProps}
              handleChangeState={handleChangeState}
            />
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
        <Route
          exact
          path="/profile/:profileID"
          render={linkProps => (
            <>
              <Navbar
                {...props}
                {...linkProps}
                isMobile={isMobile}
                search
                isLoggedIn={isLoggedIn}
              />
              <Profile
                {...props}
                {...linkProps}
                handleChangeState={handleChangeState}
                isTablet={isTablet}
                isMobile={isMobile}
                isLoggedIn={isLoggedIn}
              />
            </>
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
          path={SEARCH_URL}
          render={linkProps => (
            <Search
              {...props}
              {...linkProps}
              isMobile={isMobile}
              isTablet={isTablet}
              handleChangeState={handleChangeState}
            />
          )}
        />
        <Route
          path={ADD_PROFILE_URL}
          render={linkProps => (
            <AddProfileSelection
              {...props}
              {...linkProps}
              handleChangeState={handleChangeState}
            />
          )}
        />
        <Route
          path={ADD_PROFILE_START_REVIEW_URL}
          render={linkProps => (
            <AddProfileStartReview
              {...props}
              {...linkProps}
              isTablet={isTablet}
              isMobile={isMobile}
              handleChangeState={handleChangeState}
            />
          )}
        />
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

        <Route
          exact
          path={"/confirm-email/:id"}
          render={linkProps => (
            <JoinMailList
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
