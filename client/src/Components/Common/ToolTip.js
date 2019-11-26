import React from "react";
import styled from "styled-components";

import Icon from "./Icon/Icon";

import { colors } from "../../theme";

export const ToolTipWrapper = styled.div`
  display: flex;
  padding: 0.5rem 0;
`;

export const Text = styled.p`
  margin: 0;
  font-weight: bold;
  font-style: normal;
  font-size: 1.125rem;
  color: ${({ color }) => color || colors.primary};
`;

export default function ToolTip({ text, icon }) {
  return (
    <ToolTipWrapper>
      <div>
        <Icon
          icon={icon}
          width="23"
          height="23"
          margin="0 0.5rem 0 0"
          color={colors.primary}
        />
      </div>
      <Text>{text}</Text>
    </ToolTipWrapper>
  );
}
