import { Link } from "react-router-dom";
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

export const StyledLink = styled(Link).attrs({})`
  display: block;
  font-size: 1.25rem;
  color: ${colors.purpleLinks};
  font-weight: 900;
  text-decoration: underline;

  &:hover,
  &:active {
    color: ${colors.purpleLinks};
    text-decoration: underline;
  }
`;
