import React, { Component } from "react";
import axios from "axios";
import moment from "moment";

import ReviewSection from "./ReviewSection";
import BarAnswer from "./ProfileAnswers/BarAnswer";
import CommentsBox from "./ProfileAnswers/CommentsBox";
import GiveReview from "./../../Common/GiveReview";

import { StarRateCreator } from "./../../../helpers";

import {
  Wrapper,
  Banner,
  Header,
  CompanyDetails,
  CompanyDiv,
  ButtonDiv,
  OrgButton,
  ReviewDiv,
  GiveReviewTitle,
  GiveReviewDiv,
  Icon,
  CompanyNameAndStars,
  CommentDiv,
  UserID,
  CommentBubble,
  CommentDate,
  BubbleAndDate,
  StarWrapper,
  CompanyTitle,
  Reviews
} from "./Profile.style";

import { SectionTitle } from "./ReviewSection.style";

export default class Profile extends Component {
  state = {
    summary: null,
    reviewDetails: null,
    loaded: false,
    commentsOpen: false,
    commentsQuestion: null,
    comments: null,
    commentsLoaded: false
  };

  fetchData = () => {
    const organizationID = window.location.href.split("/")[4];

    axios
      .post("/api/profile", { organizationID })
      .then(res => {
        const { summary, reviewDetails } = res.data;

        this.setState({ summary: summary[0], reviewDetails, loaded: true });
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this.fetchData();
  }

  toggleComments = question => {
    const { commentsOpen, summary } = this.state;
    const { _id: organizationID } = summary;
    const { _id: questionID } = question;

    // reset loading state and toggle comments box
    this.setState({ commentsLoaded: false, commentsOpen: !commentsOpen });

    // fetch comments
    axios
      .post("/api/comments", { organizationID, questionID })
      .then(res => {
        this.setState({
          comments: res.data,
          commentsLoaded: true,
          commentsQuestion: question
        });

        console.log(res.data);
      })
      .catch(err => console.log(err));
  };

  reviewsByMonth = () => {
    const { reviews } = this.state.summary;

    const reviewMonths = reviews.map(review =>
      moment(review.createdAt).format("MMM")
    );

    let reviewMonthsCount = {
      Jan: 0,
      Feb: 0,
      Mar: 0,
      Apr: 0,
      May: 0,
      Jun: 0,
      Jul: 0,
      Aug: 0,
      Sep: 0,
      Oct: 0,
      Nov: 0,
      Dec: 0
    };

    reviewMonths.map(month => (reviewMonthsCount[month] += 1));

    return reviewMonthsCount;
  };

  render() {
    const {
      summary,
      reviewDetails,
      loaded,
      commentsOpen,
      commentsQuestion,
      comments,
      commentsLoaded
    } = this.state;
    if (!loaded) return <h1>Loading...</h1>;

    const {
      category,
      name,
      email,
      phoneNumber,
      totalReviews,
      websiteURL
    } = summary;

    const { isTablet, isMobile } = this.props;

    return (
      <Wrapper isMobile={isMobile}>
        <Banner category={category}>
          <p>
            <span>{category}:</span> {name}
          </p>
        </Banner>
        <Header isTablet={isTablet} isMobile={isMobile}>
          <CompanyDetails isTablet={isTablet} isMobile={isMobile}>
            <CompanyDiv isMobile={isMobile}>
              <Icon
                src={`/icons/${category}-icon-desktop.svg`}
                margin="0 1rem 0 0"
              />
              <CompanyNameAndStars>
                <CompanyTitle>{name}</CompanyTitle>
                <StarWrapper>
                  {StarRateCreator(summary)}
                  <Reviews>{totalReviews} reviews</Reviews>
                </StarWrapper>
              </CompanyNameAndStars>
            </CompanyDiv>
            <ButtonDiv isTablet={isTablet} isMobile={isMobile}>
              <a href={`tel:${phoneNumber}`}>
                <OrgButton category={category} isMobile={isMobile}>
                  Call
                </OrgButton>
              </a>
              <a href={`mailto:${email}`}>
                <OrgButton category={category} isMobile={isMobile}>
                  Email
                </OrgButton>
              </a>
              <a
                href={`${websiteURL}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <OrgButton category={category} isMobile={isMobile}>
                  Website
                </OrgButton>
              </a>
            </ButtonDiv>
          </CompanyDetails>
          <GiveReviewDiv>
            <GiveReviewTitle>Give a review about {name}</GiveReviewTitle>
            <GiveReview
              category={category}
              isTablet={isTablet}
              isMobile={isMobile}
            />
          </GiveReviewDiv>
        </Header>
        <ReviewDiv isTablet={isTablet} isMobile={isMobile}>
          {/* KEY RATINGS SECTION */}
          {reviewDetails.map(
            (section, index) =>
              section._id === "Key ratings" && (
                <ReviewSection
                  key={index}
                  category={category}
                  sectionDetails={section}
                  toggleComments={this.toggleComments}
                  summary={summary}
                />
              )
          )}
          {/* OTHER SECTIONS */}
          {reviewDetails.map(
            (section, index) =>
              section._id !== "Key ratings" && (
                <ReviewSection
                  key={index}
                  category={category}
                  sectionDetails={section}
                  toggleComments={this.toggleComments}
                  summary={summary}
                />
              )
          )}

          <BarAnswer
            category={category}
            reviewsByMonth={this.reviewsByMonth()}
          />

          {/* OVERALL RATINGS SECTION */}
        </ReviewDiv>
        <ReviewDiv isTablet={isTablet} isMobile={isMobile}>
          <SectionTitle>Overall ratings</SectionTitle>
          {summary.reviews.map((review, index) => (
            <CommentDiv key={index}>
              <UserID>{review.user.userId}</UserID>
              <BubbleAndDate>
                <CommentBubble>{review.overallReview.text}</CommentBubble>
                <CommentDate>
                  {moment().diff(review.createdAt, "weeks")}w
                </CommentDate>
              </BubbleAndDate>
            </CommentDiv>
          ))}
        </ReviewDiv>
        {commentsOpen && (
          <CommentsBox
            question={commentsQuestion}
            comments={comments}
            commentsLoaded={commentsLoaded}
            toggleComments={this.toggleComments}
            isMobile={isMobile}
          />
        )}
      </Wrapper>
    );
  }
}
