import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { organizations, breakpointsMax } from "../../../../theme";

export const HeaderWrapper = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  background-color: ${({ category }) => organizations[category].primary};
  width: 100%;
  display: flex;
  flex-direction: column;
  transition: 0.4s height;
  z-index: 1;
  max-width: 57.5rem;

  /* & + div {
    padding-top: ${({ shrink }) => (shrink ? "6rem" : "9rem")};
  } */
`;

export const SearchBarContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: ${({ shrink }) => (shrink ? "0 auto 1rem" : "0 auto 2rem")};
  max-width: 23.5rem;
  .react-autosuggest__input {
    margin-top: 1rem;
    border-radius: 5rem;
    border: none;
  }

  @media ${breakpointsMax.mobileXL} {
    padding: 0 1rem;
  }
`;

export const TabsWrapper = styled.div`
  max-width: 23.5rem;
  width: 100%;
  margin: 0 auto;
  display: flex;
`;

export const Tab = styled(({ isActive, ...rest }) => <Link {...rest} />)`
  font-family: Roboto;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 5.875rem;
  width: 25%;
  height: 2.75rem;
  font-size: 13px;
  line-height: 15px;
  text-align: center;
  letter-spacing: 0.216667px;
  color: #ffffff;
  box-shadow: ${({ isActive }) =>
    isActive ? "none" : "0px 2px 4px rgba(0, 0, 0, 0.5)"};
  font-weight: ${({ isActive }) => (isActive ? "bold" : "initial")};
  background-color: ${({ category }) => organizations[category].primary};

  :hover {
    color: #ffffff;
    font-weight: bold;
  }
`;

export const Heading = styled.h1`
  font-family: Roboto;
  font-size: ${({ shrink }) => (shrink ? "0px" : "52px")};

  line-height: ${({ shrink }) => (shrink ? "5px" : "61px")};
  text-align: center;
  letter-spacing: 0.631945px;
  color: #ffffff;
  transition: 0.4s all;
  margin-top: ${({ shrink }) => (shrink ? "0" : "1.75rem")};
  margin-bottom: ${({ shrink }) => (shrink ? "0.5rem" : "2rem")};
`;
