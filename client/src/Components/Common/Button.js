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
  font-size: 15px;
  outline: none;
  display: block;
  padding: 0 2rem;
  cursor: ${props =>
    props.disabled || props.loading ? "not-allowed" : "pointer"};
  margin: ${props => props.margin || "2rem auto"};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width || "auto"};
  min-width: 108px;
  background: none;
  pointer-events: all !important;

  *{
    ${({ disabled }) => disabled && "pointer-events: none"}
  }

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
    border-radius: 300px;
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
  color: ${({ color }) => color || colors.primary};
  border: 1px solid ${({ color }) => color || colors.primary};
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
const dangerStyles = css`
  color: ${({ color }) => color || colors.white};
  border: 1px solid ${({ color }) => color || "#D0021B"};
  background-color: ${({ backgroundColor }) => backgroundColor || "#D0021B"};

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
  color: ${({ color }) => color || colors.primary};
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
  ${props => props.styleType === "danger" && dangerStyles}
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
  color,
  disabled,
  width,
  iconHeight,
  iconWidth,
  ...rest
}) => {
  return (
    <>
      <ButtonElement
        disabled={loading || disabled}
        danger={danger}
        backgroundColor={backgroundColor}
        left={left}
        styleType={styleType}
        color={color}
        width={width}
        {...rest}
      >
        <span style={{ display: "flex", alignItems: "center" }}>
          {loading ? (
            <ButtonSpinner color={spinnerColor} />
          ) : (
            icon && (
              <Icon
                icon={icon}
                width={iconWidth || "23"}
                height={iconHeight || "23"}
                margin="0 0.5rem 0 0"
                color={color}
              />
            )
          )}
          {text}
        </span>
      </ButtonElement>
    </>
  );
};

export default Button;
