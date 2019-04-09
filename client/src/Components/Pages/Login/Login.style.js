import { Link } from "react-router-dom";
import styled from "styled-components";

import { colors } from "./../../../theme";

export const LoginWrapper = styled.div.attrs({ className: "login" })`
  width: 100%;
  max-width: 60rem;
  margin: 1rem auto;
  padding: 0 1rem;
  padding-top: 2rem;

  & .paragraph {
    color: red;
    display: block;
    color: ${colors.profileFontColor};
    font-size: 1.25rem;
  }
`;

export const StyledLink = styled(Link).attrs({})`
  display: block;
  text-decoration: none;
  font-size: 1.25rem;
  color: ${colors.purpleLinks};
  font-weight: 900;

  &:hover,
  &:active {
    text-decoration: none;
    color: ${colors.purpleLinks};
  }
`;

export const SmallLink = styled(StyledLink)`
  font-size: 1rem;
  text-align: right;
  font-weight: initial;
  margin-bottom: 0.25rem;
  color: ${colors.profileFontColor};

  &:hover,
  &:active {
    color: ${colors.profileFontColor};
  }
`;

export const Devider = styled.div`
  position: relative;
  height: 3.25rem;
  width: 80%;
  margin: 2rem auto;

  :after {
    content: "";
    display: block;
    border-top: 1px solid ${colors.inputBorder};
    position: absolute;
    top: 50%;
    width: 100%;
  }
`;

export const Circle = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  width: 3.25rem;
  height: 3.25rem;
  border-radius: 50%;
  border: 1px solid ${colors.inputBorder};
  z-index: 2;
  background-color: white;
  font-size: 1.25rem;
  color: ${colors.lightGray};
  line-height: 3.25rem;
  font-weight: 900;
`;
