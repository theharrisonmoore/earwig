import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import Icon from "./Icon/Icon";

import { colors } from "../../theme";

const StyledLink = styled(Link)`
${({ left }) => (left ? "left" : "right")}: 0;
  width: 10%;
  position: absolute
  top: 50%
  transform: translateY(-50%)
`;

export default ({ left, to, ...rest }) => {
  return (
    <StyledLink
      // TODO : use path query string
      to={to}
      {...rest}
    >
      <Icon icon="flag" fill={colors.gray} width="27" height="27" />
    </StyledLink>
  );
};
