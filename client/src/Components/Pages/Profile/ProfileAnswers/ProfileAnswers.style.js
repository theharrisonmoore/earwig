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
  height: ${props => (props.large ? "4rem" : "2rem")};
  font-weight: 500;
`;

export const YesHalf = styled.div`
  width: ${props => `${props.width}%`};
  background-color: ${props => (props.width === 0 ? colors.red : colors.green)};
  border-right: none;
  color: ${colors.white};
  padding: 0;
  padding-left: 0.5rem;
  display: flex;
  align-items: center;
  font-size: 15px;

  p {
    margin: 0;
    position: absolute;
  }
`;

export const NoHalf = styled.div`
  width: ${props => `${props.width}%`};
  background-color: ${props => (props.width === 0 ? colors.green : colors.red)};
  border-left: none;
  color: ${colors.white};
  padding: 0;
  padding-right: 0.5rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 15px;

  p {
    margin: 0;
    position: absolute;
  }
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
    props.color === "agency"
      ? organizations[props.color].primary
      : colors.profileFontColor};

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
