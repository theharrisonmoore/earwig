import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  borders,
  colors,
  shadows,
  organizations,
  breakpoints,
} from "../../../theme";
import OrganisationsList from "./OrganisationsList";

export const classNames = {
  container: "react-autosuggest__container",
  containerOpen: "react-autosuggest__input",
  containerFocussed: "react-autosuggest__input--focused",
  containerInputOpen: "react-autosuggest__input--open",
  suggestionsContainer: "react-autosuggest__suggestions-container",
  suggestionsContainerOpen: "react-autosuggest__suggestions-container--open",
  suggestionsList: "react-autosuggest__suggestions-list",
  suggestions: "react-autosuggest__suggestion",
  suggestionHighlighted: "react-autosuggest__suggestion--highlighted",
};

export const AutosuggestWrapper = styled.div.attrs(classNames)`
  position: relative;
  /* width: ${props => props.width}; */
  width: 100%;
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
    text-indent: ${props => (props.searchIcon ? "0px" : "45px")};
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
    margin-top: 72px;
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
    :hover,
    :active,
    :focus {
      opacity: 1;
    }
  }
  .${classNames.suggestionHighlighted} {
    box-shadow: ${shadows.autocompleteSuggestionShadow};
    opacity: 0.75;
    transition: all ease 0.2s;
    :hover,
    :active,
    :focus {
      opacity: 1;
    }
  }
  @media ${breakpoints.tablet} {
    .${classNames.suggestionsContainerOpen} {
      max-height: inherit;
    }
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
  right: 18px;
`;

export const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0;

  margin: 0;
  align-items: center;

  li {
    list-style-type: none;
  }
`;

export const SearchLegendDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${props => (props.isMobile ? "0" : "0 2rem 1rem 2rem")};
  width: 100%;
  max-width: 600px;
`;

export const LastReviewsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LegendTitle = styled.h2`
  color: ${props => organizations[props.orgType].primary};
  font-size: 1rem;
  margin: 0;
`;

export const SuggestionBox = styled.div`
  border: ${({ withoutBorder }) =>
    withoutBorder ? "none" : `0.2px solid ${colors.lightGray}`};
  box-shadow: ${colors.searchBoxShadow};
  color: ${props => organizations[props.orgType].primary};
  border-color: ${colors.lightGray};
`;

export const AddItemBox = styled.div`
  border-width: 0rem 0.2px 0.2px 0.2px;
  border-style: solid;
  border-color: ${colors.lightGray};
  box-shadow: ${colors.searchBoxShadow};
  color: ${colors.black};
  margin-top: -1rem;
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
  padding-left: 30px;
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
  background: none;
  cursor: pointer;

  :hover {
    text-decoration: none;
  }
`;

export const OrgsListWrapper = styled.div`
  text-align: left;
  padding: 0 0 6.5rem 1rem;
  width: 100%;
  max-width: 25rem;
  margin: 0 auto;
`;

export const MainKey = styled.p`
  font-size: 26px;
  line-height: 30px;
  letter-spacing: 0.541667px;
  margin-top: 35px;
  color: ${colors.dustyGray4};
  padding-left: 0.75rem;
  font-weight: bold;
`;

export const SubKey = styled(MainKey)`
  font-size: 18px;
  margin-top: 30px;
  margin-bottom: 0;
  padding-left: 0.75rem;
  font-weight: bold;
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

export const NoDataTitle = styled.p`
  font-size: 1.5rem;
  padding-top: 2rem;
  color: ${colors.dustyGray1};
  padding-left: 1rem;
`;

export const LogoWrapper = styled.div`
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  background-color: ${props => props.orgColor || colors.heliotrope};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;

  p {
    font-size: 8px;
    color: white;
    margin-bottom: 0;
  }
`;
