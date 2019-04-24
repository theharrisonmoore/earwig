import React, { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import { authorization } from "./../../../helpers";
import Navbar from "./../Navbar";

const PrivateRoute = ({
  isMounted,
  Component,
  path,
  exact,
  navbar,
  ...rest
}) => {
  const isAuthorized = authorization({ ...rest });

  return isMounted ? (
    <Route
      path={path}
      {...rest}
      render={LinkProps =>
        isAuthorized ? (
          <>
            {navbar && <Navbar {...LinkProps} {...rest} />}
            <Component {...LinkProps} {...rest} />
          </>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  ) : (
    <h1>spin</h1>
  );
};

export default PrivateRoute;
