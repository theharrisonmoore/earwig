import styled from "styled-components";

import { colors, shadows, breakpoints } from "./../../../theme";

import { MOBILE_WIDTH } from "./../../../constants/screenWidths";

export const Wrapper = styled.div``;

export const BorderedWrapper = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 3rem 0;
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

export const Button = styled.button`
  color: ${colors.white};
  border: none;
  box-shadow: ${shadows.buttonShadow};
  border-radius: 3px;
  width: 100%;

  font-weight: 900;
  font-size: 1.125rem;
  background-color: ${colors.heliotrope};
  outline: none;
  display: block;
  padding: 0.75rem 0;
  cursor: pointer;
  margin: 2rem auto;

  &:active {
    box-shadow: none;
  }

  &:active,
  &:focus {
    outline: none;
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

export const DeleteButton = styled(Button)`
  margin: 0rem auto;

  :hover,
  :active {
    color: ${colors.red};
  }
`;
