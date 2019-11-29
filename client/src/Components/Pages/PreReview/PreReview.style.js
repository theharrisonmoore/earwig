import styled from "styled-components";

import { breakpoints, colors, organizations } from "../../../theme";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
`;

export const Body = styled.div`
  width: 100%;
`;

export const Header = styled.header`
  margin: 0 auto;
  padding: 2.5rem 1rem 2.5rem;
  z-index: 1;
  position: relative;
  margin: 0 auto;
  text-align: left;

  background-color: ${({ category }) => organizations[category].primary};

  @media ${breakpoints.tablet} {
    padding: 4.5rem 1rem 2.5rem;
    text-align: center;
  }
`;

export const Title = styled.h1`
  margin-top: 6rem;
  max-width: 450px;
  font-size: 2rem;
  font-weight: 400;
  line-height: 2.5rem;
  color: ${colors.white};
  margin-bottom: 1rem;
  margin: 0 auto;
`;

export const SubTitile = styled.p`
  font-size: 18px;
  color: ${colors.white};
  max-width: 450px;
  margin: 2rem auto 0;
`;

export const Content = styled.div`
  margin: 0rem auto;
  padding-bottom: 4rem;

  @media ${breakpoints.tablet} {
    margin: 1rem auto;
  }
`;
