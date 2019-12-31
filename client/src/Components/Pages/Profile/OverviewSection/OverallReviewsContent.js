import React from "react";
import moment from "moment";

import Rate from "../../../Common/Rate";
import { REPORT_CONTENT_URL } from "../../../../constants/naviagationUrls";

import Icon from "../../../Common/Icon/Icon";
import RepliesAndCommentsCollaps from "../../../Common/RepliesAndCommentsCollaps";

import { colors } from "../../../../theme";
import ActionButtonsWrapper from "./ActionButtonsWrapper";
import UserInfo from "../../../Common/UserInfo";
import { addSearchParamsToLink } from "../../../../helpers";
import {
  CommentDiv,
  CommentBubble,
  CommentDate,
  BubbleAndDate,
  RatingWithUserInfo,
} from "../Profile.style";

import VoiceReview from "../ProfileAnswers/VoiceReview";

import Replies from "./Replies";

export default ({
  bgColor,
  written,
  text,
  audio,
  time,
  rate,
  helpedUsers,
  userPoints,
  // the logged in user _id
  userId,
  category,
  level,
  reviewId,
  target,
  reviewOrganizationId,
  adminReplied,
  updatedUsers,
  repliesCount,
  replies,
  activeKey,
  orgId,
  orgName,
  togglePanel,
  toggleHelpful,
  goTOReply,
  ownerTrade,
  ownerId,
  ownerUserId,
  isOpen,
  isLiked,
  isLikedByUser,
  showRate,
}) => {
  const overallParams = {
    target,
    // review.user.userId
    reportedReviewUserId: ownerUserId,
    // review.overallReview.text
    reportedReviewText: text,
    orgId,
    orgName,
  };

  const overallReportLink = addSearchParamsToLink(
    overallParams,
    REPORT_CONTENT_URL
  );

  return (
    <CommentDiv>
      <BubbleAndDate>
        <CommentBubble bgColor={bgColor}>
          {written && text}
          {audio && <VoiceReview filename={text} />}
        </CommentBubble>
        <CommentDate>{moment().diff(time, "weeks")}w</CommentDate>
        {audio && (
          <Icon
            icon="voiceRecord"
            width="36px"
            height="48px"
            color={colors.profileFontColor}
          />
        )}
      </BubbleAndDate>
      <RatingWithUserInfo style={{ display: "flex" }}>
        {showRate && <Rate rate={rate} />}
        <UserInfo
          userId={ownerUserId}
          trade={ownerTrade}
          helpedUsers={helpedUsers}
          points={userPoints}
          showVerifiedIcon
        />
      </RatingWithUserInfo>
      {/*  BUTTONS SECTION */}
      <ActionButtonsWrapper
        // _id
        loggedinUserID={userId}
        ownerID={ownerId}
        onClickHelpful={level >= 1 ? toggleHelpful : undefined}
        reviewId={reviewId}
        reviewOrganizationId={reviewOrganizationId}
        category={category}
        isLiked={isLiked}
        isLikedByUser={isLikedByUser}
        adminReplied={adminReplied}
        goTOReply={goTOReply}
        orgId={orgId}
        level={level}
        reportLink={overallReportLink}
        target={target}
      />
      {repliesCount ? (
        <RepliesAndCommentsCollaps
          id={reviewId}
          isOpen={isOpen}
          panelKey={`${reviewId}/${target}`}
          count={repliesCount}
          activeKey={activeKey}
          onToggle={togglePanel}
        >
          <Replies
            replies={replies}
            level={level}
            userId={userId}
            updatedUsers={updatedUsers}
            category={category}
            orgId={orgId}
            orgName={orgName}
            text={text}
            ownerUserId={ownerUserId}
          />
        </RepliesAndCommentsCollaps>
      ) : null}
    </CommentDiv>
  );
};
