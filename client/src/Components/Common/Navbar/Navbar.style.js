import styled from "styled-components";

import {
  colors,
  borders,
  shadows,
  breakpoints,
  breakpointsMax
} from "./../../../theme";

export const Wrapper = styled.div`
  display: flex;
  position: fixed;
  height: ${props => props.height};
  border-bottom: 1px solid ${colors.lightGray};
  padding: 0.5rem 1.25rem;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  background: ${colors.white};
  z-index: 1000;
  /* overflow-y: scroll; */
  top: 0;
  left: 0;
  /* @media ${breakpoints.tablet} {
    border-bottom: none;
  } */
`;

export const MenuWrapper = styled.div``;

export const WrapperH2 = styled.h2`
  margin: 0;
  font-size: 1rem;
  margin-right: 0.5rem;

  @media ${breakpointsMax.mobileS} {
    font-size: 0.9rem;
  }
`;

export const SideDiv = styled.div`
  width: 30%;
  display: flex;
  justify-content: ${props => props.position};
  align-items: center;
  margin: 0;
  cursor: pointer;
`;

export const Icon = styled.img`
  cursor: pointer;
  height: 1.5rem;
`;

export const NavSearch = styled.div`
  border: ${borders.searchBox};
  outline: none;
  background: ${colors.white};
  border-radius: 5px;
  box-sizing: border-box;
  box-shadow: ${shadows.searchShadow};
  color: ${colors.lightGray};
  width: 50%;
  height: ${props => props.height};
  position: relative;
  overflow: hidden;
`;

export const ToggleMenu = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  z-index: 4;
  min-width: 5.25rem;
  width: 100%;
  justify-content: ${props => props.position};
  padding-right: 1rem;
  margin-bottom: 1rem;
  padding-top: ${props => (props.isMobile ? "0.5rem" : "1rem")};
  min-height: 1rem;
`;
