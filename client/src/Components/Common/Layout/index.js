import React from "react";
import Center from "./Center";
import Side from "./Side";

// type = center | side
// for type = side => position = right | left
export default ({ type, position, ...rest }) => {
  const Component = type === "center" ? Center : Side;
  return <Component position={position} {...rest} />;
};
