import styled from "styled-components";

import { colors, shadows } from "./../../../theme";
import { MOBILE_WIDTH } from "./../../../constants/screenWidths";

export const IntroWrapper = styled.div.attrs({ className: "login" })`
  width: 100%;
  max-width: 60rem;
  margin: 0 auto;
  padding: 1rem 1rem;
  padding-top: 3rem;

  & .paragraph {
    color: red;
    display: block;
    color: ${colors.profileFontColor};
    font-size: 1.25rem;
  }
`;

export const Iframe = styled.iframe`
  width: 100%;
  height: 85vw;
  margin-top: 15vw;
  max-height: 35rem;
  max-width: 45rem;
  box-shadow: ${shadows.frameShadow};
`;

export const Button = styled.button`
  background: ${colors.white};
  border: 1px solid ${props => (props.error ? colors.red : colors.mineShaft2)};
  box-shadow: ${shadows.buttonShadow};
  border-radius: 3px;
  width: 100%;

  font-weight: 900;
  font-size: 1rem;
  color: ${colors.profileFontColor};
  outline: none;
  display: block;
  padding: 0.75rem 0;
  cursor: pointer;
  margin: 1rem 0 2rem auto;
  max-width: 7rem;

  &:active,
  &:focus {
    outline: none;
  }
  @media (min-width: ${MOBILE_WIDTH}px) {
    max-width: 14rem;
  }
`;

export const VideoContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 45rem;
`;
