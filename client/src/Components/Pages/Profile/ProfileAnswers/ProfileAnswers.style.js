import styled from "styled-components";
import SVG from "react-inlinesvg";

import { colors, organizations, shadows, borders } from "./../../../../theme";

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
      ? `1px solid ${colors.purpleLinks}`
      : `1px solid ${colors.lightGray}`};
  color: ${props =>
    props.active ? `${colors.purpleLinks}` : `${colors.lightGray}`};
  margin-left: 0.5rem;
  padding: 0 0.5rem;
  box-shadow: ${shadows.buttonShadow};
  border-radius: 0.25rem;
  cursor: ${props => (props.active ? "pointer" : "not-allowed !important")};
`;

export const RightCommentWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
  height: 2rem;
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

export const ListComment = styled.div`
  display: flex;
  width: 100%;
  height: 2rem;
  justify-content: space-between;
`

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
  height: 100vh;
  width: 100vw;
  background-color: ${colors.ghostWhite};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CommentsDiv = styled.div`
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
  background: ${colors.ghostGray};
  border-radius: 1.125rem;
  align-self: flex-start;
  justify-content: flex-start;
  padding: 0.5rem 1rem;
`;

export const SiteItem = styled.div`
  margin: 0;
  color: ${props =>
    props.itemAvailable ? `${colors.green}` : `${colors.red}`};
  font-weight: 900;
  display: flex;
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
`;
