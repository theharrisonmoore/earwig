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
    dsn: "https://1f427f5f106c4253abb2bf6140aa5691@sentry.io/1485403"
  });

  // set up logrocket
  LogRocket.init("5aud6s/earwig");
  setupLogRocketReact(LogRocket);

  mixpanel.init("6e556a55e4e9c20a0ecbc15e28fc00d8");
  // set up analytics
  ReactGA.initialize("UA-141501764-1");
  ReactGA.pageview(window.location.pathname + window.location.search);
}

ReactDOM.render(
  <ErrorBoundry>
    <App />
  </ErrorBoundry>,
  document.getElementById("root")
);
