import React from "react";

import styled, { css } from "styled-components";

import { colors, shadows } from "../../theme";
import { ButtonSpinner } from "./AntdComponents/Loading";
import Icon from "./Icon/Icon";

const sharedStyles = css`
  border-radius: 300px;
  /* width: ${props => props.width || "100%"}; */
  min-height: 45px;
  font-weight: bold;
  font-size: 1.125rem;
  outline: none;
  display: block;
  padding: 0 1rem;
  cursor: pointer;
  margin: ${props => props.margin || "2rem auto"};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  background: none;

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
      border: 1px solid ${colors.red};
    }
`}

  ${({ alignContent }) =>
    alignContent ? "display: flex; align-items: center; " : ""}

  ${({ left }) => (left ? "margin-left: auto;" : "")}
`;

const primaryStyles = css`
  color: ${colors.white};
  border: none;
  background-color: ${({ backgroundColor }) =>
    backgroundColor || colors.primary};
  box-shadow: ${shadows.buttonShadow};
`;

const secondaryStyles = css`
  color: ${colors.primary};
  border: 1px solid ${colors.primary};
  background-color: ${({ backgroundColor }) => backgroundColor || colors.white};

  &:active {
    ::after {
      left: -1px;
      top: -1px;
      width: calc(100% + 2px);
      height: calc(100% + 2px);
    }
  }
`;

const linkStyles = css`
  color: ${colors.primary};
  outline: none;
  border: none;
  display: inline;
  text-align: left;
  padding-left: 0;
`;

const ButtonElement = styled.button`
  ${sharedStyles}
  ${props => props.styleType === "primary" && primaryStyles}
  ${props => props.styleType === "secondary" && secondaryStyles}
  ${props => props.styleType === "link" && linkStyles}
`;
/**
 * @example <Button loading={loading} onClick={this.handleSubmit} spinnerColor="red" styleType="primary">
              Send
            </Button>
 */

const Button = ({
  loading,
  text,
  spinnerColor,
  backgroundColor,
  danger,
  left,
  styleType,
  icon,
  ...rest
}) => {
  return (
    <>
      <ButtonElement
        disabled={loading}
        danger={danger}
        backgroundColor={backgroundColor}
        left={left}
        styleType={styleType}
        {...rest}
      >
        <span style={{ display: "flex", alignItems: "center" }}>
          {loading ? (
            <ButtonSpinner color={spinnerColor} />
          ) : (
            icon && (
              <Icon icon={icon} width="23" height="23" margin="0 0.5rem 0 0" />
            )
          )}
          {text}
        </span>
      </ButtonElement>
    </>
  );
};

export default Button;
