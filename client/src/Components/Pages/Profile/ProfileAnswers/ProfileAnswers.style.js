import styled from "styled-components";
import SVG from "react-inlinesvg";

import {
  colors,
  organizations,
  shadows,
  borders,
  size,
  breakpoints,
} from "../../../../theme";

const generalFontSize = "1rem";
const generalFontWeight = "normal";

export const YesNoWrapper = styled.div`
  margin-top: -0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: ${props => (props.large ? "4.4rem" : "3rem")};
`;

export const Row = styled.div`
  display: flex;
  min-width: 240px;
  padding-left: 0.25rem;

  @media ${breakpoints.tablet} {
    min-width: 400px;
  }
`;

export const AnswerBar = styled.div`
  width: ${({ width }) => {
    if (width < 10) return "2%";
    if (width < 25) return "25%";
    return `${width}%`;
  }};
  background-color: ${props => colors[props.background]};
  color: ${colors.white};
  height: ${props => (props.large ? "1.4rem" : "1rem")};
  align-self: center;
`;

export const AnswerText = styled.div`
  height: ${props => (props.large ? "1.4rem" : "1rem")};
  display: flex;
  align-self: center;
  flex-direction: column;
  align-items: flex-end;
  color: ${colors.dustyGray3};
  border-right: 1px solid ${colors.lightGray};
  padding-bottom: 1.9em;
  padding-right: 0.2rem;
  margin-left: ${props => (props.large ? "-1.4rem" : "-1.7rem")};
  justify-content: center;
  min-width: 3rem;
  font-size: ${props => (props.large ? "0.8rem" : "0.6rem")};

  p {
    margin-top: 2.9em;
  }

  @media ${breakpoints.tablet} {
    font-size: ${props => (props.large ? "1rem" : "0.8rem")};
  }
`;

export const AnswerCount = styled.div`
  color: ${colors.dustyGray3};
  align-self: center;
  margin-top: ${props => (!props.hasData ? "0.7em" : "0")};
  margin-left: ${props => {
    if (!props.hasData && props.large) {
      return `2.8rem`;
    }
    if (!props.hasData && !props.large) {
      return `1.8rem`;
    }
    return `0.2rem`;
  }};
  position: ${props => (!props.hasData ? "absolute" : "relative")};
  font-size: ${props => (props.large ? "0.8rem" : "0.6rem")};

  @media ${breakpoints.tablet} {
    font-size: ${props => (props.large ? "1rem" : "0.8rem")};
  }
`;

export const Comment = styled.button`
  border: none;
  color: ${props =>
    props.active ? `${colors.primary}` : `${colors.lightGray}`};
  font-weight: ${props => (props.active ? `bold` : `normal`)};
  margin-left: 0.5rem;
  padding: 0 0.5rem;
  box-shadow: none;
  outline: none;
  background: none;
  border-radius: 0.25rem;
  margin-right: auto;
  justify-self: flex-end;
  cursor: ${props => (props.active ? "pointer" : "not-allowed !important")};
  visibility: ${props => (props.hasComment ? "visible" : "hidden")};
`;

export const RightCommentWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
  height: 2rem;
  justify-self: flex-end;
`;

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ListItem = styled.p`
  margin: 0;
  color: ${props =>
    props.color === "agency"
      ? organizations[props.color].primary
      : colors.profileFontColor};

  font-weight: ${generalFontWeight};
  font-size: 15px;
  /* width: "100%"; */
  line-height: 2rem;
`;

export const PayrollItem = styled(ListItem)`
  width: 100%;
`;

export const ListComment = styled.div`
  display: flex;
  width: 100%;
  height: 2rem;
  justify-content: space-between;
`;

export const PayrollListRow = styled.div`
  margin: 0;
  color: ${props =>
    props.color === "default"
      ? `${colors.profileFontColor}`
      : `${organizations[props.color].primary}`};
  font-size: 15px;
  display: flex;
`;

export const PayrollName = styled.p`
  width: 50%;
  margin: 0;
  font-weight: 900;
`;

export const PayrollFee = styled.p`
  width: 50%;
  margin: 0;
  margin-right: auto;
  font-size: 15px;
