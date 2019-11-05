import { Link } from "react-router-dom";
import styled from "styled-components";

import { colors } from "../../../theme";

export const LoginWrapper = styled.div.attrs({ className: "login" })`
  width: 100%;
  max-width: 30rem;
  margin: 0 auto;
  padding: 4rem 1rem;
  padding-bottom: 100px;

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

export const SmallLink = styled(StyledLink)`
  font-size: 1rem;
  text-align: right;
  font-weight: initial;
  margin-bottom: 0.25rem;
  color: ${colors.profileFontColor};
  text-decoration: underline;

  &:hover,
  &:active {
    color: ${colors.profileFontColor};
    text-decoration: underline;
  }
`;

export const Devider = styled.div`
  position: relative;
  height: 3.25rem;
  width: 80%;
  margin: 1rem auto;
  opacity: 0.25;

  :after {
    content: "";
    display: block;
    border-top: 1px solid ${colors.inputBorder};
    position: absolute;
    top: 50%;
    width: 100%;
  }
`;
