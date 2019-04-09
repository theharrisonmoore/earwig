import styled from "styled-components";
import { NavLink } from "react-router-dom";

import { colors } from "./../../../theme";

export const Wrapper = styled.div`
  height: 100%;
  position: fixed;
  background: ${colors.white};
  display: flex;
  padding: 1rem;
  flex-direction: column;
  top: 0;
  right: 0rem;
  width: ${props => `${props.width * 0.25}px`};
  padding-top: 4rem;
`;

export const MenuItem = styled(NavLink)`
  display: flex;
  text-decoration: none;
  border-bottom: ${colors.gray1} 1px solid;
  color: ${colors.black};
  padding: 0.5rem;
  transition: all ease-in 0.2s;
  height: 4rem;
  align-items: center;
  text-align: left;

  .menuIcon {
    margin-right: 1rem;
  }

  :hover {
    color: ${colors.green};
    text-decoration: none;
  }
`;
