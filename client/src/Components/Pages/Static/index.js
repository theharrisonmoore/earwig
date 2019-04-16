import React from "react";

import FAQ from "./FAQ";
import HelpfulStuff from "./HelpfulStuff";
import ShapeEarwig from "./ShapeEarwig";
import PrivacyAndTerms from "./PrivacyAndTerms";
import { Route, Switch } from "react-router-dom";
import Navbar from "./../../Common/Navbar";

export default function(props) {
  const { isMobile, isLoggedIn } = props;

  return (
    <Switch>
      <Route
        exact
        path={"/faq"}
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
        path={"/helpful-stuff"}
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
        path={"/shape-earwig"}
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
        path="/privacy-and-terms"
        render={Routerprops => (
          <>
            <Navbar
              {...props}
              title="Privacy & terms"
              isMobile={isMobile}
              search
              isLoggedIn={isLoggedIn}
            />
            <ShapeEarwig {...Routerprops} {...props} />
          </>
        )}
      />
    </Switch>
  );
}
