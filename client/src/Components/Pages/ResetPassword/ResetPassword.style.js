import styled from "styled-components";

import { colors } from "../../../theme";

export const Wrapper = styled.div`
  width: 100%;
  max-width: 30rem;
  margin: 0 auto;
  padding: 4rem 1rem;

  & .paragraph {
    color: red;
    display: block;
    color: ${colors.profileFontColor};
    font-size: 1.25rem;
  }
`;
