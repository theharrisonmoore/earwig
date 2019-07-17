import styled from "styled-components";
import {
  borders,
  colors,
  shadows,
  organizations,
  breakpoints
} from "./../../../theme";

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
position: relative;
width: ${props => props.width};
outline: none;


.${classNames.container} {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.${classNames.containerOpen} {
  border: ${borders.searchBox};
  height: ${props => props.height};
  padding: 10px 20px;
  font-weight: 300;
  font-size: 1rem;
  width: 100%;
}
.${classNames.containerFocussed} {
  outline: none;
}

input {
  text-indent: ${props => (props.noIcon ? "0px" : "45px")};
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
  margin-top: ${props => props.height};
  width: 100%;
  z-index: 2;
  background-color: ${colors.white};
  max-height: 80vh;
  overflow-y: auto;
}
.${classNames.suggestionsList} {
}
.${classNames.suggestions} {
  box-shadow: ${shadows.autocompleteSuggestionShadow};
  opacity: 0.75;
  transition: all ease 0.2s;

  :hover, :active, :focus {
    opacity: 1;
  }
}
.${classNames.suggestionHighlighted} {
  box-shadow: ${shadows.autocompleteSuggestionShadow};
  opacity: 0.75;
  transition: all ease 0.2s;

  :hover, :active, :focus {
    opacity: 1;
  }
}
@media ${breakpoints.tablet} {

  .${classNames.suggestionsContainerOpen} {
    max-height: inherit;
  }
`;

export const IconDiv = styled.div`
  width: 32px;
  height: 32px;
  /* background: url(${props => props.bgr}) no-repeat; */
  object-fit: fill;
  position: absolute;
  top: ${props => props.iconTop};
  margin-left: 20px;
  cursor: pointer;
  z-index: 1;
  right: 24px;
`;

export const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0;
  padding-top: 4rem;
  margin: 0;
  align-items: center;
  li {
    list-style-type: none;
  }
`;

export const FlexContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SearchLegendDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  border: 1px solid;
`;

export const LastReviewsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ItemDiv = styled.div`
  display: flex;
  max-width: 200px;
  align-items: center;
  width: 45%;
  padding: ${props => (props.notMobile ? "0 2rem" : "0 1rem")};
  margin-bottom: 1.5rem;
  margin-left: auto;
  margin-right: auto;
  justify-content: ${props =>
    props.notMobile && props.left ? "flex-end" : "flex-start"};
`;

export const LegendTitle = styled.h2`
  color: ${props => organizations[props.orgType].primary};
  font-size: 1rem;
  margin: 0;
`;

export const SuggestionBox = styled.div`
  border: 0.2px solid ${colors.lightGray};
  box-shadow: ${colors.searchBoxShadow};
  color: ${props => organizations[props.orgType].primary};
`;

export const AddItemBox = styled.div`
  border-width: 0rem 0.2px 0.2px 0.2px;
  border-style: solid;
  border-color: ${colors.lightGray};
  box-shadow: ${colors.searchBoxShadow};
  color: ${colors.black};
  margin-top: -1rem;
`;

export const ReviewsFrame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 0.3rem;
  color: ${props => organizations[props.orgType].primary};
`;

export const ReviewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 80%;
`;

export const InnerDivLastReviews = styled.div`
  text-align: left;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 1rem 0;
  @media ${breakpoints.tablet} {
    border-bottom: 2px solid ${props => organizations[props.orgType].secondary};
  }
`;

export const InnerDivSuggestions = styled.div`
  text-align: left;
  padding: 1rem 0 1rem 0.75rem;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const SymbolDiv = styled.div`
  display: flex;
  align-items: center;
  img {
    margin-right: 1rem;
    margin-bottom: 8px;
  }
`;

export const ArrowDiv = styled.div`
  display: flex;
  margin-left: auto;
  align-items: center;
  padding-right: 0.5rem;
  /* svg {
    margin-right: 1rem;
  } */
`;

export const ImgDiv = styled.div`
  height: ${props => props.height};
  width: ${props => props.width};
`;

export const OrganisationDetailsDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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
    margin-bottom: 0;
  }
`;

export const ProfileLink = styled(Link)`
  :hover {
    text-decoration: none;
  }
`;

export const AddProfileLink = styled(Link)`
  width: 100%;

  :hover {
    text-decoration: none;
  }
`;

export const HeadlineDiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  padding-top: 2rem;
  color: ${colors.profileFontColor};
  h2 {
    font-size: 2rem;
    font-weight: 350;
  }
  p {
    font-style: italic;
    font-size: 1rem;
  }
`;

export const H2 = styled.h2`
  font-size: 2rem;
  opacity: 0.7;
`;

export const H3 = styled.h3`
  font-size: 1rem;
  letter-spacing: 0.3px;
  font-weight: 900;
  cursor: pointer;
`;

export const P = styled.p`
  font-size: 1rem;
  font-style: italic;
`;

export const LogosContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

export const RowDiv = styled.div`
  display: flex;
  width: 100%;
  max-width: 550px;
  margin: 0 auto;
`;

export const FooterDiv = styled.footer`
  flex-shrink: 0;
`;

export const MainDiv = styled.div`
  flex-grow: 1;
  flex-shrink: 0;
  width: 90%;
`;

export const AddWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0;
  margin: 0;
  align-items: center;
  padding-top: 4rem;
`;