`;

export const Wrapper = styled.div`
  position: fixed;
  min-height: 100vh;
  min-width: 100vw;
  background-color: ${colors.ghostWhite};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  backface-visibility: hidden;
  z-index: 1000;
`;

export const CommentsDiv = styled.div`
  position: absolute;
  background: white;
  width: ${props => (props.isMobile ? "90%" : "60%")};
  height: auto;
  box-sizing: border-box;
  border: ${borders.commentBox};
  box-shadow: ${shadows.commentShadow};
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  text-align: left;
  top: 0;
  margin-top: 60px;
  margin-bottom: 100px;
`;

export const CommentsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

export const Close = styled.img`
  margin-right: 0;
  margin-left: 1rem;
  cursor: pointer;
`;

export const CommentsTitle = styled.h2`
  font-size: 1.125rem;
  color: ${colors.profileFontColor};
  margin-bottom: 0;
  font-weight: 900;
  width: 90%;
`;

export const IndividComment = styled.div`
  display: flex;
  flex-direction: column;
  flex: initial;
  justify-content: flex-start;
  margin-bottom: 1rem;
  position: relative;
  padding-bottom: 2rem;
`;

export const UserID = styled.h3`
  font-weight: 900;
  font-size: 15px;
  color: ${colors.profileFontColor};
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
`;

export const SiteItem = styled.div`
  display: flex;
  align-items: center;
  font-size: ${generalFontSize};
  font-weight: ${generalFontWeight};
`;

export const SiteAnswer = styled.div`
  margin: 0;
  color: ${({ itemAvailable }) =>
    itemAvailable ? `${colors.green}` : `${colors.strikedOutItem}`}
  text-decoration: ${({ itemAvailable }) =>
    itemAvailable === false && "line-through"}
  border: none;
  display: flex;
  align-items: center;
  width: 100%;
  p {
    margin: 0;
  }
`;

export const NoAnswer = styled.div`
  margin: 0;
  color: ${colors.profileFontColor};
  display: flex;
  align-items: center;
  width: 100%;

  p {
    margin: 0;
  }
`;

export const SiteIcon = styled(SVG)`
  fill: ${props =>
    props.itemAvailable ? `${colors.green}` : `${colors.strikedOutItem}`};
  width: 1rem;
  margin-right: 1rem;
`;

export const CanteenSubList = styled.p`
  padding-left: 3rem;
  color: ${props =>
    props.itemAvailable ? `${colors.green}` : `${colors.strikedOutItem}`};
  font-weight: ${generalFontWeight};
  font-size: ${generalFontSize};
  display: ${props => (props.hide ? "none" : "block")};
  text-decoration: ${props => !props.itemAvailable && "line-through"};
`;

export const Error = styled.p`
  margin: 0;
  color: ${colors.red};
`;

export const SliderWrapper = styled.div`
  background: grey;
  position: relative;
  width: 300px;
  margin: 0 auto;
  height: 400px;

  @media (min-width: ${size.tablet}) {
    width: 500px;
  }
  .right-arrow {
    position: absolute;
    top: 50%;
    right: 0;
    /* z-index: 100; */
    transform: translateY(-50%);
  }

  .left-arrow {
    position: absolute;
    top: 50%;
    left: 0;
    z-index: 1;
    transform: translateY(-50%);
  }

  .ant-carousel .slick-slide {
    text-align: center;
    height: 400px;
    background-color: ${colors.gondola};
    overflow: hidden;
  }

  .ant-carousel .slick-slide h3 {
    color: #fff;
  }
`;

export const Image = styled.img`
  transform: ${({ orientation }) => {
    switch (orientation) {
      case "3":
        return "rotate(180deg)";
      case "8":
        return "rotate(-90deg)";
      case "6":
        return "rotate(90deg)";
      default:
        return "rotate(0deg)";
    }
  }};
  height: 400px;
  object-fit: contain;
  margin: 0 auto;
  cursor: pointer;
  max-width: 100%;
`;

export const ImgWrapper = styled.div``;

export const CanteenItem = styled(SiteItem)`
  margin-bottom: 0.5rem;
  text-decoration: ${props => !props.itemAvailable && "line-through"};

  p {
    margin: 0;
  }
`;
