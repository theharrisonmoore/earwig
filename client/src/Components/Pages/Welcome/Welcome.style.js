import styled from "styled-components";

import backgroundDesktop from "../../../assets/welcome_page_image_desktop.jpg";
import backgroundMobile from "../../../assets/welcome_page_image_mobile.jpg";
import earwigLogoWhite from "../../../assets/earwig-logo-white.png";
import downwardArrow from "../../../assets/downward-arrow.svg";

import { colors, shadows, breakpoints } from "../../../theme";

export const Wrapper = styled.div`
  font-family: Roboto;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  overflow: auto;
  top: 0;
  display: flex;
  justify-content: center;
`;

export const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  background-image: url(${backgroundMobile});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;

  @media ${breakpoints.mobileXL} {
    background-image: url(${backgroundDesktop});
  }
`;

export const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  max-width: 33rem;
  margin-top: 1rem;
`;

export const Header = styled.header`
  padding-top: 1rem;
  width: 95%;
  // desktop
  @media ${breakpoints.mobileXL} {
    padding-top: 2rem;
  }
`;

export const Title = styled.h1`
  font-size: 50px;
  font-weight: 500;
  color: ${colors.white};
  margin: 0;
  margin-bottom: 1.5rem;
`;

export const SubtitleWrapper = styled.section`
  width: 85%;
  margin-top: -0.5rem;
  padding-bottom: 1rem;

  // desktop
  @media ${breakpoints.mobileXL} {
    width: 95%;
  }
`;

export const FooterTitle = styled.section`
  position: absolute;
  bottom: 1.5rem;
  width: 100%;
  height: calc(100vh - 82%);
  width: 75%;

  // desktop
  @media ${breakpoints.mobileXL} {
    width: 95%;
  }
`;

export const Subtitle = styled.h2`
  font-size: 25px;
  font-weight: 500;
  color: ${colors.white};
  max-width: 500px;
  margin: 0 auto;
`;

export const LogoContainer = styled.div`
  padding-top: 4rem;

  // desktop
  @media ${breakpoints.mobileXL} {
    padding-top: 6rem;
  }
`;

export const Logo = styled.img`
  content: url(${earwigLogoWhite});
  min-width: 2.5rem;
  max-width: 7.5rem;

  // desktop
  @media ${breakpoints.mobileXL} {
    min-width: 6.5rem;
    max-width: 11.5rem;
  }
`;

export const DownArrow = styled.img`
  content: url(${downwardArrow});
  min-width: 0.5rem;
  max-width: 0.5rem;
  margin-top: -0.5rem;
`;

export const ButtonsWrapper = styled.div`
  width: 100%;
  height: 50px;

  // desktop
  @media ${breakpoints.mobileXL} {
    max-width: 30rem;
    height: 75px;
  }
`;

export const Button = styled.button`
  font-size: 0.9rem;
  color: ${colors.white};
  border: none;
  background-color: ${({ backgroundColor }) =>
    backgroundColor || colors.primary};
  box-shadow: ${shadows.buttonShadow};
  width: calc(100% / 4);
  height: 100%;
  float: left;
  outline: none;
  cursor: pointer;

  &:active {
    box-shadow: none;
  }

  ::after {
    content: "";
    display: block;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    background: ${colors.btnClick};
    box-shadow: none;
    border-radius: 300px;
  }

  &:active,
  &:focus {
    outline: none;
  }

  &:hover {
    opacity: 0.9;
  }

  // desktop
  @media ${breakpoints.mobileXL} {
    font-size: 15px;
  }
`;
