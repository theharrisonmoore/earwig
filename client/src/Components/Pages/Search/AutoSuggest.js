// this component enables the autcomplete search functionality
// it uses react-autosuggest and renders each item including details such as name and average ratings as links
// it is used in the following components Pages/Search/index.js Common/Navbar
// it takes various props which are mandatory in case you wanted to reuse the component

import React, { Component } from "react";
import Autosuggest from "react-autosuggest";
import { withRouter } from "react-router-dom";
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
  AddProfileLink,
  IconDiv
} from "./Search.style";

import Icon from "./../../Common/Icon/Icon";
import SearchIcon from "../../../assets/search-icon.svg";
import PlaceholderArrow from "../../../assets/placeholder-arrow.svg";

// UI helper functions
import { SVGCreator, StarRateCreator } from "../../../helpers";

import { organizationIcons } from "./../../../theme";

// functions

// gets called when a suggestion gets clicked
export const getSuggestionValue = suggestion => suggestion.name;

// compares the user's input value and the entries (organisations) and filters the data array accordingly
export const getSuggestions = (value, organisationsArray) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  const suggestions = organisationsArray.filter(
    org => org.name.toLowerCase().slice(0, inputLength) === inputValue
  );

  // in case there are no suggestions still return a value -> enables the 'add' box to be rendered
  if (suggestions.length === 0) {
    return [{ isEmpty: true }];
  }

  return suggestions;
};

class AutosuggestComponent extends Component {
  state = {
    value: "",
    suggestions: []
  };

  // functions for autosuggest component

  // gets called every time suggestions are updated based on a users input
  // you need to feed in data as a prop which acts as array of entries
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value, this.props.data)
    });
  };

  //  gets called every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({ suggestions: [] });
  };

  // the onChange handler sets the users input and prevents that the value is undefined
  onChange = (event, { newValue }) => {
    this.setState({ value: typeof newValue !== "undefined" ? newValue : "" });
  };

  // handles the enter key being pressed by user
  onKeyPress = e => {
    const { value } = this.state;
    const suggestions = getSuggestions(value, this.props.data);

    if (e.key === "Enter") {
      if (suggestions[0].isEmpty) {
        return null;
      }
      return this.props.history.push(`/profile/${suggestions[0]._id}`);
    }
    return null;
  };

  // selects the icon appearing next to the user's input text
  selectIconBgr = value => (value.length > 0 ? PlaceholderArrow : SearchIcon);

  // when users clicks on back arrow icon it deletes the input
  delSearchInput = () => this.setState({ value: "" });

  // renders individual suggestions
  renderSuggestion = suggestion => {
    // check if no suggestion is available and returns so that renderSuggestionsContainer function is still being called (gets deactivated otherwise)
    if (suggestion.isEmpty) {
      return null;
    }
    return (
      <ProfileLink to={`/profile/${suggestion._id}`}>
        <SuggestionBox orgType={suggestion.category}>
          <InnerDivSuggestions>
            <SymbolDiv>
              <Icon
                icon="search"
                height="1.5rem"
                width="1.5rem"
                margin="0 1rem 0 0"
              />
              <Icon
                icon={suggestion.category}
                height="1.5rem"
                width="1.5rem"
                margin="0 1rem 0 0"
              />
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
    const {
      height,
      width,
      placeholderText,
      isMobile,
      bool,
      iconTop
    } = this.props;

    const inputProps = {
      placeholder: `${placeholderText}`,
      value,
      onChange: this.onChange,
      onKeyPress: this.onKeyPress
    };

    // limits suggestions to 10 results

    const filteredSuggestions = suggestions.slice(0, 10);

    return (
      <AutosuggestWrapper height={height} width={width}>
        <IconDiv
          iconTop={iconTop}
          bgr={this.selectIconBgr(value)}
          onClick={this.delSearchInput}
        />
        {/* on mobile disable shouldRenderSuggestions as we don't want automatic suggestion rendering as it hides most of the screen */}
        {isMobile ? (
          <Autosuggest
            suggestions={filteredSuggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            inputProps={inputProps}
            renderSuggestionsContainer={this.renderSuggestionsContainer}
          />
        ) : (
          <Autosuggest
            suggestions={filteredSuggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            shouldRenderSuggestions={() => bool}
            inputProps={inputProps}
            renderSuggestionsContainer={this.renderSuggestionsContainer}
          />
        )}
      </AutosuggestWrapper>
    );
  }
}

export default withRouter(AutosuggestComponent);
