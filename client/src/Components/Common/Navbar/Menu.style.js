import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Icon from "./../Icon/Icon";

import { colors, shadows } from "./../../../theme";

export const Wrapper = styled.div`
  height: 100%;
  position: fixed;
  background: ${colors.white};
  display: flex;
  padding: 1rem;
  flex-direction: column;
  top: 0;
  right: 0rem;
  width: ${props => (props.isMobile ? `100%` : "25%")};
  padding-top: 4rem;
  z-index: 3;
  box-shadow: ${shadows.buttonShadow};

  .active {
    color: ${colors.green};
  }
`;

export const MenuItem = styled(NavLink)`
  display: flex;
  text-decoration: none;
  border-bottom: ${colors.lightGray} 1px solid;
  color: ${props =>
    props.activeClassName === "active"
      ? colors.green
      : colors.profileFontColor};
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

export const LogoutButton = styled.div`
  display: flex;
  text-decoration: none;
  border-bottom: ${colors.lightGray} 1px solid;
  color: ${props =>
    props.activeClassName === "active"
      ? colors.green
      : colors.profileFontColor};
  padding: 0.5rem;
  transition: all ease-in 0.2s;
  height: 4.5rem;
  align-items: center;
  text-align: left;
  cursor: pointer;

  .menuIcon {
    margin-right: 1rem;
  }

  :hover {
    color: ${colors.green};
    text-decoration: none;
  }
`;

export const MenuIcon = styled(Icon)`
  margin-right: 1rem;
`;
