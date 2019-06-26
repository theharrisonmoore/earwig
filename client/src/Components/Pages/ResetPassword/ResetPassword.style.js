import styled from "styled-components";

import { colors, shadows, breakpoints } from "../../../theme";

import { Button as AntdButton } from "antd";

export const ContentWrapper = styled.div`
  width: 100%;
  max-width: 25rem;
  margin: 0 auto;
  padding: 0rem 1rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & .paragraph {
    color: red;
    display: block;
    color: ${colors.profileFontColor};
    font-size: 1.25rem;
  }
`;

export const Banner = styled.div`
  width: 100%;
  color: ${colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: capitalize;
  position: fixed;
  z-index: 2;
  background-color: ${colors.white};
  box-shadow: ${shadows.headerShadow};
  border-bottom: 1px solid ${colors.lightGray};
  width: 100%;
  height: 11vh;
  min-height: 8vh;

  p {
    margin-bottom: 0;

    span {
      font-weight: 700;
    }
  }
`;

export const BannerTitle = styled.p`
  font-size: 1.125rem;
  font-weight: 900;
`;

export const Cancel = styled.p`
  font-size: 1.125rem;
  font-weight: 700;
  position: absolute;
  left: 7px;
  cursor: pointer;
  color: ${colors.heliotrope};
`;

export const Description = styled.p`
  /* font-family: Lato; */
  font-size: 20px;
  text-align: left;
  color: #4a4a4a;

  @media ${breakpoints.tablet} {
    font-size: 28px;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
`;

export const BlankDiv = styled.div`
  width: 0%;
  background-color: ${colors.heliotrope};

  @media ${breakpoints.tablet} {
    width: 50%;
  }
`;

export const Button = styled(AntdButton)`
  color: ${colors.white};
  border: none;
  background-color: ${colors.heliotrope} !important;
  text-transform: none;

  border-radius: 5px;
  padding: 1rem;
  height: 3.5rem;
  font-size: 1.25rem;
  box-shadow: ${shadows.buttonShadow};
  outline: none;
  font-weight: 900;
  margin-bottom: 1.25rem;
  cursor: pointer;

  &:active,
  &:focus,
  &:hover {
    outline: none;
    box-shadow: none;
    color: ${colors.white};
  }

  ${({ left }) => (left ? "margin-left: auto;" : "")}
`;
