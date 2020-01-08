import styled from "styled-components";
import { Link } from "react-router-dom";

import { colors, organizations } from "../../../theme";

export const ThankYouWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 0.5rem;
  padding-top: 6rem;
  padding-bottom: 100px;
`;

export const ContentWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  padding-bottom: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${({ isDesktop }) =>
    isDesktop &&
    `
    display: flex;
    flex-direction: row;
  `}
`;

export const LeftSide = styled.section`
  width: 50%;
  padding: 2rem 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const RightSide = styled(LeftSide)`
  position: relative;

  :after {
    content: " ";
    position: absolute;
    left: 0;
    top: 10%;
    height: 80%;
    border-left: 1px ${colors.dustyGray2} solid;
    opacity: 0.25;
  }
`;

export const Image = styled.img`
  display: block;
  margin: 0 auto;
  width: 5rem;
  height: 5rem;
`;

export const Heading = styled.h1`
  color: ${colors.dustyGray1};
  font-size: 18px;
  margin: 1.5rem 0 0.5rem 0;
  font-style: italic;
`;

export const Thanks = styled.p`
  color: ${colors.dustyGray1};
  font-size: 18px;
  font-style: italic;
  margin-top: 1.5rem;
`;

export const Paragraph = styled.p`
  color: ${colors.dustyGray1};
  padding: 0 1rem;
`;

export const SubHeading = styled.h2`
  color: ${colors.profileFontColor};
  font-size: 1.125rem;
  margin-top: 2rem;
  text-align: left;
`;

export const List = styled.ul`
  color: ${colors.dustyGray1};
  padding-top: 0.5rem;

  & li {
    color: ${colors.dustyGray1};
    text-align: center;
    list-style-type: none;
  }
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
  margin: 1.5rem auto;
`;

export const StyledLink = styled(Link)`
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

export const SquareSection = styled.section`
  border: 1px solid rgba(155, 155, 155, 0.525514);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  padding: 1rem;
  margin: 0 0 2rem 0;
  max-width: 350px;
`;

export const PromoTitle = styled.h3`
  font-size: 18px;
  line-height: 2.25rem;
  text-align: center;
  color: ${colors.dustyGray1};
  font-weight: 500;
`;
