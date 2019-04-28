import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import {
  SIGNUP_URL,
  LOGIN_URL,
  THANKYOU_URL,
  EDIT_PROFILE_URL,
  UPLOAD_VERIFICATION_URL,
  ORGS_PROFILE_URL,
  DELETE_PROFILE_URL
} from "./../constants/naviagationUrls";

import UploadImage from "./Pages/UploadImage";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Thankyou from "./Pages/ThankYou";
import EditProfile from "./Pages/EditProfile";
import DeleteProfile from "./Pages/DeleteProfile";
import UserProfile from "./Pages/UserProfile";
import Review from "./Pages/Review";
import QuickReview from "./Pages/QuickReview";
import Profile from "./Pages/Profile";
import Admin from "./Pages/Admin";
import Search from "./Pages/Search";
import JoinMailList from "./Pages/JoinMailList";
import AddProfileSelection from "./Pages/Search/AddProfileSelection";
import AddProfileStartReview from "./Pages/Search/AddProfileReviewStart";
import Intro from "./Pages/Intro";
import PrivateRoute from "./Common/PrivateRoute";
import {
  FAQ,
  HelpfulStuff,
  ShapeEarwig,
  PrivacyAndTerms
} from "./Pages/Static";

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
  QUICK_REVIEW_URL,
  CONFIRM_EMAIL_URL,
  INTRO_URL,
  USER_PROFILE_URL
} from "./../constants/naviagationUrls";

export default function index(props) {
  const { handleChangeState, isMobile, isTablet, isLoggedIn, isAdmin } = props;

  return (
    <>
      <Switch>
        <PrivateRoute
          minimumLevel="LEVEL3"
          exact
          path={QUICK_REVIEW_URL}
          {...props}
          Component={QuickReview}
        />
        <PrivateRoute
          exact
          minimumLevel="LEVEL3"
          path={REVIEW_URL}
          {...props}
          Component={Review}
        />
        <PrivateRoute
          exact
          minimumLevel="LEVEL3"
          path={THANKYOU_URL}
          {...props}
          Component={Thankyou}
        />
        <PrivateRoute
          exact
          minimumLevel="LEVEL1"
          path={UPLOAD_VERIFICATION_URL}
          {...props}
          Component={UploadImage}
          navbar
        />

        <PrivateRoute
          exact
          minimumLevel="LEVEL1"
          path={ORGS_PROFILE_URL}
          isTablet={isTablet}
          isMobile={isMobile}
          {...props}
          Component={Profile}
          navbar
          search
        />
        <PrivateRoute
          minimumLevel="ADMIN"
          path={ADMIN}
          {...props}
          Component={Admin}
        />

        <PrivateRoute
          minimumLevel="LEVEL0"
          path={SEARCH_URL}
          {...props}
          isMobile={isMobile}
          isTablet={isTablet}
          Component={Search}
          navbar
        />
        <PrivateRoute
          minimumLevel="LEVEL3"
          path={ADD_PROFILE_URL}
          {...props}
          isMobile={isMobile}
          isTablet={isTablet}
          Component={AddProfileSelection}
          navbar
        />

        <PrivateRoute
          minimumLevel="LEVEL3"
          path={ADD_PROFILE_START_REVIEW_URL}
          {...props}
          isMobile={isMobile}
          isTablet={isTablet}
          Component={AddProfileStartReview}
          navbar
        />

        <PrivateRoute
          minimumLevel="LEVEL1"
          path={EDIT_PROFILE_URL}
          {...props}
          isMobile={isMobile}
          isTablet={isTablet}
          Component={EditProfile}
        />

        <PrivateRoute
          minimumLevel="LEVEL1"
          path={DELETE_PROFILE_URL}
          {...props}
          isMobile={isMobile}
          isTablet={isTablet}
          Component={DeleteProfile}
        />

        <PrivateRoute
          minimumLevel="LEVEL1"
          path={USER_PROFILE_URL}
          {...props}
          isMobile={isMobile}
          isTablet={isTablet}
          Component={UserProfile}
          navbar
          title="Your profile"
        />

        <PrivateRoute
          minimumLevel="LEVEL0"
          path={CONFIRM_EMAIL_URL}
          {...props}
          isMobile={isMobile}
          isTablet={isTablet}
          Component={JoinMailList}
        />

        <PrivateRoute
          minimumLevel="LEVEL0"
          path={FAQ_URL}
          {...props}
          isMobile={isMobile}
          isTablet={isTablet}
          Component={FAQ}
          navbar
          title="FAQ & explainer videos"
          search
        />
        <PrivateRoute
          minimumLevel="LEVEL3"
          path={RESOURCES_URL}
          {...props}
          isMobile={isMobile}
          isTablet={isTablet}
          Component={HelpfulStuff}
          navbar
          title="More helpful stuff for workers"
          search
        />
        <PrivateRoute
          minimumLevel="LEVEL1"
          path={CONTACT_URL}
          {...props}
          isMobile={isMobile}
          isTablet={isTablet}
          Component={ShapeEarwig}
          navbar
          title="Shape earwig"
          search
        />

        <PrivateRoute
          minimumLevel="LEVEL1"
          path={PRIVACY_URL}
          {...props}
          isMobile={isMobile}
          isTablet={isTablet}
          Component={PrivacyAndTerms}
          navbar
          title="Shape earwig"
          search
        />

        <PrivateRoute
          minimumLevel="LEVEL0"
          path={INTRO_URL}
          {...props}
          isMobile={isMobile}
          isTablet={isTablet}
          Component={Intro}
        />

        <Route
          exact
          path={SIGNUP_URL}
          render={linkProps =>
            !isLoggedIn ? (
              <Signup
                {...props}
                {...linkProps}
                handleChangeState={handleChangeState}
              />
            ) : (
              <Redirect to={isAdmin ? ADMIN : SEARCH_URL} />
            )
          }
        />

        <Route
          exact
          path={LOGIN_URL}
          render={linkProps =>
            !isLoggedIn ? (
              <Login
                {...props}
                {...linkProps}
                handleChangeState={handleChangeState}
              />
            ) : (
              <Redirect to={isAdmin ? ADMIN : SEARCH_URL} />
            )
          }
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
