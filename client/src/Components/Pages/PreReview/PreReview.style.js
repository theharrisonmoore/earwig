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
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: ${({ category }) =>
    (organizations[category] && organizations[category].primary) || "#FFF"};

  @media ${breakpoints.tablet} {
    padding: 4.5rem 1rem 2.5rem;
    text-align: center;
  }
`;

export const Title = styled.h1`
  max-width: 250px;
  font-size: 1.125rem;
  font-weight: bold;
  color: ${colors.white};
  margin: 1rem auto 1rem auto;
  text-align: center;
`;

export const SubTitile = styled.p`
  font-size: 1rem;
  color: ${colors.white};
  max-width: 400px;
  text-align: center;
  margin-bottom: 0;
`;

export const Content = styled.div`
  margin: 0rem auto;
  padding-bottom: 4rem;

  @media ${breakpoints.tablet} {
    margin: 1rem auto;
  }
`;
