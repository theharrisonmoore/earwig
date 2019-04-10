import styled from "styled-components";

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
  display: flex;
  flex-direction: column;
  text-align: center;
  padding-top: 2rem;
  padding-bottom: 0.7rem;
  color: ${colors.profileFontColor};
  h2 {
    font-size: 2rem;
    font-weight: 350;
  }
  p {
    font-style: italic;
  }
`;

export const SearchLegend = styled.div`
  display: flex;
  padding-left: 1rem;
  flex-direction: column;
  align-items: center;
  padding-bottom: 1rem;
`;

export const Row = styled.div`
  display: flex;
  width: 100%;
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

export const ReviewsFrame = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 0.3rem;
  padding-left: 1rem;
`;

export const SuggestionInnerFrame = styled.div`
  text-align: left;
  width: 100%;
`;

export const SymbolDiv = styled.div`
  display: flex;
  float: left;
  svg {
    margin-right: 1rem;
  }
`;

export const ArrowDiv = styled.div`
  border: 1px solid green;
  display: flex;
  margin-left: auto;
  align-items: center;
  svg {
    margin-right: 1rem;
  }
`;

export const ImgDiv = styled.div`
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
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
