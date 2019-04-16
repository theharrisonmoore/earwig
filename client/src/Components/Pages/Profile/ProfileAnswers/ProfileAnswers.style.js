import styled from "styled-components";

import { colors, organizations, shadows } from "./../../../../theme";

export const YesNoWrapper = styled.div`
  width: 100%;
  display: flex;
`;

export const YesHalf = styled.div`
  width: ${props => props.width};
  border: 1px ${colors.green} solid;
  border-right: none;
  color: ${colors.green};
  padding: 0 0.5rem;
`;

export const NoHalf = styled.div`
  width: ${props => props.width};
  border: 1px ${colors.red} solid;
  border-left: none;
  color: ${colors.red};
  padding: 0 0.5rem;
  display: flex;
  justify-content: flex-end;
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
