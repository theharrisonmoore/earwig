import styled from "styled-components";
import { Link } from "react-router-dom";

import { colors, shadows } from "../../../theme";

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
