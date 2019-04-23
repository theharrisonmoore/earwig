import React from "react";

import styled, { css } from "styled-components";

import LogoutLogin from "./LogoutLogin";

const iconStyles = props => css`
  width: ${props.width || "100%"};
  height: ${props.height || "100%"};
  color: ${props.color};
`;

const iconMap = {
  logoutLogin: LogoutLogin
};

const styledIconMap = Object.keys(iconMap).reduce((accum, curr) => {
  const IconSvg = iconMap[curr];

  if (!IconSvg) {
    throw new Error(`Icon ${curr} not found`);
  }

  accum[curr] = styled(IconSvg)(iconStyles);
  return accum;
}, {});

const Icon = props => {
  if (!iconMap[props.icon]) {
    console.warn(`<Icon /> called with invalid icon prop "${props.icon}"`);
    return null;
  }
  console.log("styledIconMap", styledIconMap);
  const StyledIcon = styledIconMap[props.icon];

  console.log("styledicon", StyledIcon);

  return <StyledIcon {...props} />;
};

export default Icon;
