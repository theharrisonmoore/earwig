import styled from "styled-components";
import SVG from "react-inlinesvg";

import { organizations, colors, shadows, borders } from "./../../../theme";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: ${props => (props.isMobile ? "3rem" : "4rem")};
  text-align: left;
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
  border-bottom: ${borders.commentBox};
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
`;

export const CompanyTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
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

  :hover {
    background: ${props => organizations[`${props.category}`].primary};
    color: ${colors.white};
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

export const ReviewButtonsDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ReviewType = styled.div`
  display: flex;
  width: 45%;
  align-items: center;
  justify-content: ${props => props.align};
`;

export const Time = styled.p`
  font-style: italic;
  margin: 0;
  color: ${colors.profileFontColor};
`;

export const ReviewButton = styled.button`
  background: ${props => organizations[`${props.category}`].primary};
  color: ${colors.white};
  display: flex;
  justify-content: space-between;
  box-shadow: ${shadows.buttonShadow};
  border-radius: 0.25rem;
  height: 3rem;
  padding: 0 0.5rem;
  align-items: center;
  min-width: 8rem;
  margin-left: 0.5rem;
  z-index: -1;

  h4 {
    margin: 0;
    font-size: 1rem;
    width: 50%;
    text-align: left;
    line-height: 0.9rem;
    font-weight: 700;
    color: ${colors.white};
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    font-style: italic;
    margin-right: 0.5rem;
  }
`;

export const QuickReviewButton = styled(ReviewButton)`
  width: 35%;
  position: relative;
  margin-left: 30%;

  h4 {
    width: 100%;
  }

  :after {
    content: "";
    border: 2px ${props => organizations[`${props.category}`].primary} dashed;
    position: absolute;
    left: -75%;
    height: 100%;
    width: 80%;
    z-index: -1;
    border-radius: 0.25rem;
  }
`;

export const Icon = styled(SVG)`
  margin: ${props => props.margin};
`;

export const CompanyNameAndStars = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CommentDiv = styled.div`
  align-self: flex-start;
  justify-content: flex-start;
  flex: initial;
  margin-bottom: 1rem;
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
