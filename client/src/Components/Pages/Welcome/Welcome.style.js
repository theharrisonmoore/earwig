import styled from "styled-components";

import { colors, breakpoints } from "../../../theme";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  overflow: scroll;
  position: absolute;
  top: 0;
`;

export const Title = styled.h1`
  margin-top: 6rem;
  max-width: 300px;
  font-size: 2rem;
  font-weight: 400;
  line-height: 2.5rem;
  text-align: center;
  color: ${colors.white};
  margin-bottom: 1rem;
  margin: 0 auto;

  @media ${breakpoints.tablet} {
    color: ${colors.heliotrope};
  }
`;

export const Subtitle = styled.h2`
  font-size: 1.75rem;
  color: ${colors.heliotrope};
  margin-bottom: 2rem;
  text-align: center;
  max-width: 14rem;
`;

export const ContentWrapper = styled.div`
  position: relative;
  width: 100%;
  /* max-width: 25rem; */
  padding: 1rem;
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
  padding: 6.5rem 1rem 2.5rem;
  z-index: 1;
  position: relative;
  margin: 0 auto;

  background-color: ${colors.heliotrope};

  @media ${breakpoints.tablet} {
    background-color: initial;
    padding: 12.5rem 1rem 0.5rem;
  }
`;

export const Body = styled.div`
  width: 100%;

  @media ${breakpoints.tablet} {
    width: 50%;
  }
`;

export const ButtonsWrpper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 5rem;

  div {
    display: flex;
    justify-content: space-around;
    margin: 0 auto;
    max-width: 25rem;
    width: 100%;
  }
`;
