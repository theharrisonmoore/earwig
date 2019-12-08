import styled, { css } from "styled-components";
import SVG from "react-inlinesvg";
import { NavLink } from "react-router-dom";
import { Icon as AntIcon } from "antd";
import BlurredBackground from "../../../assets/blurred-background.png";

import {
  organizations,
  colors,
  shadows,
  borders,
  breakpoints
} from "../../../theme";
import { ReactComponent as ReplyIcon } from "../../../assets/reply-icon.svg";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: ${({ showTabs, isMobile }) =>
    isMobile
      ? `calc(13.25rem - ${showTabs ? "0px" : "60px"})`
      : `calc(13.25rem - ${showTabs ? "0px" : "60px"})`};
  text-align: left;
  padding-bottom: 100px;
  font-size: 1rem;
  position: relative;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  color: ${colors.white};
  width: 100%;
  max-width: 57.5rem;
  z-index: 100;
  transition: 0.4s all;
  pointer-events: none;

  + * {
    padding-top: ${({ headerHeight }) => headerHeight}px !important;
  }
`;

export const ColoredDiv = styled.div`
  background-color: ${props => organizations[`${props.category}`].primary};
  width: 100%;
  margin-top: 0;
`;

export const TabsDivFullWidth = styled.div`
  border-bottom: 1px solid ${colors.dustyGray2};
  width: 100%;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  background-color: ${colors.white};
  z-index: 1;
`;

export const TabsDiv = styled.div`
  display: flex;
  max-width: 376px;
  width: 100%;
  margin: 0 auto;
  position: relative;
`;

export const Tab = styled.div`
  display: flex;
  color: ${colors.primary};
  flex-direction: column;
  align-items: center;
  padding: 0.75rem 0;
  width: 50%;
  position: relative;
  cursor: pointer;
  pointer-events: all !important;

  * {
    pointer-events: none;
  }
`;

export const TabTitle = styled.span`
  font-size: 1rem;
  margin-top: 0.25rem;

  font-weight: ${({ isActive }) => (isActive ? "500" : "normal")};
`;

export const Underline = styled.div`
  position: absolute;
  content: "";
  width: 50%;
  height: 5px;
  background-color: ${colors.primary};
  margin-left: ${({ left }) => (left ? 0 : "50%")};
  border: 0;
  display: block;
  z-index: 1;
  bottom: 0;
  transition: 400ms all;
`;

export const CompanyDetails = styled.div`
  /* border-bottom: ${props =>
    props.level > 0 ? `${borders.commentBox}` : "none"}; */
  display: flex;
  flex-direction: column;
  align-items: center;
  /* padding-bottom: ${props =>
    props.isTablet || props.isMobile ? "2rem" : "1rem"}; */
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
  font-size: 1.125rem;
  font-weight: 500;
  margin: 0;
  text-transform: capitalize;
  color: ${({ white }) => (white ? colors.white : colors.profileFontColor)};
  margin: 0.25rem 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`;

export const ButtonDiv = styled.div`
  min-width: ${props => (props.isTablet || props.isMobile ? "100%" : "50%")};
  display: ${props => (props.organization === "worksite" ? "none" : "flex")};
  justify-content: center;
  align-items: center;
  height: ${({ shrink }) => (shrink ? "1px" : "auto")};
  opacity: ${({ shrink }) => (shrink ? "0" : "1")};

  transition: 0.4s all;
`;

export const OrgLink = styled.a`
  display: ${props => props.hasDetails === null && "none"};
  font-weight: normal;
  font-size: 15px;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const OrgButton = styled.button`
  color: ${colors.primary};
  background: none;
  transition: all ease-in 0.1s;
  width: ${props => (props.isMobile ? "5rem" : "7rem")};
  height: 2.5rem;
  border-radius: 22.25px;
  margin: 1rem 0.5rem;
  cursor: pointer;
  position: relative;
  outline: none;

  height: 2.5rem;
  transition: 0.4s all;

  :hover {
    font-weight: 700;
  }

  &:active {
    ::after {
      content: "";
      position: absolute;
      top: 0px;
      right: 0px;
      bottom: 0px;
      left: 0px;
      background: ${colors.btnClick};
      border-radius: 22.25px;
    }
  }
`;

