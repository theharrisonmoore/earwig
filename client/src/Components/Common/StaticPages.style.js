import styled from "styled-components";
import { Link } from "react-router-dom";

import { colors, shadows, breakpoints } from "./../../theme";
import { MOBILE_WIDTH } from "./../../constants/screenWidths";

export const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  display: flex;
`;

export const ContentWrapper = styled.div`
  padding: 2rem;
  margin-bottom: 3rem;
  width: 100%;

  @media ${breakpoints.tablet} {
    width: ${({ width }) => width || "100%"};
  }

  .table {
    table {
      font-family: arial, sans-serif;
      border-collapse: collapse;
      width: 100%;
      font-size: 14px;
    }

    td,
    th {
      border: 1px solid #dddddd;
      text-align: left;
      padding: 8px;
      min-width: 70px;
    }

    tr:nth-child(even) {
      background-color: #dddddd2e;
    }
    th {
      font-weight: 700;
    }
  }
`;

export const PurpleDiv = styled.div`
  width: 0%;
  background-color: ${colors.heliotrope};

  @media ${breakpoints.tablet} {
    width: ${({ width }) => width || "50%"};
  }
`;

export const BlueDiv = styled.div`
  width: 0%;
  background-color: ${colors.dodgerBlue};

  @media ${breakpoints.tablet} {
    width: ${({ width }) => width || "50%"};
  }
`;

export const MainIcon = styled.img`
  min-width: 2.5rem;
  max-width: 3.75rem;
  width: 10%;
  text-align: center;
  margin: 0 auto 0.5rem;
  display: block;
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
  text-decoration: underline;

  @media (min-width: ${MOBILE_WIDTH}px) {
    font-size: 1.125rem;
  }
`;

export const Iframe = styled.iframe`
  width: 100%;
  height: 49vw;
  max-height: 35rem;
  box-shadow: ${shadows.frameShadow};
  max-width: 480px;

  @media ${breakpoints.tablet} {
    height: 27vw;
  }
`;

export const LargeParagraph = styled.p`
  font-size: 1.5rem;
  color: ${colors.profileFontColor};
  text-align: ${({ left }) => (left ? "left" : "center")};
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
  color: ${colors.white};
  border: none;
  box-shadow: ${shadows.buttonShadow};
  border-radius: 3px;
  width: 100%;

  font-weight: 900;
  font-size: 1.125rem;
  background-color: ${colors.heliotrope};
  outline: none;
  display: block;
  padding: 0.75rem 0;
  cursor: pointer;
  margin: 2rem auto;

  &:active {
    box-shadow: none;
  }

  &:active,
  &:focus {
    outline: none;
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

export const LargeLink = styled(Link)`
  font-family: Roboto;
  font-weight: 900;
  font-size: 18px;
  color: ${({ purpleLinks }) => (purpleLinks ? colors.purpleLinks : "#4a4a4a")};
  text-decoration: underline;
  text-align: left;
  font-size: 1.125rem;
  display: block;
  margin-bottom: 20px;

  &:hover {
    text-decoration: underline;
    color: ${colors.purpleLinks};
  }

  @media ${breakpoints.tablet} {
    font-size: 1.5rem;
  }
`;

export const Ol = styled.ol`
  list-style-type: none;
  counter-reset: item;
  margin: 0;
  padding: 0;
  color: ${colors.profileFontColor};
  font-size: 16px;
  line-height: 36px;
  margin-bottom: 20px;
  font-weight: normal;

  @media (max-width: ${MOBILE_WIDTH}px) {
    font-size: 14px;
    line-height: 30px;
  }

  & > li {
    display: table;
    counter-increment: item;
    margin-bottom: 0.6em;
  }

  & > li:before {
    display: table-cell;
    padding-right: 0.3em;
    ${({ showFirstNumber }) =>
      showFirstNumber && `content: counters(item, ".") ". ";`}
  }
`;

export const Li = styled.li`
  font-weight: normal;

  ol > li {
    margin: 0;
  }

  ol > li:before {
    content: counters(item, ".") " ";
  }
`;

export const SmallTitle = styled.h4`
  font-weight: 900;
  font-size: 1.125rem;
  color: ${colors.profileFontColor};
  text-align: center;

  @media (min-width: ${MOBILE_WIDTH}px) {
    font-size: 1.5rem;
    padding-top: 1rem;
  }
`;

export const SelectWrapper = styled.div`
  width: 100%;
  .ant-select-lg .ant-select-selection--single {
    height: 48px;
  }
  .ant-select-lg .ant-select-selection__rendered {
    line-height: 48px;
  }
`;
