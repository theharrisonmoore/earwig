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
  font-size: 1rem;

  &:hover,
  &:active {
    color: ${colors.profileFontColor};
    text-decoration: underline;
  }
`;

const LinkElement = styled(ReactLink)`
  ${sharedStyles}
  ${props => props.type === "primary" && primaryStyles}
  ${props => props.type === "plain" && plainStyles}
`;
/**
 * @example <Link to="/landing" styleType="primary" text="Sign out" />
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
