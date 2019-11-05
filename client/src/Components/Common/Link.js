import React from "react";

import styled, { css } from "styled-components";

import { Link as ReactLink } from "react-router-dom";

import { colors } from "../../theme";

const sharedStyles = css`
  display: block;
  font-size: 1.125rem;
  font-weight: bold;
  text-decoration: none;
  text-align: ${props => props.align};

  &:hover,
  &:active {
    color: ${colors.primary};
  }
`;

const primaryStyles = css`
  color: ${colors.primary};
`;

const LinkElement = styled(ReactLink)`
  ${sharedStyles}
  ${props => props.type === "primary" && primaryStyles}
`;
/**
 * @example <Link to="/landing" styleType="primary" text="Sign out" />
 */

const Link = ({ disabled, color, type, text, to, align, ...rest }) => {
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
