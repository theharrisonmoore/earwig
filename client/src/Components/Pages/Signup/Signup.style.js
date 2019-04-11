import { Link } from "react-router-dom";
import styled from "styled-components";

import { colors } from "../../../Components/theme";

export const SignupWrapper = styled.div.attrs({ className: "login" })`
  width: 100%;
  max-width: 60rem;
  margin: 1.5rem auto;
  padding: 0 1.5rem;
  padding-top: 3rem;

  & .paragraph {
    display: block;
    color: ${colors.profileFontColor};
    font-size: 1.8rem;
  }
`;

export const StyledLink = styled(Link).attrs({})`
  display: block;
  text-decoration: none;
  margin-bottom: 3rem;
  font-size: 1.125rem;
  color: ${colors.profileFontColor};
  font-weight: 900;

  &:hover,
  &:active {
    text-decoration: none;
    color: ${colors.profileFontColor};
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
