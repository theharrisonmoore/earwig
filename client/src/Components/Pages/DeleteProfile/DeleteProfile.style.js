import styled from "styled-components";

import { colors, breakpoints } from "./../../../theme";

import { MOBILE_WIDTH } from "./../../../constants/screenWidths";

export const Wrapper = styled.div``;

export const BorderedWrapper = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 3rem 0;
  padding-top: 7rem;
  border: none;

  & > div {
    max-width: 400px;
    margin: 0 auto;
    width: 80%;
  }

  @media ${breakpoints.tablet} {
    border-left: 3px solid ${colors.heliotrope};
    border-right: 3px solid ${colors.heliotrope};
  }
`;

export const Title = styled.h1`
  font-size: 2.125rem;
  font-weight: 500;
  color: ${colors.profileFontColor};
  margin-bottom: 2rem;
  text-align: left;
`;

export const Paragraph = styled.p`
  text-align: left;
  font-style: italic;
  color: ${colors.profileFontColor};
  margin-bottom: 2rem;
  font-size: 1rem;

  @media (min-width: ${MOBILE_WIDTH}px) {
    margin: 4rem auto;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  max-width: 40rem;
  height: 10rem;
  border: 1px solid ${colors.inputBorder};
  border-radius: 5px;
  outline: none;
  padding: 1rem;
`;
