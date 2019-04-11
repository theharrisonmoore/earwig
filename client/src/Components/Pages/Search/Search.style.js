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

export const HeadlineDiv = styled.div`
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

export const SearchLegendDiv = styled.div`
  display: flex;
  padding-left: 2rem;
  flex-direction: column;
  align-items: center;
  padding-bottom: 1rem;

  @media (min-width: 766px) {
    padding-left: 6rem;
  }
`;

export const RowDiv = styled.div`
  display: flex;
  width: 100%;
`;

export const ItemDiv = styled.div`
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
  padding-left: 2rem;
  color: ${props => organizations[props.orgType].primary};
  @media (min-width: 766px) {
    padding-left: 6rem;
  }
`;

export const InnerDivLastReviews = styled.div`
  text-align: left;
  width: 100%;
  display: flex;
  @media (min-width: 766px) {
    border-bottom: 2px solid ${props => organizations[props.orgType].secondary};
    width: 80%;
  }
`;

export const InnerDivSuggestions = styled.div`
  text-align: left;
  width: 100%;
  display: flex;
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

export const ImgDiv = styled.div`
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
`;

export const OrganisationDetailsDiv = styled.div`
  display: flex;
  flex-direction: column;
  h3 {
    font-weight: 700;
    font-size: 1rem;
  }
`;
export const ReviewDetailsDiv = styled.div`
  display: flex;
  font-size: 0.75rem;
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
