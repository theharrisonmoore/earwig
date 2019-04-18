import styled from "styled-components";
import SVG from "react-inlinesvg";
import { NavLink } from "react-router-dom";

import { organizations, colors, shadows } from "./../../../theme";

export const ReviewButtonsDiv = styled.div`
  display: flex;
  flex-direction: ${props =>
    props.isMobile || props.isTablet ? "column" : "row"};
  justify-content: space-between;
  align-items: center;
`;

export const ReviewType = styled.div`
  display: flex;
  width: ${props => (props.isMobile || props.isTablet ? "100%" : "45%")};
  align-items: center;
  justify-content: center;
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
  width: 100%;
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

export const FullLink = styled(NavLink)`
  display: flex;
  width: 18rem;
  margin-left: 0.5rem;
`;

export const QuickReviewContainer = styled.div`
  width: 18rem;
  margin-left: 0.5rem;
  height: 3rem;
  display: flex;
`;

export const QuickReviewDots = styled.div`
  border: 2px ${props => organizations[`${props.category}`].primary} dashed;
  width: 40%;
  border-right: 0;
`;

export const QuickLink = styled(NavLink)`
  display: flex;
  width: 60%;
`;

export const QuickReviewButton = styled(ReviewButton)`
  margin-left: 0;
  width: 100%;
  /* margin-left: 30%; */

  h4 {
    width: 100%;
  }

  /* :after {
    content: "";
    border: 2px ${props => organizations[`${props.category}`].primary} dashed;
    position: absolute;
    left: -75%;
    height: 100%;
    width: 80%;
    z-index: -1;
    border-radius: 0.25rem;
  } */
`;

export const Icon = styled(SVG)`
  margin: ${props => props.margin};
`;
