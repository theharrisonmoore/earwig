import { Link } from "react-router-dom";
import styled from "styled-components";

import { colors } from "../../../theme";

export const SignupWrapper = styled.div.attrs({ className: "login" })`
  width: 100%;
  max-width: 60rem;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  padding-top: 4rem;

  & .paragraph {
    display: block;
    color: ${colors.profileFontColor};
    font-size: 1.8rem;
  }
`;

export const StyledLink = styled(Link).attrs({})`
  display: block;
  text-decoration: underline;
  margin-bottom: 3rem;
  font-size: 1.125rem;
  color: ${colors.profileFontColor};
  font-weight: 900;

  &:hover,
  &:active {
    color: ${colors.profileFontColor};
    text-decoration: underline;
  }
`;

export const LinkSpan = styled(Link)`
  color: ${colors.purpleLinks};
  text-decoration: none;
  font-size: 1rem;
  font-weight: 700;

  &:hover,
  &:active {
    text-decoration: none;
    color: ${colors.profileFontColor};
  }
`;