export const InactiveButton = styled(OrgButton)`
  cursor: not-allowed !important;
  outline: none;
  box-shadow: none;
  display: ${props => props.hasDetails === undefined && "none"};

  opacity: ${({ shrink }) => (shrink ? "0" : "0.3")};
`;

export const ActionButtonsDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: 0.75rem;
  background-color: ${colors.white};
  width: 100%;
  border-bottom: 1px solid ${colors.dustyGray2};

  @media ${breakpoints.mobileL} {
    justify-content: center;
  }
`;

const dividerHieght = 14;
const dividerStyle = `
:after {
  position: absolute;
  content: "";
  display: block;
  width: 100%;
  border-bottom: ${dividerHieght}px solid ${colors.alto};
  top: 0;
  left: 0;
}
`;

const sharedReviewSectionStyle = `
padding: calc(${dividerHieght}px + 1.25rem) 1rem 0;

@media ${breakpoints.mobileM} {
  padding: calc(${dividerHieght}px + 1.25rem) 2rem 0;
}

@media ${breakpoints.mobileL} {
  padding: calc(${dividerHieght}px + 1.25rem) 4rem 0;
}

@media ${breakpoints.mobileXL} {
  padding: calc(${dividerHieght}px + 1.25rem) 7rem 0;
}

@media ${breakpoints.tablet} {
  padding: calc(${dividerHieght}px + 1.25rem) 10rem 0;
}
`;

export const ReviewDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  text-align: left;
  ${sharedReviewSectionStyle}
  ${dividerStyle}
`;

export const Level0PromoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  ${sharedReviewSectionStyle}

  margin-top: 1rem;
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
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 4.5%;
  height: 5rem;
`;

export const CommentDiv = styled.div`
  align-self: flex-start;
  justify-content: flex-start;
  display: flex;
  flex-direction: column;
  /* flex: initial; */
  padding: 1.5rem 0 1rem;
  width: 100%;
  position: relative;
  display: ${props => props.noReview && "none"};
  color: ${colors.white};
  border-bottom: 1px solid ${colors.dustyGray1}40;

  .ant-collapse .ant-collapse-item {
    border: none;
  }

  .ant-collapse > .ant-collapse-item > .ant-collapse-header {
    padding: 7px 14px 10px !important;
  }
`;

export const BubbleAndDate = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.625rem;
`;

const adminTitle = css`
  text-align: right;
`;

export const UserID = styled.h3`
  font-weight: 900;
  font-size: 1rem;
  color: ${colors.profileFontColor};
  ${({ adminReply }) => adminReply && adminTitle}
`;

export const LightTitle = styled(UserID)`
  opacity: 0.5;
`;

const adminBorder = css`
  border: 1px solid ${({ category }) => organizations[category].primary};
  text-align: right;
  margin-left: 0.25rem;
  margin-right: 0;
`;

export const VoiceWrapper = styled.div`
  width: 200px;

  @media ${breakpoints.tablet} {
    min-width: 400px;
  }
`;

export const CommentBubble = styled.p`
  background: ${({ bgColor }) => bgColor || colors.ghostGray};
  color: ${({ color }) => color || colors.profileFontColor};
  border-radius: 1.125rem;
  align-self: flex-start;
  justify-content: flex-start;
  padding: 0.5rem 1rem;
  margin-bottom: 0;
  white-space: pre-wrap;
  text-align: left;
  margin-right: 0.25rem;
  max-width: 90%;

  ${({ adminReply }) => adminReply && adminBorder}
`;

export const CommentDate = styled.p`
  margin: 0;
  text-align: right;
  align-self: flex-end;
  color: ${colors.profileFontColor}
  font-size: 18px;
  opacity: 0.6;
  letter-spacing: 2.5px;
  margin-bottom: -1rem;
  margin-left: -0.5rem;
`;

export const StarWrapper = styled.div`
  display: flex;
  text-align: left;
  flex-direction: row;
  justify-content: center;
  cursor: pointer;
  height: ${({ shrink }) => (shrink ? "0" : "intial")};
  opacity: ${({ shrink }) => (shrink ? "0" : "1")};
  transition: 0.4s all;
`;

export const Reviews = styled.p`
  margin: 0;
  margin-left: 1rem;
  border-bottom: 2px solid ${colors.white};
  font-weight: 600;
  color: ${colors.white};
`;

