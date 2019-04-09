import styled from "styled-components";
import { NavLink } from "react-router-dom";

import { colors } from "./../../../theme";

export const Wrapper = styled.div`
  height: 100%;
  position: fixed;
  background: ${colors.white};
  display: flex;
  padding: 0.5rem;
  flex-direction: column;
  top: 0;
  right: 0rem;
  width: ${props => `${props.width * 0.2}px`};
  padding-top: 5rem;
`;
