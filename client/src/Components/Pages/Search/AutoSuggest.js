// this component enables the autcomplete search functionality
// it uses react-autosuggest and renders each item including details such as name and average ratings as links
// it is used in the following components Pages/Search/index.js Common/Navbar
// it takes various props which are mandatory in case you wanted to reuse the component

import React, { Component } from "react";
import Autosuggest from "react-autosuggest";
import { withRouter } from "react-router-dom";
import axios from "axios";
import createTrie from "autosuggest-trie";
import { Spin } from "antd";
import swal from "sweetalert2";

import { ADD_PROFILE_URL } from "../../../constants/naviagationUrls";
import { API_ADD_ORGANIZATION_URL } from "../../../apiUrls";

import Suggestion from "./OrganisationRow";

// styles
import {
  AutosuggestWrapper,
  AddItemDetails,
  InnerDivSuggestions,
  AddItemBox,
  AddProfileLink,
  IconDiv,
} from "./Search.style";

import Icon from "../../Common/Icon/Icon";
import SearchIcon from "../../../assets/search-icon.svg";
import PlaceholderArrow from "../../../assets/placeholder-arrow.svg";

// functions

// gets called when a suggestion gets clicked
// eslint-disable-next-line no-unused-vars
export const getSuggestionValue = suggestion => "";

// compares the user's input value and the entries (organisations) and filters the data array accordingly

export const getSuggestions = (value, organisationsArray) => {
  const inputValue = value.toLowerCase();

  const inputValueChained = inputValue.replace(/\s/g, "");

  const trie = createTrie(organisationsArray, "name");

  const suggestions = organisationsArray.filter(org =>
    org.name
      .toLowerCase()
      .replace(/\s/g, "")
      .includes(inputValueChained)
  );

  // creates trie from value in data array
  const trieMatches = trie.getMatches(`${value}`);

  const suggestionsTogether = [...new Set(trieMatches.concat(suggestions))];

  // in case there are no suggestions still return a value -> enables the 'add' box to be rendered
  if (suggestionsTogether.length === 0) {
    return [{ isEmpty: true }];
  }

  return suggestionsTogether;
};

class AutosuggestComponent extends Component {
  state = {
    value: "",
    suggestions: [],
    isLoaded: true,
  };

  componentDidUpdate(prevProps) {
    const { showOtherSections } = this.props;
    if (prevProps.showOtherSections !== showOtherSections) {
      if (showOtherSections) {
        this.setState({ value: "" });
      }
    }
  }

  handleAddNewOrg = () => {
    const { value } = this.state;
    const { section } = this.props;
    const newOrg = { name: value, category: section };
    this.setState({ isLoaded: false });
    axios
      .post(API_ADD_ORGANIZATION_URL, newOrg)
      .then(res => {
        this.setState({ isLoaded: true });
        this.props.storeOrg(res.data);
      })
      .catch(() => {
        this.setState({ isLoaded: true });
        swal.fire({
          type: "error",
          title: "Oops...",
          text: `${value} already exists. Please contact us directly with your request.`,
          footer: '<a href="/contact">Contact</a>',
        });
      });

    this.setState({ value: "", suggestions: [] });
  };

  // functions for autosuggest component

  // gets called every time suggestions are updated based on a users input
  // you need to feed in data as a prop which acts as array of entries
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value, this.props.data),
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
  delSearchInput = () => {
    this.setState({ value: "" });
  };

  renderSuggestion = suggestion => {
    const { isButton, storeOrg, noIcon } = this.props;
    if (suggestion.isEmpty) {
      return null;
    }
    return (
      <Suggestion
        organisation={suggestion}
        isButton={isButton}
        storeOrg={storeOrg}
        noIcon={noIcon}
      />
    );
  };

  // renders all elements and the add item footer
  renderSuggestionsContainer = ({ containerProps, children, query }) => {
    if (query && query.length > 0) {
      return (
        <div
          {...containerProps}
          id="scroll-div"
          style={{ height: "500px", overscrollBehaviorY: "none" }}
        >
          {children}
          <div className="my-suggestions-container-footer" />
          {this.props.origin === "checkOrg" ? (
            <AddProfileLink as="button" onClick={this.handleAddNewOrg}>
              <AddItemBox>
                <InnerDivSuggestions>
                  <AddItemDetails>
                    <h3>&quot;{query}&quot; (Create new)</h3>
                  </AddItemDetails>
                </InnerDivSuggestions>
              </AddItemBox>
            </AddProfileLink>
          ) : (
            <AddProfileLink
              to={{
                pathname: `${ADD_PROFILE_URL}`,
                state: {
                  name: `${query}`,
                  referrerUrl: this.props.location.pathname,
                  section: this.props.section,
                },
              }}
            >
              <AddItemBox>
                <InnerDivSuggestions>
                  <AddItemDetails>
                    <h3>&quot;{query}&quot; (Create new)</h3>
                  </AddItemDetails>
                </InnerDivSuggestions>
              </AddItemBox>
            </AddProfileLink>
          )}
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
      iconTop,
      noIcon,
    } = this.props;

    const inputProps = {
      placeholder: `${placeholderText}`,
      value,
      onChange: this.onChange,
      onKeyPress: this.onKeyPress,
    };

    // decide the number of suggestions rendered
    const suggestionLimit = 5;
    const filteredSuggestions = suggestions.slice(0, suggestionLimit);

    return (
      <AutosuggestWrapper height={height} width={width} noIcon>
        <Spin spinning={!this.state.isLoaded} tip="Adding the new org.">
          {!noIcon && (
            <IconDiv iconTop={iconTop} onClick={this.delSearchInput}>
              {value.length > 0 ? (
                <Icon icon="close" height="32px" width="32px" />
              ) : (
                <Icon icon="search" height="32px" width="32px" />
              )}
            </IconDiv>
          )}
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
              focusInputOnSuggestionClick={false}
            />
          ) : (
            <Autosuggest
              suggestions={filteredSuggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={this.renderSuggestion}
              inputProps={inputProps}
              renderSuggestionsContainer={this.renderSuggestionsContainer}
              focusInputOnSuggestionClick={false}
            />
          )}
        </Spin>
      </AutosuggestWrapper>
    );
  }
}

export default withRouter(AutosuggestComponent);
