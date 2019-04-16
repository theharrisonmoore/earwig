import styled from "styled-components";

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
  width: 60%;
  height: 70%;
  box-sizing: border-box;
  border: ${borders.commentBox};
  box-shadow: ${shadows.commentShadow};
  display: flex;
  flex-direction: column;
  padding: 1rem;
  text-align: left;
`;

export const CommentsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid red;
`;

export const Close = styled.img`
  margin-right: 0;
  margin-left: 1rem;
`;

export const CommentsTitle = styled.h2`
  font-size: 1.125rem;
  color: ${colors.profileFontColor};
  margin-bottom: 0;
  font-weight: 900;
`;
