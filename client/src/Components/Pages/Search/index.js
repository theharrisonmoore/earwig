import React, { Component } from "react";
import SVG from "react-inlinesvg";
import axios from "axios";
import Autosuggest from "react-autosuggest";

import {
  SearchWrapper,
  SuggestionBox,
  SymbolDiv,
  DetailsDiv
} from "./Search.style";

export default class Search extends Component {
  state = {
    loaded: false,
    data: null,
    value: "",
    suggestions: []
  };
  // lifecycle
  componentDidMount() {
    axios.get("/api/search").then(organizations => {
      this.setState({
        data: organizations.data,
        loaded: true
      });
    });
  }

  // functions
  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions = (value, organisationsArray) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0
      ? []
      : organisationsArray.filter(
          orga => orga.name.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  getSuggestionValue = suggestion => suggestion.name;

  // render suggestions
  renderSuggestion = suggestion => (
    <SuggestionBox>
      <SymbolDiv>
        <SVG src="/icons/mobile-search-icon.svg" className="menuIcon" />
      </SymbolDiv>
      <DetailsDiv>
        {" "}
        <h3>{suggestion.name}</h3>
        {suggestion.avgRatings}
        {suggestion.category}
        {suggestion.totalReviews}
      </DetailsDiv>
    </SuggestionBox>
  );

  onChange = (event, { newValue }) => {
    this.setState({ value: newValue });
  };
  // Autosuggest will call this function every time you need to update suggestions.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value, this.state.data)
    });
  };
  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({ suggestions: [] });
  };

  render() {
    console.log(this.state.data);
    const { loaded, value, suggestions } = this.state;
    const inputProps = {
      placeholder: "type to search for organisations",
      value,
      onChange: this.onChange
    };
    if (!loaded) return <p>loading...</p>;

    return (
      <SearchWrapper>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
        />
      </SearchWrapper>
    );
  }
}
