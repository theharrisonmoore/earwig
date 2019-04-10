import styled from "styled-components";
import { Link } from "react-router-dom";

import { colors, shadows, organizations } from "./../../../theme";

export const Headline = styled.h1`
  color: ${colors.profileFontColor};
  font-size: 1.75rem;
  margin-top: 2rem;
`;

export const SearchWrapper = styled.div`
  width: 100%;
  max-width: 40rem;
  margin: 1rem auto;
  padding: 0 1rem;
  padding-top: 2rem;
  li {
    list-style-type: none;
  }
`;

export const SearchLegend = styled.div``;
export const Item = styled.div``;

export const SuggestionBox = styled.div`
  border: 0.5px solid ${colors.lightGray};
  box-shadow: ${colors.searchBoxShadow};
  color: ${props => organizations[props.orgType].primary};
`;

export const SuggestionInnerFrame = styled.div`
  display: flex;
  padding: 1rem 1rem 1rem 1rem;
`;

export const SymbolDiv = styled.div`
  display: flex;

  float: left;
  svg {
    margin-right: 1rem;
  }
`;

export const ArrowDiv = styled.div`
  display: flex;
  margin-left: auto;
  align-items: center;
  svg {
    margin-right: 1rem;
  }
`;

export const DetailsDiv = styled.div`
  display: flex;
  flex-direction: column;
  h3 {
    font-weight: 900;
    font-size: 1.1rem;
  }
`;
export const ReviewDetailsDiv = styled.div`
  display: flex;
  p {
    margin-left: 1rem;
  }
`;
