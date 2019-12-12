import React from "react";
import styled from "styled-components";
import { colors, breakpointsMax, breakpoints } from "../../theme";

export const Cancel = styled.p`
  position: absolute;
  top: 1rem;
  font-size: 1.125rem;
  text-align: left;
  font-weight: 700;
  cursor: pointer;
  text-decoration: none;
  left: 7px;

  color: ${({ cancelColor }) => cancelColor || colors.primary};

  @media ${breakpoints.tablet} {
    left: calc(50% + 10px);
  }
`;

const CancelLink = ({ history, cancelColor, CancelText, customAction }) => {
  return (
    <Cancel onClick={customAction || history.goBack} cancelColor={cancelColor}>
      {CancelText || "Cancel"}
    </Cancel>
  );
};

export default CancelLink;
