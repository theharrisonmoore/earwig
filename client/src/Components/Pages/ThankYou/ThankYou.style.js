import styled from "styled-components";
import { Link } from "react-router-dom";

import { colors, shadows, organizations } from "./../../theme";

export const ThankYouWrapper = styled.div`
  width: 100%;
  max-width: 40rem;
  margin: 1rem auto;
  padding: 0 1rem;
  padding-top: 2rem;
`;

export const ContentWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
`;

export const Image = styled.img`
  display: block;
  margin: 0 auto;
  width: 5rem;
  height: 5rem;
`;

export const Heading = styled.h1`
  color: ${colors.profileFontColor};
  font-size: 28px;
  margin-top: 2rem;
`;

export const BoldPargraph = styled.p`
  color: ${colors.profileFontColor};
  font-size: 18px;
  margin-top: 1rem;
`;

export const SubHeading = styled.h2`
  color: ${colors.profileFontColor};
  font-size: 18px;
  margin-top: 2rem;
  text-align: left;
`;

export const List = styled.ul`
  opacity: 0.8;
  color: ${colors.profileFontColor};
  font-size: 18px;
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
`;

export const Icon = styled.i`
  font-size: 2rem;
  cursor: pointer;

  &:hover {
    color: #${props => props.color};
  }
`;

export const Button = styled.button`
  display: block;
  width: 100%;
  height: 56px;
  box-shadow: ${shadows.buttonShadow};
  border-radius: 6px;
  background-color: ${props => organizations[props.orgType].primary};
  color: ${colors.white};
  border: none;
  margin-bottom: 2.5rem;
  font-size: 20px;
  font-weight: 700;
  transition: all 0.2s;

  &:focus {
    outline: none;
  }
  &:active {
    padding-top: 1px;
    box-shadow: ${shadows.activeButtonShadow};
    transform: translateY(2px);
  }
`;

export const StyledLink = styled(Link)`
  &,
  &:link,
  &:hover {
    font-family: Roboto;
    font-style: normal;
    font-weight: 900;
    font-size: 20px;
    color: ${props => organizations[props.orgType].primary};
    text-underline-position: under;
    text-decoration: underline;
  }
`;
