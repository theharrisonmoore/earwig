import React from "react";

import DetailedAnswers from "./DetailedAnswers";

const DetailedSection = ({
  level,
  isMobile,
  isTablet,
  reviewDetails,
  summary,
  toggleComments,
  getCarCost,
}) => {
  return (
    <>
      {level > 0 && (
        <DetailedAnswers
          isTablet={isTablet}
          isMobile={isMobile}
          reviewDetails={reviewDetails}
          summary={summary}
          toggleComments={toggleComments}
          getCarCost={getCarCost}
        />
      )}
    </>
  );
};

export default DetailedSection;
