import React, { Component } from "react";

import { ReviewDiv } from "../Profile.style";
import ReviewSection from "./ReviewSection";
import { SectionTitle } from "./ReviewSection.style";

class DetailedAnswers extends Component {
  render() {
    const { isTablet, isMobile, reviewDetails, summary, level } = this.props;

    const { category } = summary;

    return (
      <ReviewDiv isTablet={isTablet} isMobile={isMobile}>
        <SectionTitle>Detailed answers by workers</SectionTitle>
        {/* KEY RATINGS SECTION */}
        {reviewDetails.map(
          section =>
            section._id === "Key ratings" && (
              <ReviewSection
                level={level}
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
                level={level}
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
                level={level}
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
                level={level}
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
                level={level}
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
                level={level}
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
                level={level}
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
