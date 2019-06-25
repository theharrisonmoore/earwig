import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import { message } from "antd";

import ReviewSection from "./ReviewSection";
import MonthlyReviews from "./ProfileAnswers/MonthlyReviews";
import CommentsBox from "./ProfileAnswers/CommentsBox";
import HeaderSection from "./HeaderSection";
import OverallReview from "./OverallReview";
import Loading from "./../../Common/AntdComponents/Loading";

import { ITEMS } from "./../../../constants/promoItems";
import { SIGNUP_URL } from "./../../../constants/naviagationUrls";
import { API_GET_OVERALL_REVIEW_REPLIES_URL } from "./../../../apiUrls";

import Icon from "./../../Common/Icon/Icon";

import {
  Wrapper,
  Banner,
  ReviewDiv,
  AccountPromo,
  AccountLink,
  AccountItem
} from "./Profile.style";

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
    organizationID: "",
    overallReplies: [],
    activeOverallId: "",
    reviewsLast30Days: []
  };

  fetchData = () => {
    const organizationID = window.location.href.split("/")[4];

    axios
      .post("/api/profile", { organizationID })
      .then(res => {
        const { summary, reviewDetails, level, reviewsLast30Days } = res.data;

        this.setState({
          summary: summary[0],
          reviewDetails,
          level,
          loaded: true,
          organizationID,
          reviewsLast30Days
        });
      })
      .catch(err => {
        const error =
          err.response && err.response.data && err.response.data.error;
        message.error(error || "Something went wrong");
      });
  };

  getCarCost = () => {
    const { reviewDetails } = this.state;

    // get the car parking cost question
    const carSection = reviewDetails
      .filter(section => section._id === null)
      .map(item =>
        item.questions.filter(
          question =>
            question.question.text === "How much did car parking cost per day?"
        )
      );

    if (!carSection || carSection.length < 1) return;

    // work out the average cost from the answers
    const average = carSection[0][0].answers
      .map(answer => answer.answer)
      .reduce((accum, curr) => (accum + curr) / 2);

    return average > 0 ? average : "Free";
  };

  updateLastViewed = () => {
    const organizationID = window.location.href.split("/")[4];

    axios.post("/api/update-last-viewed", { id: organizationID }).catch(err => {
      const error =
        err.response && err.response.data && err.response.data.error;
      message.error(error || "Something went wrong");
    });
  };

  componentDidMount() {
    this.fetchData();
    this.updateLastViewed();
  }

  componentDidUpdate(prevProps, prevState) {
    const organizationID = window.location.href.split("/")[4];

    if (organizationID !== this.state.organizationID) {
      this.fetchData();
    }
  }

  toggleComments = question => {
    const { commentsOpen } = this.state;
    // reset loading state and toggle comments box
    this.setState({ commentsLoaded: false, commentsOpen: !commentsOpen });
    this.fetchComments(question);
  };

  fetchComments = question => {
    const { summary } = this.state;
    const { _id: organizationID } = summary;
    const { _id: questionID } = question;

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
      .catch(err => {
        const error =
          err.response && err.response.data && err.response.data.error;
        message.error(error || "Something went wrong");
      });
  };

  fetchOverallReplies = id => {
    id
      ? axios
          .get(`${API_GET_OVERALL_REVIEW_REPLIES_URL}/${id}`)
          .then(({ data }) => {
            this.setState({ overallReplies: data, activeOverallId: id });
          })
          .catch(err => {
            const error =
              err.response && err.response.data && err.response.data.error;
            message.error(error || "Something went wrong");
          })
      : this.setState({ overallReplies: [], activeOverallId: "" });
  };

  reviewsByMonth = () => {
    const { reviews, totalReviews } = this.state.summary;

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

    if (totalReviews === 0) return reviewMonthsCount;

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
      level,
      reviewsLast30Days
    } = this.state;

    const { isTablet, isMobile, verified } = this.props;

    if (!loaded) return <Loading />;

    const { category, name } = summary;

    return (
      <Wrapper isMobile={isMobile}>
        <Banner category={category}>
          <p style={{ padding: "10px 5px", textAlign: "center" }}>
            <span>{category}:</span> {name}
          </p>
        </Banner>
        <HeaderSection
          isTablet={isTablet}
          isMobile={isMobile}
          summary={summary}
          level={level}
          reviewsLast30Days={reviewsLast30Days}
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
                      <Icon
                        icon={item.img}
                        margin="0 1rem 0 0"
                        height="2rem"
                        width="2rem"
                      />
                      {item.text}
                    </AccountItem>
                  ))}
              </div>
              <AccountLink
                to={{
                  pathname: SIGNUP_URL,
                  state: { from: this.props.location }
                }}
                category={category}
              >
                Create an account now >
              </AccountLink>
            </AccountPromo>
          </ReviewDiv>
        )}
        {reviewDetails.length < 1 && (
          <ReviewDiv isTablet={isTablet} isMobile={isMobile}>
            <ReviewSection
              category={category}
              sectionDetails={{ _id: "Key ratings" }}
              summary={summary}
            />
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
              section._id === "Getting onto site" && (
                <ReviewSection
                  key={index}
                  category={category}
                  sectionDetails={section}
                  toggleComments={this.toggleComments}
                  summary={summary}
                  isMobile={isMobile}
                  carParkingPrice={this.getCarCost}
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
        <OverallReview
          summary={summary}
          isTablet={isTablet}
          isMobile={isMobile}
          category={category}
          activeOverallId={this.state.activeOverallId}
          overallReplies={this.state.overallReplies}
          fetchOverallReplies={this.fetchOverallReplies}
          verified={verified}
          level={level}
        />
        {level < 1 && (
          <ReviewDiv isTablet={isTablet} isMobile={isMobile}>
            <AccountPromo>
              <p>Create an account to see all reviews</p>
              <AccountLink
                to={{
                  pathname: SIGNUP_URL,
                  state: { from: this.props.location }
                }}
                category={category}
              >
                Create an account now >
              </AccountLink>
            </AccountPromo>
          </ReviewDiv>
        )}
        {/* COMMENTS BOX */}
        {commentsOpen && (
          <CommentsBox
            organization={summary}
            question={commentsQuestion}
            comments={comments}
            commentsLoaded={commentsLoaded}
            toggleComments={this.toggleComments}
            isMobile={isMobile}
            fetchComments={this.fetchComments}
            category={category}
            verified={verified}
          />
        )}
      </Wrapper>
    );
  }
}
