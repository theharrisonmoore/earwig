import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Spin } from "antd";

import { authorization } from "../../../helpers";
import Navbar from "../Navbar";
import { Wrapper, SpinWrapper } from "./PrivateRoute.style";

const PrivateRoute = ({
  isMounted,
  Component,
  path,
  exact,
  navbar,
  ...rest
}) => {
  const { isAuthorized, level } = authorization({ ...rest });

  return isMounted ? (
    <Wrapper>
      <Route
        path={path}
        {...rest}
        render={LinkProps =>
          isAuthorized ? (
            <>
              {navbar && <Navbar {...LinkProps} level={level} {...rest} />}
              <Component {...LinkProps} level={level} {...rest} />
            </>
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    </Wrapper>
  ) : (
    <SpinWrapper>
      <Spin size="large" />
    </SpinWrapper>
  );
};

export default PrivateRoute;
