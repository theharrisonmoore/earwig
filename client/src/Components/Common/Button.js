import React from "react";

import styled from "styled-components";

import { colors, shadows } from "../../theme";
import { ButtonSpinner } from "./AntdComponents/Loading";

const ButtonElement = styled.button`
  color: ${colors.white};
  border: none;
  box-shadow: ${shadows.buttonShadow};
  border-radius: 3px;
  width: 100%;

  font-weight: 900;
  font-size: 1.125rem;
  background-color: ${({ backgroundColor }) =>
    backgroundColor || colors.heliotrope};
  outline: none;
  display: block;
  padding: 0.75rem 0;
  cursor: pointer;
  margin: ${props => props.margin || "2rem auto"};

  &:active {
    box-shadow: none;
  }

  &:active,
  &:focus {
    outline: none;
  }

  &:hover {
    opacity: 0.9;
  }

  ${({ danger }) =>
    danger &&
    `
    :hover,
    :active {
      color: ${colors.red};
    }
`}

  ${({ alignContent }) =>
    alignContent
      ? "display: flex; align-items: center; padding-left: 1.5rem;"
      : ""}

  ${({ left }) => (left ? "margin-left: auto;" : "")}
`;
/**
 * @example <Button loading={loading} onClick={this.handleSubmit} spinnerColor="red">
              Send
            </Button>
 */

const Button = ({
  loading,
  children,
  spinnerColor,
  backgroundColor,
  danger,
  left,
  ...rest
}) => {
  return (
    <>
      <ButtonElement
        disabled={loading}
        danger={danger}
        backgroundColor={backgroundColor}
        left={left}
        {...rest}
      >
        {loading && <ButtonSpinner color={spinnerColor} />}
        {children}
      </ButtonElement>
    </>
  );
};

export default Button;
