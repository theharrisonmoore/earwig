import React from "react";

import { Wrapper, SideContent } from "./Layout.style";

export default ({ children }) => {
  return (
    <Wrapper>
      <SideContent>{children}</SideContent>
    </Wrapper>
  );
};
