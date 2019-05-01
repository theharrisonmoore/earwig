import React, { Component } from "react";
import Autosuggest from "react-autosuggest";
import { ADD_PROFILE_URL } from "../../../constants/naviagationUrls";
// styles
import {
  AutosuggestWrapper,
  SymbolDiv,
  OrganisationDetailsDiv,
  AddItemDetails,
  ReviewDetailsDiv,
  InnerDivSuggestions,
  ArrowDiv,
  SuggestionBox,
  AddItemBox,
  ProfileLink,
  AddProfileLink
} from "./Search.style";

// UI helper functions
import { SVGCreator, StarRateCreator } from "../../../helpers";

import { organizationIcons } from "./../../../theme";

// functions

// gets called when suggestions gets clicked
export const getSuggestionValue = suggestion => suggestion.name;

export const getSuggestions = (value, organisationsArray) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  const suggestions = organisationsArray.filter(
    org => org.name.toLowerCase().slice(0, inputLength) === inputValue
  );

  // in case there are no suggestions still return a value enabling the 'add' box to be rendered
  if (suggestions.length === 0) {
    return [{ isEmpty: true }];
  }

  return suggestions;
};

export default class AutosuggestComponent extends Component {
  state = {
    value: "",
    suggestions: []
  };

  // functions for autosuggest component
  // create suggestions array based on user input

  // Autosuggest will call this function every time suggestions are updated
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value, this.props.data)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({ suggestions: [] });
  };

  onChange = (event, { newValue }) => {
    this.setState({ value: typeof newValue !== "undefined" ? newValue : "" });
  };

  onKeyPress = e => {
    const { value } = this.state;
    const suggestions = getSuggestions(value, this.props.data);

    if (e.key === "Enter") {
      if (suggestions[0].isEmpty) {
        return null;
      }
      return (window.location.href = `/profile/${suggestions[0]._id}`);
    }
    return null;
  };

  // render functions
  // renders individual suggestions in autosuggest search section
  renderSuggestion = suggestion => {
    // check if no suggestion available and return so that renderSuggestionsContainer function is still being called (gets deactivated otherwise)
    if (suggestion.isEmpty) {
      return null;
    }
    return (
      <ProfileLink href={`/profile/${suggestion._id}`}>
        <SuggestionBox orgType={suggestion.category}>
          <InnerDivSuggestions>
            <SymbolDiv>
              {SVGCreator("mobile-search-icon")}
              {SVGCreator(`${organizationIcons[suggestion.category].symbol}`)}
            </SymbolDiv>
            <OrganisationDetailsDiv>
              <h3>{suggestion.name}</h3>
              <ReviewDetailsDiv>
                {StarRateCreator(suggestion)}
                <p>{suggestion.totalReviews} reviews</p>
              </ReviewDetailsDiv>
            </OrganisationDetailsDiv>
            <ArrowDiv>
              {SVGCreator(`${organizationIcons[suggestion.category].arrow}`)}
            </ArrowDiv>
          </InnerDivSuggestions>
        </SuggestionBox>
      </ProfileLink>
    );
  };
  // renders all elements and the add item footer
  renderSuggestionsContainer = ({ containerProps, children, query }) => {
    if (query && query.length > 0) {
      return (
        <div {...containerProps}>
          {children}
          <div className="my-suggestions-container-footer" />

          <AddProfileLink
            to={{ pathname: `${ADD_PROFILE_URL}`, state: { name: `${query}` } }}
          >
            <AddItemBox>
              <InnerDivSuggestions>
                <SymbolDiv>{SVGCreator("add-item-icon")}</SymbolDiv>
                <AddItemDetails>
                  <h3>Add {query}</h3>
                </AddItemDetails>
              </InnerDivSuggestions>
            </AddItemBox>
          </AddProfileLink>
        </div>
      );
    }
    return <div {...containerProps}>{children}</div>;
  };

  render() {
    const { value, suggestions } = this.state;
    const { height, width, bool, placeholderText } = this.props;
    const inputProps = {
      placeholder: `${placeholderText}`,
      value,
      onChange: this.onChange,
      onKeyPress: this.onKeyPress
    };

    return (
      <AutosuggestWrapper height={height} width={width}>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          shouldRenderSuggestions={bool}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
          renderSuggestionsContainer={this.renderSuggestionsContainer}
        />
      </AutosuggestWrapper>
    );
  }
}
