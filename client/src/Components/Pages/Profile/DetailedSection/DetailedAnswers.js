import React from "react";

import { ReviewDiv } from "../Profile.style";
import ReviewSection from "./ReviewSection";

const DetailedAnswers = ({
  isTablet,
  isMobile,
  reviewDetails,
  summary,
  toggleComments,
}) => {
  const { category } = summary;

  return (
    <ReviewDiv isTablet={isTablet} isMobile={isMobile}>
      {/* KEY RATINGS SECTION */}
      {reviewDetails.map(
        section =>
          section._id === "Key ratings" && (
            <ReviewSection
              key={section._id}
              category={category}
              sectionDetails={section}
              toggleComments={toggleComments}
              summary={summary}
              isMobile={isMobile}
            />
          )
      )}
      {/* OTHER SECTIONS */}
      {reviewDetails.map(
        section =>
          section._id === "Detailed ratings" && (
            <ReviewSection
              key={section._id}
              category={category}
              sectionDetails={section}
              toggleComments={toggleComments}
              summary={summary}
              isMobile={isMobile}
            />
          )
      )}
      {reviewDetails.map(
        section =>
          section._id === "Getting on to site" && (
            <ReviewSection
              key={section._id}
              category={category}
              sectionDetails={section}
              toggleComments={toggleComments}
              summary={summary}
              isMobile={isMobile}
              reviewDetails={reviewDetails}
            />
          )
      )}
      {reviewDetails.map(
        section =>
          section._id === "Working on this site" && (
            <ReviewSection
              key={section._id}
              category={category}
              sectionDetails={section}
              toggleComments={toggleComments}
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
              toggleComments={toggleComments}
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
              toggleComments={toggleComments}
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
              toggleComments={toggleComments}
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
};

export default DetailedAnswers;
