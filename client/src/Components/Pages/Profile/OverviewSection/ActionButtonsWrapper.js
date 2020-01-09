import React from "react";

import ReportFlag from "../../../Common/ReportFlag";

import Icon from "../../../Common/Icon/Icon";

import { colors } from "../../../../theme";

import { SIGNUP_URL } from "../../../../constants/naviagationUrls";

import {
  ActionsDiv,
  ButtonsWrapper,
  LikeWrapper,
  CommentIconWrapper
} from "../Profile.style";

import PopoverComponent from "../../../Common/Popover";

// renders pop up tooltip content
const getTooltipContent = type => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Icon
        icon={type}
        height="50"
        width="50"
        margin="1rem 0 1rem 0"
        fill={colors.gray}
      />
      {type === "like" &&
        "If you want to give workers points by liking their reviews, you first need to get verified as a worker. This protects the worker community from fake reviews and spam by non-workers."}
      {type === "comment" &&
        "If you want to post replies to workers, you first need to get verified as a worker. This protects the worker community from fake reviews and spam by non-workers."}
      {type === "flag" &&
        "If you want to report content, you first need to sign up using a valid email address so we can get back to you."}

      {type === "info" &&
        "Hang on! You can’t do this until we’ve checked your photo. Give us a few minutes. You might need to refresh your page."}
    </div>
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
  target
}) => {
  // decides what like functions to render
  function renderLikeIcon(level) {
    switch (level) {
      // user is verified and can like
      case 3 || 4:
        return (
          <LikeWrapper
            as="button"
            onClick={onClickHelpful}
            id={reviewId}
            data-user-id={ownerID}
            data-organization={reviewOrganizationId}
            data-target={target}
            data-category={category}
            active={isLikedByUser}
          >
            <Icon
              icon="like"
              fill={isLiked ? colors.primary : colors.gray}
              width="27"
              height="27"
            />
          </LikeWrapper>
        );

      // user awaits verification --> sees hold on popup
      case 2:
        return (
          <PopoverComponent
            popoverOptions={{
              text: getTooltipContent("info"),
              iconTooltip: {
                icon: "like",
                fill: colors.gray,
                width: "27",
                height: "27"
              },
              closeButton: true,
              margin: "1rem 0 0 0"
            }}
          />
        );
      // user has not undergone verification process --> sees get verified popover
      default:
        return (
          <PopoverComponent
            popoverOptions={{
              text: getTooltipContent("like"),
              iconTooltip: {
                icon: "like",
                fill: colors.gray,
                width: "27",
                height: "27"
              },
              actionButtonTxt: "Get verified",
              linkButtonOptions: {
                pathname: SIGNUP_URL,
                state: {
                  category,
                  orgId,
                  redirectToProfile: true
                }
              },
              closeButton: true,
              margin: "1rem 0 0 0"
            }}
          />
        );
    }
  }

  // decides what comment function to render
  function renderCommentButton(level) {
    switch (level) {
      // user is verified and can comment
      case 3 || 4:
        return (
          <CommentIconWrapper
            onClick={goTOReply}
            data-target={target}
            data-category={category}
            data-org-id={orgId}
            data-review-id={reviewId}
          >
            <Icon icon="comment" fill={colors.gray} width="27" height="27" />
          </CommentIconWrapper>
        );

      // user awaits verification --> sees hold on popup
      case 2:
        return (
          <PopoverComponent
            popoverOptions={{
              text: getTooltipContent("info"),
              iconTooltip: {
                icon: "comment",
                fill: colors.gray,
                width: "27",
                height: "27"
              },
              closeButton: true,
              margin: "1rem 0 0 3rem"
            }}
          />
        );
      // user has not undergone verification process --> sees get verified popover
      default:
        return (
          <PopoverComponent
            popoverOptions={{
              text: getTooltipContent("comment"),
              iconTooltip: {
                icon: "comment",
                fill: colors.gray,
                width: "27",
                height: "27"
              },
              actionButtonTxt: "Get verified",
              linkButtonOptions: {
                pathname: SIGNUP_URL,
                state: {
                  category,
                  orgId,
                  redirectToProfile: true
                }
              },
              closeButton: true,
              margin: "1rem 0 0 3rem"
            }}
          />
        );
    }
  }

  return (
    <ActionsDiv>
      <ButtonsWrapper>
        {/* LIKE FUNCTIONS */}
        {ownerID !== loggedinUserID && renderLikeIcon(level)}

        {/* COMMENT FUNCTIONS */}
        {adminReplied !== true && renderCommentButton(level)}
      </ButtonsWrapper>

      {/* FLAG ICON */}
      {/* report overall/voice review */}
      {loggedinUserID ? (
        // if user is signed up they can report content
        <ReportFlag style={{ right: 0, width: "10%" }} to={reportLink} />
      ) : (
        // if not registered they see popover with sign up prompt
        <PopoverComponent
          popoverOptions={{
            text: getTooltipContent("flag"),
            iconTooltip: {
              icon: "flag",
              fill: colors.gray,
              width: "27",
              height: "27"
            },
            actionButtonTxt: "Sign up",
            linkButtonOptions: {
              pathname: SIGNUP_URL,
              state: {
                category,
                orgId,
                redirectToProfile: true
              }
            },
            closeButton: true,
            margin: "1rem 0 0 3rem"
          }}
        />
      )}
    </ActionsDiv>
  );
};

export default ActionButtonsWrapper;
