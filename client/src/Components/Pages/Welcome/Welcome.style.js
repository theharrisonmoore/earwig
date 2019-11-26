import styled from "styled-components";

import backgroundDesktop from "../../../assets/welcome_page_image_desktop.jpg";
import backgroundMobile from "../../../assets/welcome_page_image_mobile.jpg";
import earwigLogoWhite from "../../../assets/earwig-logo-white.png";
import downwardArrow from "../../../assets/downward-arrow.svg";

import { colors, breakpoints } from "../../../theme";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  overflow: scroll;
  top: 0;
  justify-content: center;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  max-width: 33rem;
  justify-content: center;
`;

export const Header = styled.header`
  padding-top: 2.5rem;

  @media ${breakpoints.tablet} {
    padding-top: 3.5rem;
  }
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${colors.white};
`;

export const SubtitleWrapper = styled.section`
  padding-top: 0.5rem;

  @media ${breakpoints.tablet} {
    padding-top: 1rem;
  }
`;

export const FooterTitle = styled.section`
  padding-top: 4rem;

  @media ${breakpoints.tablet} {
    padding-top: 16rem;
  }
`;

export const Subtitle = styled.h2`
  font-size: 1rem;
  font-weight: 400;
  color: ${colors.white};
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
  min-width: 10.5rem;
  max-width: 15.5rem;
`;

export const DownArrow = styled.img`
  content: url(${downwardArrow});
  min-width: 0.5rem;
  max-width: 0.5rem;
  margin-top: -0.5rem;
`;

export const ButtonsWrapper = styled.div`
  max-width: 35rem;
  margin-top: 1rem;

  div {
    display: flex;
    justify-content: space-around;
  }
`;
