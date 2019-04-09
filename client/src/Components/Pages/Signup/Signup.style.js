import { Link } from "react-router-dom";
import styled from "styled-components";

import { colors } from "../../../theme";

export const SignupWrapper = styled.div.attrs({ className: "login" })`
  max-width: 60rem;
  margin: 0 auto;
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
  font-size: 2rem;
  color: ${colors.profileFontColor};
  font-weight: 900;

  &:hover,
  &:active {
    text-decoration: none;
    color: ${colors.profileFontColor};
  }
`;

export const Devider = styled.div`
  position: relative;
  height: 5rem;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 3rem;

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
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  border: 1px solid ${colors.inputBorder};
  z-index: 2;
  background-color: white;
  font-size: 2rem;
  color: ${colors.lightGray};
  line-height: 5rem;
  font-weight: 900;
`;
