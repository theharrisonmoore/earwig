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
  updateUserPoints,
  updatedUsers,
  counters,
  setCounters,
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
          updateUserPoints={updateUserPoints}
          updatedUsers={updatedUsers}
          counters={counters}
          setCounters={setCounters}
        />
      )}
    </>
  );
};

export default DetailedSection;
