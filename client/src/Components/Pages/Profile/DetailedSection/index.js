import React from "react";

import DetailedAnswers from "./DetailedAnswers";

const DetailedSection = ({
  level,
  isMobile,
  isTablet,
  reviewDetails,
  summary,
  id,
  userId,
}) => {
  return (
    <>
      {level > 0 && (
        <DetailedAnswers
          isTablet={isTablet}
          isMobile={isMobile}
          reviewDetails={reviewDetails}
          summary={summary}
          level={level}
          id={id}
          userId={userId}
        />
      )}
    </>
  );
};

export default DetailedSection;
