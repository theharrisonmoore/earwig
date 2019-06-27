import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import {
  SIGNUP_URL,
  LOGIN_URL,
  THANKYOU_URL,
  EDIT_PROFILE_URL,
  UPLOAD_VERIFICATION_URL,
  ORGS_PROFILE_URL,
  REPORT_CONTENT_URL,
  DELETE_PROFILE_URL,
  COMMUNITY_GUIDELINES_URL,
  TERMS_OF_USE_URL,
  COOKIES_POLICY_URL
} from "./../constants/naviagationUrls";

import Landing from "./Pages/Landing";
import ReportContent from "./Pages/ReportContent";
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
import Reply from "./Pages/Profile/Reply";

import Test from "./Pages/Review/test";

import {
  FAQ,
  HelpfulStuff,
  ShapeEarwig,
  PrivacyAndTerms,
  CommunityGuidlines,
  TermsOfUse,
  CookiesPolicy,
  PrivacyPolicy
} from "./Pages/Static";

import {
  RESOURCES_URL,
  CONTACT_URL,
  FAQ_URL,
  PRIVACY_AND_TERMS_URL,
  SEARCH_URL,
  ADD_PROFILE_URL,
  ADD_PROFILE_START_REVIEW_URL,
  ADMIN,
  REVIEW_URL,
  QUICK_REVIEW_URL,
  CONFIRM_EMAIL_URL,
  INTRO_URL,
  USER_PROFILE_URL,
  REPLY_URL,
  PRIVACY_URL
} from "./../constants/naviagationUrls";

export default function index(props) {
  const { handleChangeState, isMobile, isTablet, isLoggedIn, isAdmin } = props;

  return (
    <>
      <Switch>
        <Route path="/test" component={Test} />
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
          navbar
          search={!isMobile}
        />
        <PrivateRoute
          exact
          minimumLevel="LEVEL1"
          path={UPLOAD_VERIFICATION_URL}
          {...props}
          Component={UploadImage}
        />

        <PrivateRoute
          exact
          minimumLevel="LEVEL0"
          path={ORGS_PROFILE_URL}
          isTablet={isTablet}
          isMobile={isMobile}
          {...props}
          Component={Profile}
          navbar
          search={!isMobile}
        />
        <PrivateRoute
          minimumLevel="ADMIN"
          path={ADMIN}
          {...props}
          Component={Admin}
        />

        <PrivateRoute
          exact
          minimumLevel="LEVEL0"
          path={SEARCH_URL}
          {...props}
          isMobile={isMobile}
          isTablet={isTablet}
          Component={Search}
          navbar
          title="Search"
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
          minimumLevel="LEVEL3"
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
          search={!isMobile}
        />

        <PrivateRoute
          minimumLevel="LEVEL0"
          path={RESOURCES_URL}
          {...props}
          isMobile={isMobile}
          isTablet={isTablet}
          Component={HelpfulStuff}
          navbar
          title="Helpful stuff"
          search={!isMobile}
        />

        <PrivateRoute
          minimumLevel="LEVEL0"
          path={CONTACT_URL}
          {...props}
          isMobile={isMobile}
          isTablet={isTablet}
          Component={ShapeEarwig}
          navbar
          title="Shape earwig"
          search={!isMobile}
        />

        <PrivateRoute
          minimumLevel="LEVEL0"
          path={PRIVACY_AND_TERMS_URL}
          {...props}
          isMobile={isMobile}
          isTablet={isTablet}
          Component={PrivacyAndTerms}
          navbar
          title="Privacy & terms"
          search={!isMobile}
        />

        <PrivateRoute
          minimumLevel="LEVEL0"
          path={PRIVACY_URL}
          {...props}
          isMobile={isMobile}
          isTablet={isTablet}
          Component={PrivacyPolicy}
          navbar
          title="Privacy Policy"
          search={!isMobile}
        />

        <PrivateRoute
          minimumLevel="LEVEL0"
          path={COMMUNITY_GUIDELINES_URL}
          {...props}
          isMobile={isMobile}
          isTablet={isTablet}
          Component={CommunityGuidlines}
          navbar
          title="Community Guidlines"
          search={!isMobile}
        />

        <PrivateRoute
          minimumLevel="LEVEL0"
          path={TERMS_OF_USE_URL}
          {...props}
          isMobile={isMobile}
          isTablet={isTablet}
          Component={TermsOfUse}
          navbar
          title="Terms Of Use"
          search={!isMobile}
        />

        <PrivateRoute
          minimumLevel="LEVEL0"
          path={COOKIES_POLICY_URL}
          {...props}
          isMobile={isMobile}
          isTablet={isTablet}
          Component={CookiesPolicy}
          navbar
          title="Privacy Policy"
          search={!isMobile}
        />

        <PrivateRoute
          minimumLevel="LEVEL1"
          path={REPORT_CONTENT_URL}
          {...props}
          isMobile={isMobile}
          isTablet={isTablet}
          Component={ReportContent}
          navbar
          title="Report this content"
          search={!isMobile}
        />
        <PrivateRoute
          minimumLevel="LEVEL1"
          path={REPLY_URL}
          {...props}
          isMobile={isMobile}
          isTablet={isTablet}
          Component={Reply}
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
          path="/"
          render={linkProps =>
            !isLoggedIn ? (
              <Landing
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
