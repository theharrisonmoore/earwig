import React, { Component } from "react";
import SVG from "react-inlinesvg";
import axios from "axios";
import Autosuggest from "react-autosuggest";
import StarRatingComponent from "react-star-rating-component";
import autoCompleteTheme from "./autoCompleteTheme.css";

import {
  Headline,
  Row,
  Item,
  LegendTitle,
  SearchLegend,
  SearchWrapper,
  SuggestionBox,
  SymbolDiv,
  DetailsDiv,
  ReviewDetailsDiv,
  SuggestionInnerFrame,
  ArrowDiv,
  OrganizationWrapper
} from "./Search.style";

import { organizationIcons, organizations } from "./../../../theme";

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
    <SuggestionBox orgType={suggestion.category}>
      <SuggestionInnerFrame>
        <SymbolDiv>
          <SVG src="/icons/mobile-search-icon.svg" className="menuIcon" />
          <SVG
            src={`/icons/${organizationIcons[suggestion.category].symbol}.svg`}
            className="OrganizationSymbol"
          />
        </SymbolDiv>
        <DetailsDiv>
          <h3>{suggestion.name}</h3>
          <ReviewDetailsDiv>
            <StarRatingComponent
              name="orgaRate"
              editing={false}
              starCount={5}
              value={suggestion.avgRatings}
              starColor={`${organizations[suggestion.category].primary}`}
              emptyStarColor={"#D3D3D3"}
            />
            <p>{suggestion.totalReviews} reviews</p>
          </ReviewDetailsDiv>
        </DetailsDiv>
        <ArrowDiv>
          <SVG
            src={`/icons/${organizationIcons[suggestion.category].arrow}.svg`}
            className="OrganizationArrowLink"
          />{" "}
        </ArrowDiv>
      </SuggestionInnerFrame>
    </SuggestionBox>
  );

  // render lates organizations
  renderLastViewed = orga => (
    <OrganizationWrapper>
      <SuggestionInnerFrame orgType={orga.category}>
        <SymbolDiv>
          <SVG
            src={`/icons/${organizationIcons[orga.category].symbol}.svg`}
            className="OrganizationSymbol"
          />
        </SymbolDiv>
        <DetailsDiv>
          <h3>{orga.name}</h3>
          <ReviewDetailsDiv>
            <StarRatingComponent
              name="orgaRate"
              editing={false}
              starCount={5}
              value={orga.avgRatings}
              starColor={`${organizations[orga.category].primary}`}
              emptyStarColor={"#D3D3D3"}
            />
            <p>{orga.totalReviews} reviews</p>
          </ReviewDetailsDiv>
        </DetailsDiv>
      </SuggestionInnerFrame>
    </OrganizationWrapper>
  );

  // sort reviews by last viewed
  sortLastViewed = (a, b) =>
    a.lastViewed > b.lastViewed ? 1 : b.lastViewed > a.lastViewed ? -1 : 0;

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
    const { loaded, value, suggestions, data } = this.state;
    const inputProps = {
      placeholder: "start typing...",
      value,
      onChange: this.onChange,
      highlightFirstSuggestion: true
    };
    if (!loaded) return <p>loading...</p>;

    return (
      <SearchWrapper>
        <Headline>
          <h2>Welcome to earwig.</h2> <h2>Try searching for…</h2>
        </Headline>
        <SearchLegend>
          <Row>
            <Item>
              <SVG src="/icons/agency-icon.svg" />
              <LegendTitle color="#8B51FC">Agencies</LegendTitle>
            </Item>
            <Item>
              <SVG src="/icons/payroll-icon.svg" />
              <LegendTitle color="#37B6FD">Payrolls</LegendTitle>
            </Item>
          </Row>
          <Row>
            <Item>
              <SVG src="/icons/worksite-icon.svg" />
              <LegendTitle color="#FFA400">Worksites</LegendTitle>
            </Item>
            <Item>
              <SVG src="/icons/company-icon.svg" />
              <LegendTitle color="#1C0F13">Companies</LegendTitle>
            </Item>
          </Row>
        </SearchLegend>
        <Autosuggest
          theme={autoCompleteTheme}
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
          scrollable={true}
        />
        <Headline>
          <p>Or find out what's happening at...</p>
        </Headline>
        {data.sort(this.sortLastViewed).map((orga, index) => {
          while (index < 4) {
            return this.renderLastViewed(orga);
          }
        })}
      </SearchWrapper>
    );
  }
}
