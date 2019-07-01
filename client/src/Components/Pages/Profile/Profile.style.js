import styled from "styled-components";
import SVG from "react-inlinesvg";
import { NavLink } from "react-router-dom";
import { Icon as AntIcon, Button } from "antd";

import {
  organizations,
  colors,
  shadows,
  borders,
  breakpoints
} from "./../../../theme";
import { ReactComponent as ReplyIcon } from "../../../assets/reply-icon.svg";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: ${props => (props.isMobile ? "3rem" : "4rem")};
  text-align: left;
  padding-bottom: 2rem;
  font-size: 1rem;
`;

export const Banner = styled.div`
  background: ${props => organizations[`${props.category}`].primary};
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
  /* border-bottom: ${props =>
    props.level > 0 ? `${borders.commentBox}` : "none"}; */
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
  text-transform: capitalize;
`;

export const ButtonDiv = styled.div`
  min-width: ${props => (props.isTablet || props.isMobile ? "100%" : "50%")};
  display: ${props => (props.organization === "worksite" ? "none" : "flex")};
  justify-content: center;
  align-items: center;
`;

export const OrgLink = styled.a`
  display: ${props => props.hasDetails === null && "none"};
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
  display: ${props => props.hasDetails === undefined && "none"};

  :hover {
    background: ${colors.white};
    color: ${props => colors.inputBorder};
  }
`;

export const ActionButtonsDiv = styled.div`
  display: flex;
  flex-direction: row;
  padding: 2rem 0;
  text-align: center;
  justify-content: space-around;
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
  display: flex;
  flex-direction: column;
  /* flex: initial; */
  margin-bottom: 1rem;
  width: 100%;
  position: relative;
  display: ${props => props.noReview && "none"};
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

export const LightTitle = styled(UserID)`
  opacity: 0.5;
`;

export const CommentBubble = styled.p`
  background: ${({ color }) => color || colors.ghostGray};
  border-radius: 1.125rem;
  align-self: flex-start;
  justify-content: flex-start;
  padding: 0.5rem 1rem;
  margin-bottom: 0;
  white-space: pre-wrap;
  text-align: left;
  margin-right: 0.5rem;
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
  cursor: pointer;
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
  align-items: center;
  margin: 1.25rem 0;
`;

export const StyledAntIcon = styled(AntIcon)`
  font-size: 1.5rem;
  color: ${colors.gray};
  cursor: pointer;
`;

export const IconWrapper = styled.div`
  min-width: 70px;
`;

export const StyledReplyIcon = styled(ReplyIcon)`
  margin-right: 0.5rem;
  position: absolute;
  right: 0;
  top: 60%;
  transform: translateY(-50%) rotate(180deg);
  height: 100%;
  cursor: pointer;
  z-index: 1000;
  padding: 0 10px;
`;

export const BannerTitle = styled.p`
  font-size: 1.125rem;
  font-weight: 900;
`;

export const Cancel = styled.p`
  font-size: 1.125rem;
  font-weight: 700;
  position: absolute;
  left: 7px;
  cursor: pointer;
`;

export const ActionsDiv = styled.div`
  display: flex;
  /* justify-content: space-around; */
  align-items: center;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 1rem;
`;

export const ButtonsWrapper = styled(ActionsDiv)`
  display: flex;
  /* justify-content: space-around; */
  align-items: center;
  width: 90%;
`;

export const HelpfulButtonWrapper = styled.div`
  position: relative;
  margin-right: ${props => (props.isMobile ? "0.5rem" : "2rem")};

  &::after {
    position: absolute;
    content: "";
    width: 100%;
    mix-blend-mode: exclusion;
    height: ${({ number }) => number + "0%"};
    left: 0;
    z-index: 2;
    bottom: 0;
    background: ${({ color }) => color};
    pointer-events: none;
    transition: 0.5s all ease;
  }
`;

export const ActionsButton = styled(Button)`
  background: ${({ bgcolor }) => bgcolor};
  border: none;
  font-weight: 700;
  font-size: 1rem;
  width: 100%;
  padding: 0.5rem 1rem;
  height: auto;
  margin-right: ${props => (props.ismobile ? "0.5rem" : "2rem")};

  transform: scale3d(
    ${({ scale }) => scale || 1},
    ${({ scale }) => scale || 1},
    1
  );

  &:hover,
  &:focus {
    color: #fff;
    background-color: ${({ bgcolor }) => bgcolor};
    border-color: ${({ bgcolor }) => bgcolor};
  }
`;

export const UserTrade = styled.p`
  font-style: italic;
  margin-left: 10px;
`;

export const UserDiv = styled.div`
  display: flex;
`;

export const UserAdditionalDetails = styled.div`
  margin-top: -15px;

  p {
    font-size: 0.8rem;
    color: ${colors.dustyGray2};
  }
`;

export const ReplyButton = styled.p`
  text-decoration: underline;
  border: none;
  background: none;
  font-weight: 700;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  color: ${({ color }) => color};
  margin: 0.5rem;
`;

export const ActionButton = styled.button`
  background: ${({ color }) => color};
  box-shadow: 0px 4px 13px rgba(173, 145, 183, 0.273438);
  border-radius: 3px;
  border: none;
  padding: 1rem 0rem;
  max-width: 8.25rem;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  font-family: Arial;
  font-size: 11px;
  line-height: 13px;
  text-align: center;
  color: ${colors.white};
  box-shadow: ${shadows.buttonShadow};

  @media ${breakpoints.mobileM} {
    font-size: 14px;
    max-width: 10rem;
  }

  @media ${breakpoints.mobileL} {
    max-width: 11rem;
    padding: 1rem 0.5rem;
  }

  @media ${breakpoints.tablet} {
    max-width: 12rem;
  }
`;

export const ContractorDiv = styled.div`
  width: 100%;
`;

export const ContractorText = styled.p`
  font-family: ArialMT;
  font-size: 18px;

  letter-spacing: 0.3px;

  color: ${colors.profileFontColor};

  .contactor-name {
    font-weight: 700;
  }
`;

export const ContractorListLink = styled.span`
  color: #1890ff;
  text-decoration: none;
  background-color: transparent;
  cursor: pointer;
`;
