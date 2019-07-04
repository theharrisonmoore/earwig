import styled from "styled-components";

import { colors, organizations } from "./../../../theme";
import { MOBILE_WIDTH } from "./../../../constants/screenWidths";

export const Banner = styled.div`
  background: ${props => organizations[`${props.category}`].primary};
  width: 100%;
  height: 4rem;
  color: ${colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: capitalize;
  position: fixed;
  z-index: 2;
  padding: 1rem 2rem;

  p {
    margin-bottom: 0;

    span {
      font-weight: 700;
    }
  }

  @media (max-width: ${MOBILE_WIDTH}px) {
    height: 3rem;
  }
`;

export const Cancel = styled.p`
  font-size: 1.125rem;
  font-weight: 700;
  position: absolute;
  left: 16px;
  cursor: pointer;
  text-decoration: underline;

  @media (max-width: ${MOBILE_WIDTH}px) {
    left: 8px;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  max-width: 30rem;
  margin: 0 auto;
  padding: 6rem 1.5rem;

  @media (max-width: ${MOBILE_WIDTH}px) {
    padding-top: 5rem;
  }
`;

export const CommentsWrapper = styled.div`
  padding-bottom: 40vh;
`;

export const IndividComment = styled.div`
  display: flex;
  flex-direction: column;
  flex: initial;
  justify-content: flex-start;
  margin-bottom: 1rem;
  position: relative;
  padding-bottom: 2rem;
  align-items: flex-start;
`;

export const ReplyWrapper = styled.div`
  text-align: left;
  position: fixed;
  width: 70%;
  bottom: 0;
  background: white;
  padding: 2rem 4rem;
  margin: 0 auto;
  left: 0;
  right: 0;
  height: 40vh;
  border-top: 2px ${colors.ghostGray} solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: ${MOBILE_WIDTH}px) {
    width: 90%;
    padding: 2rem 0;
  }
`;

export const StyledButton = styled.button`
  text-decoration: none;
  border: none;
  padding: 1rem;
  background-color: ${props => organizations[props.category].primary};
  cursor: pointer;
  width: 100%;
  max-width: 30rem;
  color: ${colors.white};
  border-radius: 4px;
  position: relative;
  font-size: 1.125rem;
  font-weight: 500;

  &:hover::after {
    content: "";
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    background: rgba(255, 255, 255, 0.08);
    box-shadow: none;
  }

  &:active::after {
    content: "";
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    background: ${colors.ghostGray};
    box-shadow: none;
  }
`;
