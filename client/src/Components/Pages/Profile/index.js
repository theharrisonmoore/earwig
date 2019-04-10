import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Wrapper,
  Banner,
  Header,
  CompanyDetails,
  CompanyTitle,
  ButtonDiv,
  OrgButton,
  ReviewDiv,
  ReviewType,
  ReviewButton,
  ReviewButtonsDiv,
  QuickReviewButton
} from "./Profile.style";

export default class Profile extends Component {
  state = {
    summary: null,
    reviewDetails: null,
    loaded: false
  };

  fetchData = () => {
    const organizationID = window.location.href.split("/")[4];

    axios
      .post("/api/profile", { organizationID })
      .then(res => {
        const { summary, reviewDetails } = res.data;

        this.setState({ summary, reviewDetails, loaded: true });
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { summary, reviewDetails, loaded } = this.state;
    if (!loaded) return <h1>Loading...</h1>;

    const {
      category,
      name,
      avgRatings,
      email,
      phoneNumber,
      totalReviews,
      websiteURL
    } = summary[0];

    return (
      <Wrapper>
        <Banner category={category}>
          <p>
            <span>{category}:</span> {name}
          </p>
        </Banner>
        <Header>
          <CompanyDetails>
            <CompanyTitle>
              <div>IMG</div>
              <div>
                <h2>{name}</h2>
                {avgRatings} {totalReviews} reviews
              </div>
            </CompanyTitle>
            <ButtonDiv>
              <a href="tel:0207-555-4444">
                <OrgButton category={category}>Call</OrgButton>
              </a>
              <a href="mailto:www.com">
                <OrgButton category={category}>Email</OrgButton>
              </a>
              <a href="http://www.anything.com" target="_blank">
                <OrgButton category={category}>Website</OrgButton>
              </a>
            </ButtonDiv>
          </CompanyDetails>
          <ReviewDiv>
            <h3>Give a review about {name}</h3>
            <ReviewButtonsDiv>
              <ReviewType>
                <div>CLOCK IMG</div>
                <p>2 mins</p>
                <ReviewButton category={category}>
                  <h4>Give a full review</h4>
                  <p>(Most helpful!)</p>
                  <p>></p>
                </ReviewButton>
              </ReviewType>
              <div>OR</div>
              <ReviewType>
                <div>CLOCK IMG</div>
                <p>30 secs</p>
                <QuickReviewButton category={category}>
                  <h4>Give a quick review</h4>
                  <p>></p>
                </QuickReviewButton>
              </ReviewType>
            </ReviewButtonsDiv>
          </ReviewDiv>
        </Header>
        <div>Section to give a review</div>
        <div>Key Ratings section</div>
        <div>Detailed Ratings section</div>
        <div>Overall Ratings section</div>
      </Wrapper>
    );
  }
}