export const NoReview = styled.span`
  color: ${colors.white};
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
  background-image: url(${BlurredBackground});
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;

  ::after {
    content: " ";
    position: absolute;
    background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 1) 90%
    );
    width: 100%;
    height: 1rem;
    bottom: 0;
  }
`;

export const AccountLink = styled(VerifyLink)`
  z-index: 2;
  display: flex;
  justify-content: flex-start;
  position: ${({ sticky }) => (sticky ? "-webkit-sticky" : "-webkit-static")};
  position: ${({ sticky }) => (sticky ? "sticky" : "static")};
  top: 0;
  width: 100%;
  background-color: ${colors.white};
  position: sticky;
  border-bottom: ${({ sticky }) =>
    sticky ? `1px solid ${colors.dustyGray2}` : "none"};
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
`;

export const ButtonsWrapper = styled(ActionsDiv)`
  display: flex;
  /* justify-content: space-around; */
  align-items: center;
  width: 90%;
`;

export const UserTrade = styled.p`
  font-style: italic;
  margin-left: 10px;
  color: ${colors.profileFontColor};
  margin-bottom: 0;
`;

export const UserDiv = styled.div`
  display: flex;
`;

export const UserAdditionalDetails = styled.div`
  margin-top: -10px;

  p {
    font-size: 0.8rem;
    color: ${colors.dustyGray2};
  }
`;

export const ActionButton = styled.button`
  background: ${({ color }) => color};
  box-shadow: 0px 4px 13px rgba(173, 145, 183, 0.273438);
  border-radius: 300px;
  border: none;
  padding: 0.5rem 0.5rem;
  /* width: 96%; */
  /* width: 10rem; */
  width: 8.5rem;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  font-size: 12px;
  font-weight: 700;
  text-align: ${props => (props.isMobile ? "center" : "left")};
  color: ${colors.white};
  box-shadow: ${shadows.buttonShadow};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  position: relative;

  @media ${breakpoints.mobileM} {
    font-size: 12px;
    width: 10rem;
  }

  @media ${breakpoints.mobileL} {
    width: 11rem;
    padding: 1rem 0.5rem;
  }

  @media ${breakpoints.tablet} {
    width: 18rem;
    height: 4.5rem;
    padding: 0.5rem 1rem;
  }

  &:active {
    box-shadow: none;

    ::after {
      content: "";
      position: absolute;
      top: 0px;
      right: 0px;
      bottom: 0px;
      left: 0px;
      background: ${colors.btnClick};
      box-shadow: none;
    }
  }
`;

export const ContractorDiv = styled.div`
  width: 100%;
  font-family: Roboto;
`;

export const ContractorText = styled.p`
  font-size: 15px;
  letter-spacing: 0.3px;
  color: ${colors.profileFontColor};
  .contactor-name {
    font-weight: 500;
  }
`;

export const ContractorListLink = styled.span`
  /* color: #1890ff; */
  text-decoration: none;
  background-color: transparent;
  cursor: pointer;
`;

export const BorderedWrapper = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 5rem 0;
  border: none;
  min-height: calc(100vh - 5.5rem);

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

export const PopOverWrapper = styled.div`
  text-align: center;
  height: ${({ shrink }) => (shrink ? "0" : "intial")};
  opacity: ${({ shrink }) => (shrink ? "0" : "1")};
  transition: 0.4s all;
`;

export const OrganisationDetailsWrapper = styled(ReviewDiv)`
  position: relative;
  padding-top: calc(${dividerHieght}px + 1rem);
  padding-bottom: 1.25rem !important;

  ${dividerStyle}
`;

export const InfoRow = styled.div`
  width: 100%;
  display: flex;
  text-align: left;
  display: flex;
  align-items: center;
  padding: 0.25rem 0;
`;

export const LeftInfo = styled.div`
  width: 30%;
  display: flex;
  align-items: center;
  color: ${colors.profileFontColor};
  font-weight: 500;
  font-size: 15px;
`;

export const RightInfo = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
`;

export const UserInfoWrapper = styled.div`
  margin-left: 0.625rem;
`;

export const RatingWithUserInfo = styled.div`
  display: flex;
  padding-top: 0.5rem;
`;
