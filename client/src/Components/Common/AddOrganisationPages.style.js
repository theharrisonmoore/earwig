import styled from "styled-components";
import { Link } from "react-router-dom";

import { colors } from "../../theme";

export const HeadlineDiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  padding-top: 5rem;
  color: ${colors.dustyGray4};
  h2 {
    font-size: 18px;
    font-weight: bold;
    line-height: 1.5rem;
  }
  p {
    font-style: italic;
    font-size: 15px;
  }
`;

export const H2 = styled.h2`
  font-size: 24px;
  opacity: 0.7;
  max-width: 22rem;
  margin: 0 auto;
  color: ${colors.dustyGray4};
`;

export const SubHeading = styled.h4`
  font-size: 15px;
  color: ${colors.dustyGray3};
  ${margin => margin};
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

export const StyledLink = styled(Link)`
  color: ${colors.primary};
  font-weight: 500;
`;
