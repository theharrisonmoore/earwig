import React, { Component } from "react";
import SVG from "react-inlinesvg";
import axios from "axios";
import Autosuggest from "react-autosuggest";
import StarRatingComponent from "react-star-rating-component";

import {
  HeadlineDiv,
  RowDiv,
  ItemDiv,
  LegendTitle,
  SearchLegendDiv,
  SearchWrapper,
  SuggestionBox,
  SymbolDiv,
  OrganisationDetailsDiv,
  ReviewDetailsDiv,
  InnerDivLastReviews,
  InnerDivSuggestions,
  ArrowDiv,
  ImgDiv,
  ReviewsFrame,
  ProfileLink
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

  SVGcreator = source => <SVG src={`/icons/${source}.svg`} alt={`${source}`} />;

  // render suggestions
  renderSuggestion = suggestion => (
    <ProfileLink to={`/profile/${suggestion._id}`}>
      <SuggestionBox orgType={suggestion.category}>
        <InnerDivSuggestions>
          <SymbolDiv>
            <ImgDiv>{this.SVGcreator("mobile-search-icon")}</ImgDiv>
            <ImgDiv>
              {this.SVGcreator(
                `${organizationIcons[suggestion.category].symbol}`
              )}
            </ImgDiv>
          </SymbolDiv>
          <OrganisationDetailsDiv>
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
          </OrganisationDetailsDiv>
          <ArrowDiv>
            {this.SVGcreator(`${organizationIcons[suggestion.category].arrow}`)}
          </ArrowDiv>
        </InnerDivSuggestions>
      </SuggestionBox>
    </ProfileLink>
  );

  // render lates organizations
  renderLastViewed = orga => (
    <ProfileLink to={`/profile/${orga._id}`}>
      <ReviewsFrame orgType={orga.category}>
        <InnerDivLastReviews orgType={orga.category}>
          <SymbolDiv>
            <ImgDiv>
              {this.SVGcreator(`${organizationIcons[orga.category].symbol}`)}
            </ImgDiv>
          </SymbolDiv>
          <OrganisationDetailsDiv>
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
          </OrganisationDetailsDiv>
          <ArrowDiv>
            {this.SVGcreator(`${organizationIcons[orga.category].arrow}`)}
          </ArrowDiv>
        </InnerDivLastReviews>
      </ReviewsFrame>
    </ProfileLink>
  );

  // sort reviews by last viewed
  sortLastViewed = (a, b) =>
    a.lastViewed > b.lastViewed ? -1 : b.lastViewed > a.lastViewed ? 1 : 0;

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
    const { loaded, value, suggestions, data } = this.state;
    const inputProps = {
      placeholder: "🔍        start typing...",
      value,
      onChange: this.onChange,
      highlightFirstSuggestion: true
    };
    if (!loaded) return <p>loading...</p>;

    return (
      <SearchWrapper>
        <HeadlineDiv>
          <h2>Welcome to earwig.</h2> <h2>Try searching for…</h2>
        </HeadlineDiv>
        <SearchLegendDiv>
          <RowDiv>
            <ItemDiv>
              <ImgDiv>{this.SVGcreator("agency-icon")}</ImgDiv>
              <LegendTitle color="#8B51FC">Agencies</LegendTitle>
            </ItemDiv>
            <ItemDiv>
              <ImgDiv>{this.SVGcreator("payroll-icon")}</ImgDiv>
              <LegendTitle color="#37B6FD">Payrolls</LegendTitle>
            </ItemDiv>
          </RowDiv>
          <RowDiv>
            <ItemDiv>
              <ImgDiv>{this.SVGcreator("worksite-icon")}</ImgDiv>
              <LegendTitle color="#FFA400">Worksites</LegendTitle>
            </ItemDiv>
            <ItemDiv>
              <ImgDiv>{this.SVGcreator("company-icon")}</ImgDiv>
              <LegendTitle color="#1C0F13">Companies</LegendTitle>
            </ItemDiv>
          </RowDiv>
        </SearchLegendDiv>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
          scrollable={true}
        />
        <HeadlineDiv>
          <p>Or find out what's happening at...</p>
        </HeadlineDiv>
        {data
          .sort(this.sortLastViewed)
          .map((orga, index) => (index < 4 ? this.renderLastViewed(orga) : ""))}
      </SearchWrapper>
    );
  }
}
