import React from "react";
import styled from "styled-components";

import { colors, shadows } from "./../../theme";

const NavbarWrapper = styled.div`
  width: 100%;
  color: ${colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: capitalize;
  position: fixed;
  z-index: 2;
  background-color: ${colors.white};
  box-shadow: ${shadows.headerShadow};
  border-bottom: 1px solid ${colors.lightGray};
  width: 100%;
  height: 11vh;
  min-height: 8vh;

  & + * {
    padding-top: 11vh;
  }

  p {
    margin-bottom: 0;

    span {
      font-weight: 700;
    }
  }
`;

const NavbarTitle = styled.p`
  font-size: 1.125rem;
  font-weight: 900;
  color: ${({ titleColor }) => (titleColor ? titleColor : colors.white)};
`;

const Cancel = styled.p`
  font-size: 1.125rem;
  font-weight: 700;
  position: absolute;
  left: 7px;
  cursor: pointer;

  color: ${({ cancelColor }) =>
    cancelColor ? cancelColor : colors.heliotrope};
`;

const CancelNavbar = ({
  history,
  backgroundColor,
  title,
  titleColor,
  cancelColor
}) => {
  return (
    <NavbarWrapper>
      <Cancel onClick={history.goBack} cancelColor={cancelColor}>
        Cancel
      </Cancel>
      <NavbarTitle titleColor={titleColor}>{title}</NavbarTitle>
    </NavbarWrapper>
  );
};

export default CancelNavbar;
