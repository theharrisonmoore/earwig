import "react-app-polyfill/ie9";
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/browser";
import mixpanel from "mixpanel-browser";
import setupLogRocketReact from "logrocket-react";
import ReactGA from "react-ga";
import LogRocket from "logrocket";

import "./index.css";
import App from "./App";
import ErrorBoundry from "./Components/Common/ErrorBoundry";

// third party apps
if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: "https://2b089a5f39714cd3bc694a5b2484302b@sentry.io/1524934",
  });

  // set up logrocket
  LogRocket.init("5aud6s/earwig");
  setupLogRocketReact(LogRocket);

  // set up analytics
  ReactGA.initialize("UA-141501764-1");
  ReactGA.pageview(window.location.pathname + window.location.search);
}
mixpanel.init("6e556a55e4e9c20a0ecbc15e28fc00d8");

ReactDOM.render(
  process.env.NODE_ENV === "production" ? (
    <ErrorBoundry>
      <App />
    </ErrorBoundry>
  ) : (
    <App />
  ),
  document.getElementById("root")
);
