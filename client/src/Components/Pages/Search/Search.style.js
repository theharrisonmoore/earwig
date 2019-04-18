import styled from "styled-components";
import { colors, shadows, organizations, breakpoints } from "./../../../theme";
import { Link } from "react-router-dom";

export const classNames = {
  container: "react-autosuggest__container",
  containerOpen: "react-autosuggest__input",
  containerFocussed: "react-autosuggest__input--focused",
  containerInputOpen: "react-autosuggest__input--open",
  suggestionsContainer: "react-autosuggest__suggestions-container",
  suggestionsContainerOpen: "react-autosuggest__suggestions-container--open",
  suggestionsList: "react-autosuggest__suggestions-list",
  suggestions: "react-autosuggest__suggestion",
  suggestionHighlighted: "react-autosuggest__suggestion--highlighted"
};

export const AutosuggestWrapper = styled.div.attrs(classNames)`
.${classNames.container} {
  position: relative;
}

.${classNames.containerOpen} {
  border: 1px solid ${colors.inputBorder};
  box-shadow: ${shadows.searchBoxShadow};
  border-radius: 5px;
  width: 80%;
  height: 4.5rem;
  padding: 10px 20px;
  font-weight: 300;
  font-size: 1rem;
}

.${classNames.containerFocussed} {
  outline: none;
}
.${classNames.containerInputOpen} {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.${classNames.suggestionsContainer} {
  display: none;
}
.${classNames.suggestionsContainerOpen} {
  display: block;
  position: absolute;
  width: 100%;
  background-color: ${colors.white};
  max-height: 45vh;
  overflow-y: auto;
  z-index: 2;

}
.${classNames.suggestionsList} {

}
.${classNames.suggestions} {
  box-shadow: ${shadows.autocompleteSuggestionShadow};
  opacity: 0.8;
}
.${classNames.suggestionHighlighted} {
  box-shadow: ${shadows.autocompleteSuggestionShadow};
  opacity: 0.8;
}
@media ${breakpoints.tablet} {
  .${classNames.containerOpen} {
    width: 100%;
  }
  .${classNames.suggestionsContainerOpen} {
    max-height: inherit;
  }
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
  padding-left: 1.5rem;
  flex-direction: column;
  align-items: center;
  padding-bottom: 1rem;

  @media ${breakpoints.mobileM} {
    padding-left: 2.5rem;
  }
  @media ${breakpoints.mobileL} {
    padding-left: 5rem;
  }

  @media ${breakpoints.tablet} {
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
  border: 0.2px solid ${colors.lightGray};
  box-shadow: ${colors.searchBoxShadow};
  color: ${props => organizations[props.orgType].primary};
`;

export const AddItemBox = styled.div`
  border: 0.2px solid ${colors.lightGray};
  box-shadow: ${colors.searchBoxShadow};
  color: black;
  margin-top: -1rem;
`;

export const ReviewsFrame = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 0.3rem;
  padding-left: 2rem;
  color: ${props => organizations[props.orgType].primary};
  @media ${breakpoints.tablet} {
    padding-left: 6rem;
  }
`;

export const InnerDivLastReviews = styled.div`
  text-align: left;
  width: 100%;
  display: flex;
  @media ${breakpoints.tablet} {
    border-bottom: 2px solid ${props => organizations[props.orgType].secondary};
    width: 80%;
  }
`;

export const InnerDivSuggestions = styled.div`
  text-align: left;
  padding-left: 0.75rem;
  padding-top: 0.75rem;
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

export const AddItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  h3 {
    font-weight: 700;
    font-size: 1rem;
    margin-top: 0.2rem;
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

export const ProfileLink = styled.a`
  :hover {
    text-decoration: none;
  }
`;

export const AddProfileLink = styled(Link)`
  :hover {
    text-decoration: none;
  }
`;
