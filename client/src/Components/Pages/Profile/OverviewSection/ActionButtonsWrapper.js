import React from "react";

import ReportFlag from "../../../Common/ReportFlag";

import Icon from "../../../Common/Icon/Icon";

import { colors } from "../../../../theme";

import {
  SIGNUP_URL,
  LOGIN_URL,
  UPLOAD_VERIFICATION_PHOTO
} from "../../../../constants/naviagationUrls";

import {
  ActionsDiv,
  ButtonsWrapper,
  LikeWrapper,
  CommentIconWrapper
} from "../Profile.style";

import PopoverComponent from "../../../Common/Popover";

// renders pop up tooltip and icon
const getTooltipText = type => {
  return (
    <>
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
      {type === "report" &&
        "If you want to report content, you first need to sign up using a valid email address so we can get back to you."}

      {type === "awaitingVerification" &&
        "Hang on! You can’t do this until we’ve checked your photo. Give us a few minutes. You might need to refresh your page."}
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
  target
}) => {
  //  takes user level and photo and decides what form of like functionality to render

  const renderLikeIcon = level => {
    console.log("levellll", level);
    switch (level) {
      // user is verified and can use like button
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
        );

      // user awaits verification --> sees hold on popup
      case 2:
        return (
          <PopoverComponent
            popoverOptions={{
              text: getTooltipText("awaitingVerification"),
              iconTooltip: {
                icon: "like",
                fill: colors.gray,
                width: "27",
                height: "27"
              },

              margin: "1rem 0 0 0"
            }}
          />
        );
      // user has not undergone verification process --> sees get verified popover
      default:
        return (
          <PopoverComponent
            popoverOptions={{
              text: getTooltipText("like"),
              iconTooltip: {
                icon: "like",
                fill: colors.gray,
                width: "27",
                height: "27"
              },
              actionButtonTxt: "Get verified",
              linkButtonOptions: {
                pathname: level >= 1 ? UPLOAD_VERIFICATION_PHOTO : SIGNUP_URL,
                state: {
                  category,
                  orgId,
                  redirectToProfile: true
                }
              },
              margin: "1rem 0 0 0"
            }}
          />
        );
    }
  };

  return (
    <ActionsDiv>
      <ButtonsWrapper>
        {ownerID !== loggedinUserID && renderLikeIcon(level)
        // LIKE FUNCTIONS
        }

        {adminReplied !== true &&
          // COMMENT FUNCTIONS
          // verified users can comment
          (level >= 3 ? (
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
          ) : (
            // non verified users see popover
            <PopoverComponent
              popoverOptions={{
                text: getTooltipText("comment"),
                iconTooltip: {
                  icon: "comment",
                  fill: colors.gray,
                  width: "27",
                  height: "27"
                },
                actionButtonTxt: "Get verified",
                linkButtonOptions: {
                  pathname: level >= 1 ? UPLOAD_VERIFICATION_PHOTO : SIGNUP_URL,
                  state: {
                    category,
                    orgId,
                    redirectToProfile: true
                  }
                },
                margin: "1rem 0 0 3rem"
              }}
            />
          ))}
      </ButtonsWrapper>

      {/* FLAG ICON */}
      {/* report overall/voice review */}
      {level >= 1 ? (
        // if user is signed up they can report content
        <ReportFlag
          style={{ right: 0, width: "10%" }}
          to={reportLink}
          disabled={level < 1}
        />
      ) : (
        // if not registered they see popover
        <PopoverComponent
          popoverOptions={{
            text: getTooltipText("report"),
            iconTooltip: {
              icon: "flag",
              fill: colors.gray,
              width: "27",
              height: "27"
            },
            actionButtonTxt: "Sign up",
            linkButtonOptions: {
              pathname: level >= 1 ? UPLOAD_VERIFICATION_PHOTO : SIGNUP_URL,
              state: {
                category,
                orgId,
                redirectToProfile: true
              }
            },
            margin: "1rem 0 0 3rem"
          }}
        />
      )}
    </ActionsDiv>
  );
};

export default ActionButtonsWrapper;
