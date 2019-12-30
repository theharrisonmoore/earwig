import React from "react";
import moment from "moment";

import Rate from "../../../Common/Rate";

import Icon from "../../../Common/Icon/Icon";
import RepliesAndCommentsCollaps from "../../../Common/RepliesAndCommentsCollaps";

import { colors } from "../../../../theme";
import ActionButtonsWrapper from "./ActionButtonsWrapper";
import UserInfo from "../../../Common/UserInfo";

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
  userId,
  isAuthorized,
  category,
  level,
  reviewId,
  reviewCategory,
  reviewOrganizationId,
  counters,
  adminReplied,
  updatedUsers,
  repliesCount,
  overallReplies,
  activeReview,
  activeOverallId,
  overallReview,
  orgId,
  orgName,
  togglePanel,
  toggleHelpful,
  goTOReply,
  owner,
  ownerTrade,
  ownerId,
  ownerUserId,
}) => {
  const isActive =
    activeReview === `${reviewId}/${reviewCategory}` &&
    activeOverallId === reviewId;

  const isLiked =
    counters[reviewCategory][reviewId] &&
    counters[reviewCategory][reviewId].counter > 0;

  const isLikedByUser = isLiked && counters[reviewCategory][reviewId].byUser;

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
        <Rate rate={rate} />
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
        loggedinUserID={userId}
        ownerID={ownerId}
        onClickHelpful={isAuthorized ? toggleHelpful : undefined}
        reviewId={reviewId}
        reviewCategory={reviewCategory}
        reviewOrganizationId={reviewOrganizationId}
        category={category}
        isLiked={isLiked}
        isLikedByUser={isLikedByUser}
        adminReplied={adminReplied}
        goTOReply={goTOReply}
        overallReview={overallReview}
        owner={owner}
        orgId={orgId}
        orgName={orgName}
        level={level}
      />
      {repliesCount ? (
        <RepliesAndCommentsCollaps
          id={reviewId}
          isActive={isActive}
          panelKey={`${reviewId}/${reviewCategory}`}
          count={repliesCount}
          activeKey={activeReview}
          onToggle={togglePanel}
        >
          <Replies
            overallReplies={overallReplies}
            level={level}
            userId={userId}
            updatedUsers={updatedUsers}
            category={category}
            overallReview={overallReview}
            owner={owner}
            orgId={orgId}
            orgName={orgName}
          />
        </RepliesAndCommentsCollaps>
      ) : null}
    </CommentDiv>
  );
};
