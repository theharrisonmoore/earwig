import React from "react";

import { Wrapper, SideContent } from "./Layout.style";

export default ({ children, position }) => {
  return (
    <Wrapper position={position}>
      <SideContent>{children}</SideContent>
    </Wrapper>
  );
};
