import styled from "styled-components";
import { colors } from "../../theme";

export const HeadlineDiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  padding-top: 5rem;
  color: ${colors.profileFontColor};
  h2 {
    font-size: 2rem;
    font-weight: 300;
    line-height: 2.5rem;
  }
  p {
    font-style: italic;
    font-size: 1rem;
  }
`;

export const H2 = styled.h2`
  font-size: 2rem;
  opacity: 0.7;
  margin-bottom: 0;
  max-width: 22rem;
`;

export const MainDiv = styled.div`
  /* flex-grow: 1;
  flex-shrink: 0; */
  width: 90%;
  margin: 0 auto;
`;

export const AddWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* height: 100%; */
  padding: 0;
  margin: 0;
  align-items: center;
  padding-top: 4rem;
`;

export const ButtonsWrpper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  div {
    display: flex;
    justify-content: space-around;
    margin: 0 auto;
    max-width: 25rem;
    width: 100%;
  }
`;

export const LogosContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;
