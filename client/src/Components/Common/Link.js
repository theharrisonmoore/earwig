import React from "react";

import styled, { css } from "styled-components";

import { Link as ReactLink } from "react-router-dom";

import { colors } from "../../theme";

const sharedStyles = css`
  font-size: 1.125rem;
  font-weight: bold;
  text-decoration: none;
  text-align: ${props => props.align};
  margin: ${props => props.margin};

  &:hover,
  &:active {
    color: ${colors.primary};
  }
`;

const primaryStyles = css`
  display: block;
  color: ${colors.primary};
`;

const plainStyles = css`
  color: ${props => props.color || colors.profileFontColor};
  font-weight: normal;
  text-decoration: underline;
  font-size: 15px;

  &:hover,
  &:active {
    color: ${colors.profileFontColor};
    text-decoration: underline;
  }
`;

const orgColored = css`
  display: block;
  color: ${({ color }) => color};
`;

const LinkElement = styled(ReactLink)`
  ${sharedStyles}
  ${props => props.type === "primary" && primaryStyles}
  ${props => props.type === "plain" && plainStyles}
  ${props => props.type === "colored" && orgColored}
`;
/**
 * @example <Link to="/landing" type="primary" text="Sign out" />
 */

const Link = ({ disabled, color, type, text, to, align, margin, ...rest }) => {
  return (
    <>
      <LinkElement
        disabled={disabled}
        color={color}
        type={type}
        {...rest}
        to={to}
        align={align}
      >
        {text}
      </LinkElement>
    </>
  );
};

export default Link;
