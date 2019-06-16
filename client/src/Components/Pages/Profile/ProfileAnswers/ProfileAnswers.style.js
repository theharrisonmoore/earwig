import styled from "styled-components";
import SVG from "react-inlinesvg";

import {
  colors,
  organizations,
  shadows,
  borders,
  size
} from "./../../../../theme";

export const YesNoWrapper = styled.div`
  width: 100%;
  display: flex;
  height: 2rem;
`;

export const YesHalf = styled.div`
  width: ${props => props.width};
  border: 1px ${colors.green} solid;
  border-right: none;
  color: ${colors.green};
  padding: 0 0.5rem;
  display: flex;
  align-items: center;
`;

export const NoHalf = styled.div`
  width: ${props => props.width};
  border: 1px ${colors.red} solid;
  border-left: none;
  color: ${colors.red};
  padding: 0 0.5rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const Comment = styled.button`
  border: ${props =>
    props.active
      ? `1px solid ${props.color}`
      : `1px solid ${colors.lightGray}`};
  color: ${props => (props.active ? `${props.color}` : `${colors.lightGray}`)};
  margin-left: 0.5rem;
  padding: 0 0.5rem;
  box-shadow: ${shadows.buttonShadow};
  border-radius: 0.25rem;
  margin-right: auto;
  justify-self: flex-end;
  cursor: ${props => (props.active ? "pointer" : "not-allowed !important")};
  background-color: #fff;
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
    props.color === "default"
      ? `${colors.profileFontColor}`
      : `${organizations[props.color].primary}`};
  font-weight: 900;
  font-size: 1rem;
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
  font-size: 1rem;
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
  font-size: 1rem;
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
  margin: 0;
  color: ${props =>
    props.itemAvailable ? `${colors.green}` : `${colors.red}`};
  font-weight: 900;
  display: flex;
  align-items: center;
`;

export const SiteAnswer = styled.div`
  margin: 0;
  /* color: ${props =>
    props.itemAvailable ? `${colors.green}` : `${colors.red}`}; */
  font-weight: 900;
  text-decoration: ${props => !props.itemAvailable && "line-through"};
  display: flex;
  align-items: center;
  width: 100%;

  p {
    margin: 0;
  }
`;

export const SiteIcon = styled(SVG)`
  fill: ${props => (props.itemAvailable ? `${colors.green}` : `${colors.red}`)};
  width: 1rem;
  margin-right: 1rem;
`;

export const CanteenSubList = styled.p`
  padding-left: 3rem;
  color: ${props =>
    props.itemAvailable ? `${colors.green}` : `${colors.red}`};
  font-weight: 900;
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
  height: 200px;

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
    height: 200px;
    background: #364d79;
    overflow: hidden;
  }

  .ant-carousel .slick-slide h3 {
    color: #fff;
  }
`;

export const Image = styled.img`
  height: 200px;
  object-fit: cover;
  width: 100%;
`;

export const ImgWrapper = styled.div``;

export const CanteenItem = styled(SiteItem)`
  margin-bottom: 0.5rem;
  text-decoration: ${props => !props.itemAvailable && "line-through"};

  p {
    margin: 0;
  }
`;
