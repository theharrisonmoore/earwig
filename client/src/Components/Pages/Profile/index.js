import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";

import ReviewSection from "./ReviewSection";
import MonthlyReviews from "./ProfileAnswers/MonthlyReviews";
import CommentsBox from "./ProfileAnswers/CommentsBox";
import HeaderSection from "./HeaderSection";
import Loading from "./../../Common/AntdComponents/Loading";

import { ITEMS } from "./../../../constants/promoItems";
import { SIGNUP_URL } from "./../../../constants/naviagationUrls";
import { REPORT_CONTENT_URL } from "./../../../constants/naviagationUrls";

import {
  Wrapper,
  Banner,
  CommentDiv,
  UserID,
  CommentBubble,
  CommentDate,
  BubbleAndDate,
  ReviewDiv,
  AccountIcon,
  AccountPromo,
  AccountLink,
  AccountItem,
  StyledAntIcon
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
    commentsLoaded: false,
    level: 0,
    organizationID: ""
  };

  fetchData = () => {
    const organizationID = window.location.href.split("/")[4];

    axios
      .post("/api/profile", { organizationID })
      .then(res => {
        const { summary, reviewDetails, level } = res.data;

        this.setState({
          summary: summary[0],
          reviewDetails,
          level,
          loaded: true
        });
      })
      .catch(err => {
        console.log(err);
      });
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
      commentsLoaded,
      level
    } = this.state;

    const { isTablet, isMobile } = this.props;

    if (!loaded) return <Loading />;

    const { category, name } = summary;

    return (
      <Wrapper isMobile={isMobile}>
        <Banner category={category}>
          <p>
            <span>{category}:</span> {name}
          </p>
        </Banner>
        <HeaderSection
          isTablet={isTablet}
          isMobile={isMobile}
          summary={summary}
          level={level}
        />
        {/* BASIC VIEW FOR LOGGED OUT USERS */}
        {level < 1 && (
          <ReviewDiv isTablet={isTablet} isMobile={isMobile}>
            <ReviewSection
              category={category}
              sectionDetails={{ _id: "Key ratings" }}
              summary={summary}
            />
            <AccountPromo>
              <p>Create an account to see more detail, including:</p>
              <div>
                {ITEMS[category] &&
                  ITEMS[category].map((item, index) => (
                    <AccountItem key={index}>
                      <AccountIcon
                        src="/icons/tick-icon.svg"
                        margin="0 1rem 0 0"
                      />
                      <p>{item}</p>
                    </AccountItem>
                  ))}
              </div>
              <AccountLink to={SIGNUP_URL} category={category}>
                Create an account now >
              </AccountLink>
            </AccountPromo>
          </ReviewDiv>
        )}
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
                  isMobile={isMobile}
                />
              )
          )}

          {/* OTHER SECTIONS */}
          {reviewDetails.map(
            (section, index) =>
              section._id === "Detailed ratings" && (
                <ReviewSection
                  key={index}
                  category={category}
                  sectionDetails={section}
                  toggleComments={this.toggleComments}
                  summary={summary}
                  isMobile={isMobile}
                />
              )
          )}

          {reviewDetails.map(
            (section, index) =>
              section._id === "Getting on to site" && (
                <ReviewSection
                  key={index}
                  category={category}
                  sectionDetails={section}
                  toggleComments={this.toggleComments}
                  summary={summary}
                  isMobile={isMobile}
                />
              )
          )}

          {reviewDetails.map(
            (section, index) =>
              section._id === "Working on the site" && (
                <ReviewSection
                  key={index}
                  category={category}
                  sectionDetails={section}
                  toggleComments={this.toggleComments}
                  summary={summary}
                  isMobile={isMobile}
                />
              )
          )}

          {reviewDetails.map(
            (section, index) =>
              section._id === "The site welfare" && (
                <ReviewSection
                  key={index}
                  category={category}
                  sectionDetails={section}
                  toggleComments={this.toggleComments}
                  summary={summary}
                  isMobile={isMobile}
                />
              )
          )}

          {reviewDetails.map(
            (section, index) =>
              section._id === "Supervisors & employees" && (
                <ReviewSection
                  key={index}
                  category={category}
                  sectionDetails={section}
                  toggleComments={this.toggleComments}
                  summary={summary}
                  isMobile={isMobile}
                />
              )
          )}

          {reviewDetails.map(
            (section, index) =>
              section._id === "Tools & materials" && (
                <ReviewSection
                  key={index}
                  category={category}
                  sectionDetails={section}
                  toggleComments={this.toggleComments}
                  summary={summary}
                  isMobile={isMobile}
                />
              )
          )}

          {/* MONTHLY REVIEWS */}
          {level > 0 && (
            <MonthlyReviews
              category={category}
              reviewsByMonth={this.reviewsByMonth()}
            />
          )}
        </ReviewDiv>
        {/* OVERALL RATINGS SECTION */}
        {summary.reviews[0].createdAt && (
          <ReviewDiv isTablet={isTablet} isMobile={isMobile}>
            <SectionTitle>Overall ratings</SectionTitle>
            {summary.reviews.map((review, index) => (
              <CommentDiv key={index}>
                <UserID>{review.user && review.user.userId}</UserID>
                <BubbleAndDate>
                  <CommentBubble>{review.overallReview.text}</CommentBubble>
                  <CommentDate>
                    {moment().diff(review.createdAt, "weeks")}w
                  </CommentDate>
                </BubbleAndDate>
                <Link
                  to={{
                    pathname: REPORT_CONTENT_URL,
                    state: {
                      review: {
                        overallReview: review.overallReview,
                        user: review.user
                      },
                      organization: summary,
                      target: "overallReview"
                    }
                  }}
                >
                  <StyledAntIcon type="flag" />
                </Link>
              </CommentDiv>
            ))}
          </ReviewDiv>
        )}
        <ReviewDiv isTablet={isTablet} isMobile={isMobile}>
          <AccountPromo>
            <p>Create an account to see all reviews</p>
            <AccountLink to={SIGNUP_URL} category={category}>
              Create an account now >
            </AccountLink>
          </AccountPromo>
        </ReviewDiv>
        {/* COMMENTS BOX */}
        {commentsOpen && (
          <CommentsBox
            organization={summary}
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
