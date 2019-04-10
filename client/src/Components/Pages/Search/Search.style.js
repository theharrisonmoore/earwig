import styled from "styled-components";
import { Link } from "react-router-dom";

import { colors, shadows, organizations } from "./../../../theme";

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

export const Headline = styled.div`
  width: 100%;
  margin-top: 2rem;
  margin-bottom: 1rem;
  h2 {
    color: ${colors.profileFontColor};
    font-size: 2rem;
    margin: 0;
  }
`;

export const SearchLegend = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 1.5rem;
`;

export const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 6rem;

  @media (min-width: 769px) {
    padding-left: 8rem;
  }
`;

export const Item = styled.div`
  display: flex;
  width: 50%;
`;
export const LegendTitle = styled.h2`
  color: ${props => props.color};
  font-size: 1rem;
  margin-left: 0.25rem;
`;

export const SuggestionBox = styled.div`
  border: 0.5px solid ${colors.lightGray};
  box-shadow: ${colors.searchBoxShadow};
  color: ${props => organizations[props.orgType].primary};
`;

export const SuggestionInnerFrame = styled.div`
  display: flex;
  padding: 1rem 1rem 1rem 1rem;
  color: ${props => organizations[props.orgType].primary};
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
    font-size: 0.9rem;
  }
`;
export const ReviewDetailsDiv = styled.div`
  display: flex;
  p {
    margin-left: 1rem;
  }
`;

export const SearchBoxDiv = styled.div`
  display: flex;
  border: 1px solid #979797;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 3.5rem;
  box-shadow: ${shadows.buttonShadow};
  border-radius: 5px;
`;
