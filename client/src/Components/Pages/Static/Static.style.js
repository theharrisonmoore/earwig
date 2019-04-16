import styled from "styled-components";
import { colors, shadows } from "./../../../theme";
import { MOBILE_WIDTH } from "./../../../constants/screenWidths";

export const Wrapper = styled.div`
  width: 100%;
  max-width: 60rem;
  margin: 0 auto 1rem;
  padding: 0 1rem;
  padding-top: 2rem;
`;

export const ContentWrapper = styled.div`
  width: calc(85% + 2rem);
  margin: 5rem auto;
  margin-bottom: 3rem;
`;

export const MainIcon = styled.img`
  min-width: 40px;
  max-width: 60px;
  width: 10%;
  margin-bottom: 0.5rem;
`;

export const PageTitle = styled.h1`
  font-weight: 500;
  font-size: 42px;
  text-align: center;

  color: #4a4a4a;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const SubTitle = styled.h4`
  font-weight: 900;
  font-size: 18px;

  color: #4a4a4a;
  text-align: left;
  margin-bottom: 0;
  margin-top: ${props => (props.list ? "0" : "1.5rem")};
  @media (min-width: 768px) {
    font-size: 24px;
  }
`;

export const SmallParagraph = styled.p`
  font-size: 16px;

  color: #4a4a4a;
  text-align: left;
  @media (min-width: 768px) {
    font-size: 18px;
  }
`;

export const Iframe = styled.iframe`
  width: 100%;
  height: 85vw;
  max-height: 35rem;
  box-shadow: ${shadows.frameShadow};
`;

export const LargeParagraph = styled.p`
  font-size: 24px;
  color: #4a4a4a;
  text-align: center;
  margin-top: 3rem;
`;

export const TextArea = styled.textarea`
  width: 100%;
  max-width: 40rem;
  height: 10rem;
  border: 1px solid #979797;
  border-radius: 5px;
  outline: none;
  padding: 1rem;
  box-shadow: ${shadows.buttonShadow};
`;

export const Button = styled.button`
  position: relative;
  background: ${colors.white};
  border: 1px solid ${props => (props.error ? colors.red : colors.mineShaft2)};
  box-shadow: ${shadows.buttonShadow};
  border-radius: 3px;
  /* height: 3.25rem; */
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
  @media (min-width: 768px) {
    max-width: 14rem;
  }
`;

export const Devider = styled.div`
  width: 100%;
  height: 1px;
  border-bottom: 1px solid #d8d8d8;
  margin: 5rem auto;

  @media (max-width: ${MOBILE_WIDTH}) {
    display: none;
  }
`;
