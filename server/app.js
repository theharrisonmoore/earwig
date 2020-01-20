const boom = require("boom");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const Sentry = require("@sentry/node");
const compression = require("compression");
const Sqreen = require("sqreen");


const router = require("./router");
const dbConnection = require("./database/dbConnection");
const config = require("./config");
const { isProduction } = require("./helpers/checkEnv");

const app = express();
if (isProduction()) {
  Sentry.init({ dsn: config.thirdParty.sentry.dsn });
  // The request handler must be the first middleware on the app
  app.use(Sentry.Handlers.requestHandler());
}

app.use(compression());

// connect to DB
dbConnection();

app.use(Sqreen.middleware);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", router);

if (isProduction()) {
  // serve any static files
  app.use(express.static(path.join(__dirname, "..", "client", "build")));

  // Handle React routing, resturn all requests to React app
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
  });
}

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(boom.notFound("Not Found"));
});

if (isProduction()) {
  // this must be before any error handling middlewares
  app.use(Sentry.Handlers.errorHandler());
}


// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.log("err", err);
  // send the error object
  if (err.isBoom) {
    if (err.isServer) {
      res.status(500);
      return res.json({ error: "500 Internal server error" });
    }
    // for 400 errors
    res.status(err.output.statusCode);
    return res.json({ error: err.message });
  }
  // should terminate the sever and run it again
  res.status(500);
  return res.json({ error: "500 Internal server error" });
});

module.exports = app;
