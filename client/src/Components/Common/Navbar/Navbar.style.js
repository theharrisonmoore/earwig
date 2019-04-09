import styled from "styled-components";
import { NavLink } from "react-router-dom";

import { colors } from "./../../../theme";

export const Wrapper = styled.div`
  display: flex;
  position: fixed;
  height: 4.4rem;
  border-bottom: 1px solid ${colors.gray2};
  padding: 0.8rem;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  background: ${colors.white};
`;

export const Icon = styled.img`
  cursor: pointer;
`;
