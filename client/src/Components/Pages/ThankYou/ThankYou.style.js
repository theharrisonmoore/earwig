import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { EmailShareButton, WhatsappShareButton } from "react-share";

import { colors, organizations } from "./../../../theme";

export const EmailShare = styled(EmailShareButton)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  background-color: ${({ category }) => organizations[category].primary};
  width: 80px;
  height: 55px;
  border-radius: 6px;
  color: ${colors.white};
  font-weight: 700;
  margin: 1rem auto;
  :hover,
  :active,
  :focus {
    opacity: 0.8;
  }
`;

export const WhatsappShare = styled(WhatsappShareButton)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  background-color: ${({ category }) => organizations[category].primary};
  width: 80px;
  height: 55px;
  border-radius: 6px;
  color: ${colors.white};
  font-weight: 700;
  margin: 1rem auto;
  :hover,
  :active,
  :focus {
    opacity: 0.8;
  }
`;

export const FbShare = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
  flex-direction: column;
  align-items: center;
  height: 55px;
  width: 80px;
  border-radius: 6px;
  background-color: ${({ category }) => organizations[category].primary};
  color: ${colors.white};
  font-weight: 700;
  margin: 1rem auto;

  :hover,
  :active,
  :focus {
    opacity: 0.8;
  }
`;

export const ThankYouWrapper = styled.div`
  width: 100%;
  max-width: 40rem;
  margin: 0 auto;
  padding: 0 1rem;
  padding-top: 6rem;
`;

export const ContentWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  padding-bottom: 3rem;
`;

export const Image = styled.img`
  display: block;
  margin: 0 auto;
  width: 5rem;
  height: 5rem;
`;

export const Heading = styled.h1`
  color: ${colors.profileFontColor};
  font-size: 1.75rem;
  margin-top: 2rem;
`;

export const BoldPargraph = styled.p`
  color: ${colors.profileFontColor};
  font-size: 1.125rem;
  margin-top: 1rem;
`;

export const SubHeading = styled.h2`
  color: ${colors.profileFontColor};
  font-size: 1.125rem;
  margin-top: 2rem;
  text-align: left;
`;

export const List = styled.ul`
  opacity: 0.8;
  color: ${colors.profileFontColor};
  font-size: 1.125rem;
  font-weight: 700;

  & li {
    text-align: left;
    text-indent: -5px;
    list-style-type: none;
    padding-left: 0.75rem;
  }

  & li:before {
    content: "-";
    text-indent: 0.25rem;
    margin-right: 0.75rem;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 2rem auto 0.5rem;
  flex-wrap: wrap;
`;

export const Icon = styled.i`
  font-size: 2rem;
  cursor: pointer;

  &:hover {
    color: #${props => props.color};
  }
`;

export const SharePromo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  /* height: 3.5rem; */
  border-radius: 6px;
  color: ${colors.profileFontColor};
  /* background-color: ${props => organizations[props.orgType].primary}; */
  /* margin-bottom: 2.5rem; */
  font-size: 1.25rem;
  font-weight: 700;
  margin: 1.5rem auto
`;

export const StyledLink = styled(({ orgType, ...rest }) => <Link {...rest} />)`
  &,
  &:link,
  &:hover {
    font-family: Roboto;
    font-style: normal;
    font-weight: 900;
    font-size: 1.25rem;
    color: ${props => organizations[props.orgType].primary};
    text-underline-position: under;
    text-decoration: underline;
  }
`;
