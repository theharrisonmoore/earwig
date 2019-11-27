import React from "react";

import { Wrapper, CenterContent } from "./Layout.style";

export default ({ children, maxWidth }) => {
  return (
    <Wrapper>
      <CenterContent maxWidth={maxWidth}>{children}</CenterContent>
    </Wrapper>
  );
};
