import styled from "styled-components";

import { colors, shadows } from "./../../../theme";
import { MOBILE_WIDTH, TABLET_WIDTH } from "./../../../constants/screenWidths";

export const IntroWrapper = styled.div.attrs({ className: "login" })`
  position: relative;
  width: 100%;
  margin: 0 auto;
  min-height: 100vh;

  & .paragraph {
    color: red;
    display: block;
    color: ${colors.profileFontColor};
    font-size: 1.25rem;
  }
`;

export const Iframe = styled.iframe`
  width: 100%;
  height: 300px;
  max-height: 22rem;
  max-width: 45rem;
  box-shadow: ${shadows.frameShadow};
`;

export const VideoContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 27rem;
  padding: 5vw 4%;

  @media (min-width: ${MOBILE_WIDTH}px) {
    padding: 11vw 0 5vw;
  }

  @media (min-width: ${TABLET_WIDTH}px) {
    padding: 9vw 0 0vw;
  }
`;

const ColourDiv = styled.div`
  position: absolute;

  @media (max-width: ${MOBILE_WIDTH}px) {
    display: none;
  }
`;

export const YellowDiv = styled(ColourDiv)`
  width: 29vw;
  height: 11vw;
  top: 0;
  right: 0;
  background: ${colors.webOrange};
`;

export const BlackDiv = styled(ColourDiv)`
  width: 16vw;
  height: 16vw;
  bottom: 0;
  right: 0;
  background: ${colors.gondola};
`;

export const PurpleDiv = styled(ColourDiv)`
  width: 16vw;
  height: 16vw;
  top: 0;
  left: 0;
  background: ${colors.heliotrope};
`;

export const BlueDiv = styled(ColourDiv)`
  width: 29vw;
  height: 11vw;
  bottom: 0;
  left: 0;
  background: ${colors.dodgerBlue};
`;

export const Title = styled.h1`
  font-size: 2.125rem;
  font-weight: 500;
  color: ${colors.profileFontColor};
  text-align: left;
`;

export const LogoWrapper = styled.span`
  display: none;
  margin: 0 auto 2rem;
  margin-bottom: 0;

  @media (max-width: ${MOBILE_WIDTH}px) {
    display: block;
  }
`;
