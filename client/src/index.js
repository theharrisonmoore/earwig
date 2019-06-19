import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/browser";

import "./index.css";
import App from "./App";

Sentry.init({
  dsn: "https://1f427f5f106c4253abb2bf6140aa5691@sentry.io/1485403"
});

ReactDOM.render(<App />, document.getElementById("root"));
