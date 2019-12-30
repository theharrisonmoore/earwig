import React from "react";
import { Link } from "react-router-dom";

import Icon from "./Icon/Icon";

import { colors } from "../../theme";

export default ({ left, to, ...rest }) => {
  return (
    <Link
      style={{
        [left ? "left" : "right"]: 0,
        width: "10%",
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
      }}
      // TODO : use path query string
      to={to}
      {...rest}
    >
      <Icon icon="flag" fill={colors.gray} width="27" height="27" />
    </Link>
  );
};
