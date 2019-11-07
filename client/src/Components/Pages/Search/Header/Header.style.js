import styled from "styled-components";

import { organizations } from "../../../../theme";

export const HeaderWrapper = styled.div`
  background-color: ${({ category }) => organizations[category].primary};
  width: 100%;
  height: 17rem;
`;
