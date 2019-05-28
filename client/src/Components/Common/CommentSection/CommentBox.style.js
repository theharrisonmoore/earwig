import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button } from "antd";

import { colors, shadows } from "../../../theme";
import { MOBILE_WIDTH } from "../../../constants/screenWidths";

export const Wrapper = styled.div`
  padding-top: 3rem;
`;

export const CommentTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: normal;
  font-style: italic;
  color: ${colors.profileFontColor};
`;

export const CommentBox = styled.textarea`
  width: 100%;
  max-width: 40rem;
  height: 8.5rem;
  border: 1px solid ${colors.inputBorder};
  border-radius: 5px;
  outline: none;
  padding: 1rem;
  box-shadow: ${shadows.buttonShadow};
`;

export const StyledButton = styled(Button)`
  background: ${colors.white};
  border: 1px solid ${props => (props.error ? colors.red : colors.mineShaft2)};
  box-shadow: ${shadows.buttonShadow};
  border-radius: 3px;
  width: 100%;

  font-weight: 900;
  font-size: 1.125rem;
  color: ${colors.profileFontColor};
  outline: none;
  display: block;
  padding: 0.75rem 0;
  cursor: pointer;
  margin: 2rem auto;
  height: 3.75rem;

  &:active,
  &:focus {
    outline: none;
  }
  @media (min-width: ${MOBILE_WIDTH}px) {
    max-width: 14rem;
  }
`;

export const LogInPrompt = styled(Link)`
  font-size: 1.25rem;
  color: ${colors.heliotrope};
  cursor: pointer;
  font-weight: 900;
  text-decoration: underline;

  &:hover,
  &:active,
  &:focus {
    color: ${colors.heliotrope};
    text-decoration: underline;
  }
`;
