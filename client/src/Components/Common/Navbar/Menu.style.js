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
  width: ${props =>
    props.width > 769 ? `${props.width * 0.25}px` : `${props.width}px`};
  padding-top: 4rem;
  z-index: 3;

  .active {
    color: ${colors.green};
  }
`;

export const MenuItem = styled(NavLink)`
  display: flex;
  text-decoration: none;
  border-bottom: ${colors.gray2} 1px solid;
  color: ${props =>
    props.activeClassName === "active" ? colors.green : colors.black};
  padding: 0.5rem;
  transition: all ease-in 0.2s;
  height: 4.5rem;
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
