import React from "react";

import ReportFlag from "../../../Common/ReportFlag";

import Icon from "../../../Common/Icon/Icon";

import { REPORT_CONTENT_URL } from "../../../../constants/naviagationUrls";

import { colors } from "../../../../theme";

import {
  ActionsDiv,
  ButtonsWrapper,
  LikeWrapper,
  CommentIconWrapper,
} from "../Profile.style";

const ActionButtonsWrapper = ({
  loggedinUserID,
  ownerID,
  onClickHelpful,
  reviewId,
  reviewCategory,
  reviewOrganizationId,
  category,
  level,
  adminReplied,
  goTOReply,
  overallReview,
  owner,
  orgId,
  orgName,
  // liked in general (from backend)
  isLiked,
  // liked now by user, for animation
  isLikedByUser,
}) => {
  return (
    <ActionsDiv>
      <ButtonsWrapper>
        {ownerID !== loggedinUserID && (
          <LikeWrapper
            as="button"
            onClick={onClickHelpful}
            id={reviewId}
            data-user-id={ownerID}
            data-type={reviewCategory}
            data-organization={reviewOrganizationId}
            data-target={
              reviewCategory === "written" ? "overallReview" : "voiceReview"
            }
            data-category={category}
            disabled={level < 2}
            active={isLikedByUser}
          >
            <Icon
              icon="like"
              fill={isLiked ? colors.primary : colors.gray}
              width="27"
              height="27"
            />
          </LikeWrapper>
        )}
        {adminReplied !== true && (
          <CommentIconWrapper
            onClick={level >= 2 ? goTOReply : undefined}
            data-target={
              reviewCategory === "written" ? "overallReview" : "voiceReview"
            }
            data-category={category}
            data-org-id={orgId}
            data-review-id={reviewId}
            disabled={level < 2}
          >
            <Icon icon="comment" fill={colors.gray} width="27" height="27" />
          </CommentIconWrapper>
        )}
      </ButtonsWrapper>

      {/* FLAG ICON */}
      <ReportFlag
        style={{ right: 0, width: "10%" }}
        to={{
          pathname: REPORT_CONTENT_URL,
          state: {
            review: {
              overallReview,
              user: owner,
            },
            orgId,
            orgName,
            target:
              reviewCategory === "written" ? "overallReview" : "voiceReview",
          },
        }}
        disabled={level < 1}
      />
    </ActionsDiv>
  );
};

export default ActionButtonsWrapper;
