import React from "react";

import FAQ from "./FAQ";
import HelpfulStuff from "./HelpfulStuff";
import ShapeEarwig from "./ShapeEarwig";
import PrivacyAndTerms from "./PrivacyAndTerms";
import { Route, Switch } from "react-router-dom";
import Navbar from "./../../Common/Navbar";

import {
  RESOURCES_URL,
  CONTACT_URL,
  FAQ_URL,
  PRIVACY_URL
} from "./../../../constants/naviagationUrls";

export default function(props) {
  const { isMobile, isLoggedIn } = props;

  return (
    <Switch>
      <Route
        exact
        path={FAQ_URL}
        render={Routerprops => (
          <>
            <Navbar
              {...props}
              title="FAQ & explainer videos"
              isMobile={isMobile}
              search
              isLoggedIn={isLoggedIn}
            />
            <FAQ {...Routerprops} {...props} />
          </>
        )}
      />
      <Route
        exact
        path={RESOURCES_URL}
        render={Routerprops => (
          <>
            <Navbar
              {...props}
              title="More helpful stuff for workers"
              isMobile={isMobile}
              search
              isLoggedIn={isLoggedIn}
            />
            <HelpfulStuff {...Routerprops} {...props} />
          </>
        )}
      />
      <Route
        exact
        path={CONTACT_URL}
        render={Routerprops => (
          <>
            <Navbar
              {...props}
              title="Shape earwig"
              isMobile={isMobile}
              search
              isLoggedIn={isLoggedIn}
            />
            <ShapeEarwig {...Routerprops} {...props} />
          </>
        )}
      />
      <Route
        exact
        path={PRIVACY_URL}
        render={Routerprops => (
          <>
            <Navbar
              {...props}
              title="Privacy & terms"
              isMobile={isMobile}
              search
              isLoggedIn={isLoggedIn}
            />
            <PrivacyAndTerms {...Routerprops} {...props} />
          </>
        )}
      />
    </Switch>
  );
}
