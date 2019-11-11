import React from "react";

import { Wrapper, CenterContent } from "./Layout.style";

export default ({ children }) => {
  return (
    <Wrapper>
      <CenterContent>{children}</CenterContent>
    </Wrapper>
  );
};
