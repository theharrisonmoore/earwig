import styled from "styled-components";
import { Link } from "react-router-dom";

import { colors, organizations, size } from "../../../theme";

export const ReviewWrapper = styled.div`
  font-family: "Roboto", sans-serif;
  text-align: left;

  .review-body {
    max-width: 40rem;
    margin: 0 auto;
    padding-top: 10rem;

    h2 {
      color: ${colors.profileFontColor};
    }
  }
`;

/* phone styles */
export const HeaderPhone = styled.section`
  width: 100%;
  background-color: ${props => organizations[props.orgType].primary};
  color: ${colors.white};
  font-size: 1.25rem;
  font-weight: 400;
  padding: 0.5rem 2rem;
  padding-left: 3rem;
  overflow: hidden;
  position: fixed;
  z-index: 100;
  max-height: 6.5rem;

  @media (max-width: ${size.mobileL}) {
    font-size: 1rem;
    padding-left: 3rem;
  }

  @media (min-width: ${size.tablet}) {
    display: none;
    text-align: center;
  }
`;

export const DetailsDiv = styled.div`
  padding-top: 1rem;
  border-bottom: 1px solid;
`;

export const ContentPhone = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ImageBoxPhone = styled.div`
  margin-right: 1rem;
  position: relative;
  top: 3px;
`;

export const OrganizationPhone = styled.div`
  display: flex;
`;

/* desktop */

export const Header = styled.section`
  width: 100%;
  background-color: ${props => organizations[props.orgType].primary};
  color: ${colors.white};
  font-size: 1.25rem;
  font-weight: 400;
  padding: 1rem 2rem 0;
  padding-left: 3rem;
  overflow: hidden;
  position: fixed;
  z-index: 100;

  @media (max-width: ${size.mobileL}) {
    font-size: 1rem;
    padding-left: 3rem;
  }

  @media (max-width: ${size.tablet}) {
    display: none;
    text-align: center;
  }
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
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
  font-size: 14px;
  font-weight: 400;

  @media (min-width: ${size.tablet}) {
    font-size: 16px;
  }
`;

export const OrgName = styled.h2`
  margin-bottom: 0;
  font-weight: 900;
  font-size: 1.375rem;
  color: ${colors.white};

  @media (max-width: ${size.mobileL}) {
    font-size: 1.1rem;
    font-weight: 700;
  }
  @media (max-width: ${size.mobileS}) {
    font-size: 0.8rem;
    font-weight: 500;
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
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
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
  color: ${colors.purpleLinks};
  font-size: 1rem;
  font-weight: 700;
  text-decoration: underline;

  &:hover,
  &:active {
    color: ${colors.profileFontColor};
    text-decoration: underline;
  }
`;
