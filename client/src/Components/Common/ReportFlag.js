import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import Icon from "./Icon/Icon";

import { colors } from "../../theme";

const StyledLink = styled(Link)`
  width: 10%;
  margin: 0 0 0 auto;
`;

export default ({ left, to, ...rest }) => {
  return (
    <StyledLink to={to} left={left} {...rest}>
      <Icon icon="flag" fill={colors.gray} width="27" height="27" />
    </StyledLink>
  );
};
