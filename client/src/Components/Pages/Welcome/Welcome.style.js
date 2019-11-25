import styled from "styled-components";

import backgroundDesktop from "../../../assets/welcome_page_image_desktop.jpg";
import backgroundMobile from "../../../assets/welcome_page_image_mobile.jpg";

import earwigLogoWhite from "../../../assets/earwig-logo-white.png";

import { colors, breakpoints } from "../../../theme";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  overflow: scroll;
  position: absolute;
  top: 0;
  justify-content: center;
`;

export const ContentWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  max-width: 30rem;
  justify-content: center;

  & .paragraph {
    display: block;
    color: ${colors.profileFontColor};
    font-size: 1.8rem;
  }
`;

export const Header = styled.header`
  margin: 0 auto;
  z-index: 1;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 6.5rem;

  @media ${breakpoints.tablet} {
    background-color: initial;
    padding-top: 7.5rem;
  }
`;

export const Title = styled.h1`
  // max-width: 300px;
  font-size: 2rem;
  font-weight: 700;
  line-height: 2.5rem;
  text-align: center;
  color: ${colors.white};
  margin-bottom: 1rem;
  margin: 0 auto;
`;

export const Subtitle = styled.h2`
  font-size: 1.5rem;
  color: ${colors.white};
  // margin-bottom: 2rem;
  text-align: center;
  // max-width: 14rem;
`;

export const Body = styled.div`
  width: 100%;
  background-image: url(${backgroundMobile});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;

  @media ${breakpoints.mobileXL} {
    background-image: url(${backgroundDesktop});
  }
`;

export const LogoContainer = styled.div`
  padding-top: 6rem;
`;

export const Logo = styled.img`
  content: url(${earwigLogoWhite});
  vertical-align: middle;
  border-style: none;
  min-width: 10.5rem;
  max-width: 15.5rem;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  // padding-bottom: 5rem;

  div {
    display: flex;
    justify-content: space-around;
    margin: 0 auto;
    // max-width: 25rem;
    // border: 2px solid red;
    width: 100%;
  }
`;
