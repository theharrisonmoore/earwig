import styled from "styled-components";
import SVG from "react-inlinesvg";
import { NavLink } from "react-router-dom";
import { Icon as AntIcon } from "antd";

import { organizations, colors, shadows, borders } from "./../../../theme";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: ${props => (props.isMobile ? "3rem" : "4rem")};
  text-align: left;
  padding-bottom: 2rem;
`;

export const Banner = styled.div`
  background: ${props => organizations[`${props.category}`].primary};
  height: 2.75rem;
  width: 100%;
  color: ${colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: capitalize;
  position: fixed;
  z-index: 2;

  p {
    margin-bottom: 0;

    span {
      font-weight: 700;
    }
  }
`;

export const Header = styled.div`
  box-shadow: ${shadows.headerShadow};
  display: flex;
  flex-direction: column;
  margin-top: 2.75rem;
  padding: ${props =>
    props.isTablet || props.isMobile ? "1.5rem 1rem" : "1.5rem 7rem"};
`;

export const CompanyDetails = styled.div`
  border-bottom: ${props =>
    props.level > 0 ? `${borders.commentBox}` : "none"};
  display: flex;
  flex-direction: ${props =>
    props.isTablet || props.isMobile ? "column" : "row"};
  align-items: center;
  padding-bottom: ${props =>
    props.isTablet || props.isMobile ? "2rem" : "1rem"};
`;

export const CompanyDiv = styled.div`
  min-width: 50%;
  display: flex;
  text-align: left;
  margin-bottom: 1rem;
  justify-content: center;
  align-items: center;
`;

export const CompanyTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin: 0;
`;

export const ButtonDiv = styled.div`
  min-width: ${props => (props.isTablet || props.isMobile ? "100%" : "50%")};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const OrgButton = styled.button`
  border: ${props => organizations[`${props.category}`].primary} solid 2px;
  box-sizing: border-box;
  color: ${props => organizations[`${props.category}`].primary};
  background: ${colors.white};
  transition: all ease-in 0.1s;
  width: ${props => (props.isMobile ? "5rem" : "7rem")};
  height: 2.5rem;
  border-radius: 0.25rem;
  box-shadow: ${shadows.buttonShadow};
  margin: 0 0.5rem;
  cursor: pointer;

  :hover {
    background: ${props => organizations[`${props.category}`].primary};
    color: ${colors.white};
  }
`;

export const InactiveButton = styled(OrgButton)`
  cursor: not-allowed !important;
  opacity: 0.3;
  outline: none;
  box-shadow: none;

  :hover {
    background: ${colors.white};
    color: ${props => colors.inputBorder};
  }
`;

export const GiveReviewDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 0;
  text-align: center;
`;

export const ReviewDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${props =>
    props.isTablet || props.isMobile ? "2rem 1rem" : "2rem 7rem"};
  text-align: left;
`;

export const GiveReviewTitle = styled.h3`
  font-size: 1.75rem;
  font-style: italic;
  font-weight: 300;
  color: ${colors.profileFontColor};
  margin-bottom: 1.5rem;
`;

export const SVGIcon = styled(SVG)`
  margin: ${props => props.margin};
`;

export const CompanyNameAndStars = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const CommentDiv = styled.div`
  align-self: flex-start;
  justify-content: flex-start;
  flex: initial;
  margin-bottom: 1rem;
  width: 100%;
  position: relative;
`;

export const BubbleAndDate = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

export const UserID = styled.h3`
  font-weight: 900;
  font-size: 1rem;
  color: ${colors.profileFontColor};
`;

export const CommentBubble = styled.p`
  background: ${colors.ghostGray};
  border-radius: 1.125rem;
  padding: 0.5rem 1rem;
  position: relative;
  margin-right: 0.5rem;
  margin-bottom: 0;
`;

export const CommentDate = styled.p`
  margin: 0;
  text-align: right;
  align-self: flex-end;
`;

export const StarWrapper = styled.div`
  display: flex;
  text-align: left;
  flex-direction: row;
  justify-content: flex-start;
`;

export const Reviews = styled.p`
  margin: 0;
  margin-left: 1rem;
`;

export const VerifyPromo = styled.div`
  display: flex;
  padding: 2rem 1rem;
  color: ${colors.profileFontColor};
  font-weight: 900;
  font-size: 1.125rem;
  flex-direction: column;
  justify-content: center;
`;

export const VerifyLink = styled(NavLink)`
  font-size: 1.25rem;
  cursor: pointer;
  text-decoration: none;
  transition: all ease 0.1s;
  color: ${colors.profileFontColor};

  :hover {
    color: ${props => organizations[`${props.category}`].primary};
  }
`;

export const AccountIcon = styled(SVG)`
  margin: ${props => props.margin};
  width: 1rem;
  fill: ${colors.profileFontColor};
`;

export const AccountPromo = styled.div`
  font-size: 1.125rem;
  font-weight: 900;
  color: ${colors.profileFontColor};
  display: flex;
  flex-direction: column;
`;

export const AccountLink = styled(VerifyLink)`
  padding-top: 1rem;
`;

export const AccountItem = styled.div`
  display: flex;
`;

export const StyledAntIcon = styled(AntIcon)`
  font-size: 1.5rem;
  color: ${colors.gray};
  cursor: pointer;
`;

export const IconWrapper = styled.div`
  min-width: 70px;
`;
