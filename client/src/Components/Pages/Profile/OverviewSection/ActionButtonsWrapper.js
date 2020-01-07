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

import PopoverComponent from "../../../Common/Popover";

const getTooltipText = () => {
  return (
    <>
      <Icon
        icon="getVerified"
        height="25"
        width="25"
        margin="0 0.5rem 0 0"
        fill={colors.profileFontColor}
      />
      <p>
        earwig is free for workers. All we ask is that you get verified as a
        genuine worker. This means all reviews are credible and protects the
        worker community from fake reviews and spam by non-workers.
      </p>
      <p>
        You can hold up any card or ticket that shows you are a worker, eg CSCS
        card.
      </p>
    </>
  );
};

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
  history,
}) => {
  return (
    <ActionsDiv>
      <ButtonsWrapper>
        {ownerID !== loggedinUserID &&
          (level >= 3 ? (
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
          ) : (
            <PopoverComponent
              popoverOptions={{
                text: getTooltipText(),
                iconTooltip: {
                  icon: "like",
                  fill: colors.gray,
                  width: "27",
                  height: "27",
                },
                margin: "1rem 0 0 0",
              }}
              history={history && history}
            ></PopoverComponent>
          ))}

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
