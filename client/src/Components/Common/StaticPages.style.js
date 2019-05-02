import styled from "styled-components";
import { Link } from "react-router-dom";

import { colors, shadows } from "./../../theme";
import { MOBILE_WIDTH } from "./../../constants/screenWidths";

export const Wrapper = styled.div`
  width: 100%;
  max-width: 44rem;
  margin: 0 auto;
  padding: 0 1rem;
  padding-top: 2rem;
  min-height: 100vh;
  position: relative;
`;

export const ContentWrapper = styled.div`
  width: calc(85% + 2rem);
  margin: 3rem auto;
  margin-bottom: 3rem;
`;

export const MainIcon = styled.img`
  min-width: 2.5rem;
  max-width: 3.75rem;
  width: 10%;
  margin-bottom: 0.5rem;
`;

export const PageTitle = styled.h1`
  font-weight: 500;
  font-size: 2.625rem;
  text-align: center;

  color: ${colors.profileFontColor};

  @media (max-width: ${MOBILE_WIDTH}px) {
    display: none;
  }
`;

export const SubTitle = styled.h4`
  font-weight: 900;
  font-size: 1.125rem;
  color: ${colors.profileFontColor};
  text-align: ${({ center }) => (center ? "center" : "left")};
  margin-bottom: ${({ marginBottom }) => (marginBottom ? "1.5rem" : "0")};
  margin-top: ${props => (props.list ? "0" : "1.5rem")};
  @media (min-width: ${MOBILE_WIDTH}px) {
    font-size: 1.5rem;
    padding-top: 3rem;
  }
`;

export const SmallParagraph = styled.p`
  font-size: 1rem;

  color: ${colors.profileFontColor};
  text-align: ${({ center }) => (center ? "center" : "left")};
  @media (min-width: ${MOBILE_WIDTH}px) {
    font-size: 1.125rem;
  }
`;

export const BoldLink = styled(Link)`
  font-size: 1rem;

  color: ${colors.profileFontColor};
  text-align: left;
  font-weight: 900;

  @media (min-width: ${MOBILE_WIDTH}px) {
    font-size: 1.125rem;
  }
`;

export const Iframe = styled.iframe`
  width: 100%;
  height: 85vw;
  max-height: 35rem;
  box-shadow: ${shadows.frameShadow};
`;

export const LargeParagraph = styled.p`
  font-size: 1.5rem;
  color: ${colors.profileFontColor};
  text-align: center;
  margin-top: 3rem;
  font-style: italic;
`;

export const TextArea = styled.textarea`
  width: 100%;
  max-width: 40rem;
  height: 8.5rem;
  border: 1px solid ${colors.inputBorder};
  border-radius: 5px;
  outline: none;
  padding: 1rem;
  box-shadow: ${shadows.buttonShadow};
`;

export const Button = styled.button`
  background: ${colors.white};
  border: 1px solid ${props => (props.error ? colors.red : colors.mineShaft2)};
  box-shadow: ${shadows.buttonShadow};
  border-radius: 3px;
  width: 100%;

  font-weight: 900;
  font-size: 1.125rem;
  color: ${colors.profileFontColor};
  outline: none;
  display: block;
  padding: 0.75rem 0;
  cursor: pointer;
  margin: 2rem auto;

  &:active,
  &:focus {
    outline: none;
  }
  @media (min-width: ${MOBILE_WIDTH}px) {
    max-width: 14rem;
  }
`;

export const Devider = styled.div`
  width: 100%;
  height: 1px;
  border-bottom: 1px solid ${colors.alto};
  margin: 5rem auto;

  @media (max-width: ${MOBILE_WIDTH}px) {
    display: none;
  }
`;

// /* position: absolute; */
export const BottomFixedDiv = styled.div`
  margin: 10vh auto 0rem;
`;

export const UnderlinedLink = styled(BoldLink).attrs({
  className: "UnderlinedLink"
})`
  text-decoration: underline;
  font-size: 1.125rem;
  text-align: center;
  margin: 0 auto;
  cursor: pointer;

  @media (max-height: 600px) {
    margin-top: -1rem;
    margin-bottom: 1rem;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  .UnderlinedLink {
    margin: 0 auto;
    @media (max-height: 600px) {
      margin: 0 auto;
    }
  }
`;

export const SmallButton = styled(Button)`
  width: 50%;
  margin: 0;
`;
