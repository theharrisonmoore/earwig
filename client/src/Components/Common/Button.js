import React from "react";

import styled from "styled-components";

import { colors, shadows } from "../../theme";
import { ButtonSpinner } from "./AntdComponents/Loading";

const ButtonElement = styled.button`
  color: ${colors.white};
  border: none;
  box-shadow: ${shadows.buttonShadow};
  border-radius: 300px;
  /* width: ${props => props.width || "100%"}; */
  min-height: 45px;
  font-weight: bold;
  font-size: 1.125rem;
  background-color: ${({ backgroundColor }) =>
    backgroundColor || colors.primary};
  outline: none;
  display: block;
  padding: 0 1rem;
  cursor: pointer;
  margin: ${props => props.margin || "2rem auto"};
  position: relative;

  &:active {
    box-shadow: none;

    ::after {
    content: "";
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    background: ${colors.btnClick};
    box-shadow: none;
    }
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
    alignContent ? "display: flex; align-items: center; " : ""}

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
