import styled from "styled-components";

import { colors, borders, shadows } from "./../../../theme";

export const Wrapper = styled.div`
  display: flex;
  position: fixed;
  height: ${props => props.height};
  border-bottom: 1px solid ${colors.gray2};
  padding: 0.5rem;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  background: ${colors.white};
`;

export const WrapperH2 = styled.h2`
  margin: 0;
  font-size: 1rem;
  margin-right: 0.5rem;
`;

export const SideDiv = styled.div`
  width: 25%;
  display: flex;
  justify-content: ${props => props.position};
  align-items: center;
`;

export const Icon = styled.img`
  cursor: pointer;
  height: 1.5rem;
`;

export const LogoIcon = styled.img`
  cursor: pointer;
  height: 2rem;
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

export const NavInput = styled.input`
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  padding-left: 2.5rem;
  border: none;
`;

export const NavSearchIcon = styled.img`
  position: absolute;
  left: 0.5rem;
  top: 0.5rem;
`;

export const ToggleMenu = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  z-index: 4;
  min-width: 5.25rem;
  justify-content: flex-end;
`;
