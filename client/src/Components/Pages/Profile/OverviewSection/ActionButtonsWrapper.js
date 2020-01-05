import React from "react";

import ReportFlag from "../../../Common/ReportFlag";

import Icon from "../../../Common/Icon/Icon";

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
  reviewOrganizationId,
  category,
  level,
  adminReplied,
  goTOReply,
  orgId,
  // liked in general (from backend)
  isLiked,
  // liked now by user, for animation
  isLikedByUser,
  reportLink,
  target,
}) => {
  return (
    <ActionsDiv>
      <ButtonsWrapper>
        {ownerID !== loggedinUserID && level >= 3 && (
          <LikeWrapper
            as="button"
            onClick={onClickHelpful}
            id={reviewId}
            data-user-id={ownerID}
            data-organization={reviewOrganizationId}
            data-target={target}
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
        {adminReplied !== true && level >= 2 && (
          <CommentIconWrapper
            onClick={level >= 2 ? goTOReply : undefined}
            data-target={target}
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
      {/* report overall/voice review */}
      {level >= 1 && (
        <ReportFlag
          style={{ right: 0, width: "10%" }}
          to={reportLink}
          disabled={level < 1}
        />
      )}
    </ActionsDiv>
  );
};

export default ActionButtonsWrapper;
