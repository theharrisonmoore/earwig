import React from "react";

import { Heading } from "./Header.style";

export default ({ title, ...rest }) => {
  return <Heading {...rest}>{title}</Heading>;
};
