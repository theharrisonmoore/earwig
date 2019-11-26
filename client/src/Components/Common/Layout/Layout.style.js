import styled from "styled-components";
import { colors, breakpoints } from "../../../theme";

export const Wrapper = styled.div`
  background-color: ${colors.dustyGray2}26;
  display: flex;
  flex-direction: ${({ position }) =>
    position === "right" ? "row-reverse" : "left"};
  min-height: 100vh;
`;

export const CenterContent = styled.main`
  // max-width: 57.5rem;
  width: 100%;
  background-color: ${colors.white};
  margin: 0 auto;
`;

export const SideContent = styled.main`
  background-color: ${colors.white};
  min-height: 100vh;

  width: 100%;

  @media ${breakpoints.tablet} {
    width: 50%;
  }
`;
