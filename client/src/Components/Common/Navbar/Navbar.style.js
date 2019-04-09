import styled from "styled-components";
import { NavLink } from "react-router-dom";

import { colors } from "./../../../theme";

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

  h2 {
    margin: 0;
    font-size: 1rem;
  }
`;

export const Icon = styled.img`
  cursor: pointer;
  height: 1.5rem;
`;

export const NavSearch = styled.div`
  border: 2px solid #000000;
  box-sizing: border-box;
  color: ${colors.gray1};
  width: 60%;
  height: ${props => props.height};
  position: relative;

  input {
    width: 100%;
    height: 100%;
    padding: 0.5rem;
    padding-left: 2.5rem;
    border: none;
  }

  img {
    position: absolute;
    left: 0.5rem;
    top: 0.5rem;
  }
`;

export const ToggleMenu = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  z-index: 2;
  h2 {
    font-size: 1rem;
    height: 100%;
    margin: 0;
    margin-right: 0.5rem;
  }
`;
