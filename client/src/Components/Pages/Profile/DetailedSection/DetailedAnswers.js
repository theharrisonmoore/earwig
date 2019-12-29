import React, { Component } from "react";

import axios from "axios";

import { message } from "antd";
import { ReviewDiv } from "../Profile.style";
import ReviewSection from "./ReviewSection";
import { SectionTitle } from "./ReviewSection.style";

class DetailedAnswers extends Component {
  state = {
    commentsOpen: false,
    commentsQuestion: null,
    comments: null,
    commentsLoaded: false,
  };

  // comments are disabled (will keep this until the testing finish)
  toggleComments = question => {
    const { commentsOpen } = this.state;
    // reset loading state and toggle comments box
    this.setState({ commentsLoaded: false, commentsOpen: !commentsOpen });
    this.fetchComments(question);
  };

  fetchComments = question => {
    const { summary } = this.props;
    const { _id: organizationID } = summary;
    const { _id: questionID } = question;

    // fetch comments
    axios
      .post("/api/comments", { organizationID, questionID })
      .then(res => {
        this.setState({
          comments: res.data,
          commentsLoaded: true,
          commentsQuestion: question,
        });
        console.log(res.data, "-------------");
      })
      .catch(err => {
        const error =
          err.response && err.response.data && err.response.data.error;
        message.error(error || "Something went wrong");
      });
  };

  render() {
    const { isTablet, isMobile, reviewDetails, summary } = this.props;

    const { category } = summary;

    return (
      <ReviewDiv isTablet={isTablet} isMobile={isMobile}>
        <SectionTitle>Detailed answers by workers</SectionTitle>
        {/* KEY RATINGS SECTION */}
        {reviewDetails.map(
          section =>
            section._id === "Key ratings" && (
              <ReviewSection
                key={section._id}
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
          section =>
            section._id === "Getting on to site" && (
              <ReviewSection
                key={section._id}
                category={category}
                sectionDetails={section}
                toggleComments={this.toggleComments}
                summary={summary}
                isMobile={isMobile}
                reviewDetails={reviewDetails}
              />
            )
        )}

        {reviewDetails.map(
          section =>
            section._id === "Working on the site" && (
              <ReviewSection
                key={section._id}
                category={category}
                sectionDetails={section}
                toggleComments={this.toggleComments}
                summary={summary}
                isMobile={isMobile}
              />
            )
        )}

        {reviewDetails.map(
          section =>
            section._id === "The site welfare" && (
              <ReviewSection
                key={section._id}
                category={category}
                sectionDetails={section}
                toggleComments={this.toggleComments}
                summary={summary}
                isMobile={isMobile}
              />
            )
        )}

        {reviewDetails.map(
          section =>
            section._id === "Detailed ratings" && (
              <ReviewSection
                key={section._id}
                category={category}
                sectionDetails={section}
                toggleComments={this.toggleComments}
                summary={summary}
                isMobile={isMobile}
              />
            )
        )}

        {reviewDetails.map(
          section =>
            section._id === "Supervisors & employees" && (
              <ReviewSection
                key={section._id}
                category={category}
                sectionDetails={section}
                toggleComments={this.toggleComments}
                summary={summary}
                isMobile={isMobile}
              />
            )
        )}
        {reviewDetails.map(
          section =>
            section._id === "Tools & materials" && (
              <ReviewSection
                key={section._id}
                category={category}
                sectionDetails={section}
                toggleComments={this.toggleComments}
                summary={summary}
                isMobile={isMobile}
              />
            )
        )}
        {/* MONTHLY REVIEWS
{level > 0 && (
  <MonthlyReviews
  category={category}
  reviewsByMonth={this.reviewsByMonth()}
  />
)} */}
      </ReviewDiv>
    );
  }
}
export default DetailedAnswers;
