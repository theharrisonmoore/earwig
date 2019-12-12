import React from "react";
import styled from "styled-components";
import { colors, breakpointsMax } from "../../theme";

export const Cancel = styled.p`
  position: absolute;
  left: calc(50% + 10px);
  top: 1rem;
  font-size: 1.125rem;
  text-align: left;
  font-weight: 700;
  cursor: pointer;
  text-decoration: none;

  color: ${({ cancelColor }) => cancelColor || colors.primary};

  @media ${breakpointsMax.tablet} {
    left: calc(49%);
  }

  @media ${breakpointsMax.mobileXL} {
    font-size: 1rem;
    left: 7px;
  }

  @media ${breakpointsMax.mobileS} {
    /* margin-left: 0.4rem; */
    font-size: 0.9rem;
    left: 7px;
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
