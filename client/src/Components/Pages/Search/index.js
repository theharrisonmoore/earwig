import React, { Component } from "react";
import { SearchWrapper } from "./Search.style";
import axios from "axios";
import Autosuggest from "react-autosuggest";

export default class Search extends Component {
  state = {
    loaded: false,
    data: null
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
  renderSuggestion = suggestion => <div>{suggestion.name}</div>;

  render() {
    console.log(this.state);
    const { loaded } = this.state;

    if (!loaded) return <p>loading...</p>;

    return (
      <SearchWrapper>
        <Autosuggest />
      </SearchWrapper>
    );
  }
}
