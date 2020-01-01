import React, { Component } from "react";

import { ReviewDiv } from "../Profile.style";
import ReviewSection from "./ReviewSection";
import { SectionTitle } from "./ReviewSection.style";

class DetailedAnswers extends Component {
  render() {
    const {
      isTablet,
      isMobile,
      reviewDetails,
      summary,
      level,
      id,
      userId,
      updateUserPoints,
      updatedUsers,
    } = this.props;

    const { category } = summary;

    return (
      <ReviewDiv isTablet={isTablet} isMobile={isMobile}>
        <SectionTitle>Detailed answers by workers</SectionTitle>
        {/* KEY RATINGS SECTION */}
        {reviewDetails.map(
          section =>
            section._id === "Key ratings" && (
              <ReviewSection
                updateUserPoints={updateUserPoints}
                updatedUsers={updatedUsers}
                level={level}
                key={section._id}
                category={category}
                sectionDetails={section}
                id={id}
                userId={userId}
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
                updateUserPoints={updateUserPoints}
                updatedUsers={updatedUsers}
                level={level}
                key={section._id}
                category={category}
                sectionDetails={section}
                id={id}
                userId={userId}
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
                updateUserPoints={updateUserPoints}
                updatedUsers={updatedUsers}
                level={level}
                key={section._id}
                category={category}
                sectionDetails={section}
                id={id}
                userId={userId}
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
                updateUserPoints={updateUserPoints}
                updatedUsers={updatedUsers}
                level={level}
                key={section._id}
                category={category}
                sectionDetails={section}
                id={id}
                userId={userId}
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
                updateUserPoints={updateUserPoints}
                updatedUsers={updatedUsers}
                level={level}
                key={section._id}
                category={category}
                sectionDetails={section}
                id={id}
                userId={userId}
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
                updateUserPoints={updateUserPoints}
                updatedUsers={updatedUsers}
                level={level}
                key={section._id}
                category={category}
                sectionDetails={section}
                id={id}
                userId={userId}
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
                updateUserPoints={updateUserPoints}
                updatedUsers={updatedUsers}
                level={level}
                key={section._id}
                category={category}
                sectionDetails={section}
                id={id}
                userId={userId}
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
