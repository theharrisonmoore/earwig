import styled from "styled-components";
import { Link } from "react-router-dom";

import {
  colors,
  shadows,
  borders,
  organizations,
  breakpoints,
} from "../../../theme";

export const Wrapper = styled.div`
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  min-height: 100vh;

  @media ${breakpoints.laptop} {
    margin: 0 16rem;
    border-left: 2px solid ${colors.profileFontColor};
    border-right: 2px solid ${colors.profileFontColor};
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5rem 2rem 2rem 2rem;
  color: ${colors.profileFontColor};
  box-shadow: ${shadows.headerShadow};
  margin-bottom: 2rem;

  @media ${breakpoints.laptop} {
    margin-bottom: 3rem;
    padding: 7rem 6rem 3rem 6rem;
  }
`;

export const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  align-items: center;
`;

export const BottomSection = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const StatWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const StatTitle = styled.p`
  margin-top: ${props => (props.isSMobile ? "20px" : "0px")};
  margin: 0;
  color: ${colors.veryLightGray};
`;

export const Stat = styled.p`
  margin: 0;
  color: ${colors.lightGray};
  font-size: 1.125rem;
  font-weight: 700;
  padding-left: 4px;
`;

export const IDWrapper = styled.div`
  display: flex;
`;

export const UsernameStatusDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Verified = styled.div`
  font-weight: 500;
  font-size: 1.125rem;
  margin: -1rem auto 0 0.25rem;
`;

export const IDText = styled.p`
  font-size: 1.125rem;
  margin-right: auto;
  margin-top: -0.2rem;
  margin-left: 0.25rem;
  font-weight: bold;
  color: ${colors.lightGray};
`;

export const EditInfo = styled.button`
  cursor: pointer;
  outline: none;
  border: ${borders.searchBox};
  box-shadow: ${shadows.buttonShadow2};
  color: ${colors.profileFontColor};
  background: none;
  margin: 0;
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
  padding: 0.5rem;
  font-weight: 900;

  &:active,
  &:focus,
  &:hover {
    outline: none;
    text-decoration: none;
  }
`;

export const MainSection = styled.div`
  padding: 0 2rem 0 2rem;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${breakpoints.laptop} {
    margin-bottom: 3rem;
    padding: 0 6rem;
  }
`;

export const VerifiedSection = styled(MainSection)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const SectionTitle = styled.h1`
  font-weight: normal;
  font-size: ${({ verified }) => (verified ? "1.125rem" : "2.125rem")};
  color: ${colors.profileFontColor};
  margin-top: 0;
  /* display: inline-block; */
  /* width: 100%; */
  text-align: left;
`;

export const Paragraph = styled.p`
  font-weight: 500;
  font-size: 1rem;
  color: ${colors.gray};
  margin-top: 1rem;
  margin-bottom: 2rem;
`;

export const UnVerifiedButton = styled(Link)`
  border-radius: 300px;
  padding: 0.5rem 0.75rem;
  background-color: ${colors.white};
  font-size: 1.25rem;
  border: 1px solid ${colors.black};
  box-shadow: ${shadows.buttonShadow};
  outline: none;
  font-weight: 900;
  text-transform: capitalize;
  margin-bottom: 1.25rem;
  color: ${colors.profileFontColor};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 20rem;
  transition: all ease 0.2s;

  &:active,
  &:focus,
  &:hover {
    outline: none;
    text-decoration: none;
    color: ${colors.heliotrope};
  }
`;

export const Title = styled.h2`
  font-weight: 900;
  font-size: 1.125rem;
  color: ${colors.profileFontColor};
  margin: 0;
  transition: all ease 0.2s;

  &:active,
  &:focus,
  &:hover {
    outline: none;
    text-decoration: none;
    color: ${colors.heliotrope};
  }
`;

export const ReviewDiv = styled.div`
  display: flex;
  color: ${colors.lightGray};
  padding: 1rem 0 1rem 0;
  align-items: center;
  align-self: flex-start;
`;

export const AgencyTitle = styled.span`
  color: ${props => organizations[props.type].primary};
  font-weight: 900;
`;

export const ReviewText = styled.p`
  margin: 0;
  margin-right: 0.5rem;
  font-size: 0.875rem;
`;

export const BorderedWrapper = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  padding: 5rem 0;
  border: none;
  min-height: calc(100vh - 5.5rem);
  position: relative;

  & > div {
    max-width: 400px;
    margin: 0 auto;
    width: 80%;
  }

  @media ${breakpoints.tablet} {
    border-left: 3px solid ${colors.heliotrope};
    border-right: 3px solid ${colors.heliotrope};
  }
`;

export const MiniHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  height: 5rem;
  align-items: center;
  position: absolute;
  left: 0;
  top: 3rem;
  padding-right: 2rem;
  font-weight: 500;

  @media ${breakpoints.tablet} {
    top: 4rem;
  }

  a {
    color: ${colors.primary};
  }
`;

export const VerifyTitle = styled.h1`
  font-size: 2.125rem;
  font-weight: 500;
  color: ${colors.profileFontColor};
  margin-bottom: 2rem;
  text-align: left;
`;

export const VerifyParagraph = styled.p`
  text-align: left;
`;

export const VerifySection = styled.div`
  padding-top: 5rem;
`;

// subsection styles (user reviews and user points)

export const BorderedSubSectionWrapper = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: ${({ padding }) => padding || "3rem 0"};
  border: none;

  & > div {
    max-width: 500px;
    margin: 0 auto;
    width: 90%;
  }

  // @media ${breakpoints.tablet} {
  //   border-left: 3px solid ${colors.heliotrope};
  //   border-right: 3px solid ${colors.heliotrope};
  // }
`;

export const SubSectionTitleParagraph = styled.p`
  margin: 0 auto;
  margin-top: ${({ marginTop }) => marginTop || "2rem"};
  padding-bottom: 2rem;
  border-bottom: 1px solid ${colors.veryLightGray};
  width: 90%;
  text-align: center;
  color: ${colors.lightGray};

  @media ${breakpoints.tablet} {
    margin-top: 3.5rem;
  }
`;
