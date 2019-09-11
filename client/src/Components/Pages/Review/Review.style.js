import styled from "styled-components";
import { Link } from "react-router-dom";

import {
  colors,
  organizations,
  size,
  breakpoints,
  breakpointsMax
} from "../../../theme";

export const ReviewWrapper = styled.div`
  font-family: "Roboto", sans-serif;
  text-align: left;

  .review-body {
    max-width: 40rem;
    margin: 0 auto;
    padding-top: 8rem;

    h2 {
      color: ${colors.profileFontColor};
    }

    @media (max-width: ${size.mobileL}) {
      padding-top: 10rem;
    }

    @media (max-width: ${size.mobileS}) {
      padding-top: 11rem;
    }
  }
`;

/* phone styles */

export const DetailsDiv = styled.div`
  padding-top: 1rem;
  border-bottom: 1px solid;
`;

export const ImageBoxPhone = styled.div`
  margin-right: 1rem;
  position: relative;
  top: 3px;
`;

export const OrganizationPhone = styled.div`
  display: flex;
  width: 100%;
`;

/* desktop */

export const Header = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: ${props => organizations[props.orgType].primary};
  color: ${colors.white};
  font-size: 1.25rem;
  font-weight: 400;
  margin: 0;
  position: fixed;
  z-index: 100;

  @media (max-width: ${size.mobileL}) {
    font-size: 1rem;
  }
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.8rem;
  width: 100%;
  /* max-width: 80vw; */
  position: relative;

  /* @media ${breakpointsMax.mobileS} {
    padding: 0;
    font-size: 0.9rem;
  }

  @media ${breakpointsMax.mobileL} {
    max-width: 100vw;
    padding: 1rem;
  }

  @media ${breakpoints.laptop} {
    max-width: 60vw;
  }

  @media ${breakpoints.laptopL} {
    max-width: 45vw;
  }

  @media ${breakpoints.desktop} {
    max-width: 40vw;
  } */
`;

export const ImageBox = styled.div`
  margin-right: 1rem;
  position: relative;
  top: 3px;
`;

export const Image = styled.img`
  width: 3rem;
`;

export const Organization = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 auto;
  width: 80%;
  max-width: 34rem;

  div {
    display: flex;
    align-items: center;
  }
`;
export const StarRating = styled.div`
  display: flex;
  font-size: 2rem;
`;

export const Headline = styled.h1`
  margin-top: 1.5rem;
`;

export const Paragraph = styled.p`
  margin-bottom: 0;
  margin: 0 auto;
  margin-top: auto;
  font-size: 1rem;
  font-weight: 400;
  ${({ cancel }) => (cancel ? "cursor: pointer;" : "")}
  ${({ cancel }) => (cancel ? "line-height: 3;" : "")}
  ${({ cancel }) => (cancel ? "text-decoration: underline" : "")};
  ${({ cancel }) => (cancel ? "position: absolute" : "")};
  font-weight:${({ bold }) => (bold ? "700" : "normal")};
  text-transform:${({ capitalized }) => (capitalized ? "capitalize" : "none")};

 @media (max-width: ${size.mobileL}) {
  ${({ cancel }) => (cancel ? "margin-top: 0;" : "")}
  ${({ cancel }) => (cancel ? "line-height: 1.8;" : "")}
  ${({ cancel }) => (cancel ? "position: relative" : "")};
  }
`;

export const OrgName = styled.p`
  margin-bottom: 0;
  font-weight: 800;
  font-size: 1.1rem;
  color: ${colors.white};
  text-transform: capitalize;

  @media (max-width: ${size.mobileL}) {
    font-size: 1rem;
    font-weight: 600;
  }
`;

export const ReviewTimePhone = styled.p`
  margin-top: 0.5rem;
  position: relative;
  left: 3rem;
`;
export const ReviewTime = styled.p`
  margin-top: 0.5rem;
  font-size: 1rem;
`;

export const FormWrapper = styled.div`
  width: 85%;
  margin: 0 auto;

  @media ${breakpointsMax.mobileS} {
    margin-top: -10px;
  }

  @media ${breakpointsMax.mobileL} {
    margin-top: -50px;
  }
`;

export const UserAgreement = styled.div``;

export const Level2Header = styled.h2`
  border-bottom: 1px solid ${colors.lightGray};
  display: inline-block;
  color: ${colors.profileFontColor};
`;

export const AgreementLabel = styled.label`
  font-size: 14px;
  color: ${colors.profileFontColor};
  width: 90%;
`;

export const CheckboxWrapper = styled.div`
  justify-content: space-between;
  flex-wrap: wrap;
  .ant-checkbox-wrapper {
    display: flex;
  }

  .ant-checkbox {
    margin-top: 6px;
  }

  .ant-checkbox-wrapper + span,
  .ant-checkbox + span {
    margin-left: 10px;
  }
`;

export const SubmitButton = styled.button`
  background: ${props => organizations[props.orgType].primary};
  border: 1px solid ${colors.inputBorder};
  box-shadow: ${colors.buttonShadow};
  border-radius: 6px;
  font-weight: 900;
  font-size: 20px;
  color: white;
  padding: 1rem 3rem;
  display: block;
  margin: 2rem auto 3rem;
  height: auto;
`;

export const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const Button = styled.button`
  background: ${colors.white};
  color: ${props => props.color};
  border: solid 2px ${props => props.color};
  transition: all ease-in 0.1s;
  box-shadow: ${colors.buttonShadow};
  border-radius: 6px;
  font-weight: 900;
  font-size: 1rem;
  padding: 1rem 1rem;
  display: block;
  margin: 1rem auto 2rem;
  cursor: pointer;

  :hover {
    background: ${props => props.color};
    color: ${colors.white};
  }
`;

export const DelButton = styled.button`
  border: none;
  background: none;
  display: block;
  cursor: pointer;
`;

export const LinkSpan = styled(Link)`
  color: ${({ color }) => color};
  font-size: 1rem;
  font-weight: 700;
  text-decoration: underline;

  &:hover,
  &:active {
    color: ${colors.profileFontColor};
    text-decoration: underline;
  }
`;
