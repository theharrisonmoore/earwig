import styled from "styled-components";
import { Link } from "react-router-dom";

import { colors, shadows } from "./../../../theme";

import { MOBILE_WIDTH } from "./../../../constants/screenWidths";

export const Wrapper = styled.div`
  padding: 2rem;
  max-width: 45rem;
  margin: 0 auto;
`;

export const Title = styled.h1`
  font-size: 1.125rem;
  font-weight: 900;
  color: ${colors.profileFontColor};
  margin-bottom: 1rem;

  @media (min-width: ${MOBILE_WIDTH}px) {
    font-size: 2.75rem;
    padding-top: 3rem;
  }
`;

export const Paragraph = styled.p`
  text-align: left;
  font-style: italic;
  color: ${colors.lightGray};
  margin-bottom: 2rem;
  font-size: 1rem;

  @media (min-width: ${MOBILE_WIDTH}px) {
    margin: 4rem auto;
  }
`;

export const Button = styled.button`
  background: ${colors.white};
  border: 1px solid ${props => (props.error ? colors.red : colors.mineShaft2)};
  box-shadow: ${shadows.buttonShadow};
  border-radius: 3px;
  width: 100%;

  font-weight: 900;
  font-size: 1.125rem;
  color: ${colors.profileFontColor};
  outline: none;
  display: block;
  padding: 0.75rem 0;
  cursor: pointer;
  margin: 2rem auto;

  &:active,
  &:focus {
    outline: none;
  }
  @media (min-width: ${MOBILE_WIDTH}px) {
    max-width: 14rem;
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

export const CancelLink = styled(Link)`
  color: ${colors.profileFontColor};
  font-weight: 900;
  font-size: 1.125rem;
  text-decoration: underline;

  :hover {
    color: ${colors.profileFontColor};
    text-decoration: underline;
  }
`;

export const DeleteButton = styled(Button)`
  margin-top: 6rem;

  :hover,
  :active {
    color: ${colors.red};
  }

  @media (min-width: ${MOBILE_WIDTH}px) {
    max-width: 20rem;
  }
`;
