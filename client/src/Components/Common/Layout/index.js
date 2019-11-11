import React from "react";
import Center from "./Center";
import Side from "./Side";

export default ({ type, ...rest }) => {
  const Component = type === "center" ? Center : Side;
  return <Component {...rest} />;
};
