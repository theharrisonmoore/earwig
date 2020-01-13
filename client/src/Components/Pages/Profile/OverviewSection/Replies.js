import React from "react";
import moment from "moment";

import { addSearchParamsToLink } from "../../../../helpers";

import ReportFlag from "../../../Common/ReportFlag";
import InvisibleCommentAlert from "../../../Common/InvisibleCommentAlert";
import UserInfo from "../../../Common/UserInfo";
import { organizations } from "../../../../theme";
import { REPORT_CONTENT_URL } from "../../../../constants/naviagationUrls";

import { CommentBubble, CommentDate, BubbleAndDate } from "../Profile.style";

const Replies = ({
  replies,
  level,
  userId,
  orgId,
  orgName,
  updatedUsers,
  category,
  text,
  ownerUserId,
  target
}) => {
  const replyReportLink = reply => {
    const reportLink = addSearchParamsToLink(
      {
        reportedReviewUserId: ownerUserId,
        reportedReviewText: text,
        reportedReplyUserId: reply.user.userId,
        reportedReplyText: reply.text,
        orgId,
        orgName,
        target
      },
      REPORT_CONTENT_URL
    );
    return reportLink;
  };

  return replies.map(reply => {
    return (
      <div
        key={reply._id}
        style={{
          position: "relative",
          marginBottom: "2rem",
          direction: `${reply.displayName && "rtl"}`
        }}
      >
        {level < 3 && reply.user._id === userId && <InvisibleCommentAlert />}

        <UserInfo
          showVerifiedIcon
          userId={reply.displayName || reply.user.userId}
          adminReply={!!reply.displayName}
          trade={
            !reply.displayName &&
            reply.user.trade[0] &&
            reply.user.trade[0].title
          }
          helpedUsers={
            updatedUsers[reply.user._id]
              ? updatedUsers[reply.user._id].helpedUsers
              : reply.user.helpedUsers
          }
          points={
            updatedUsers[reply.user._id]
              ? updatedUsers[reply.user._id].points
              : reply.user.points
          }
        />

        <div
          style={{
            position: "relative",
            marginBottom: "2rem"
          }}
        >
          <BubbleAndDate>
            <CommentBubble
              style={{ maxWidth: "90%", overflow: "auto" }}
              bgColor={
                reply.displayName ? "white" : organizations[category].secondary
              }
              color={reply.displayName && organizations[category].primary}
              adminReply={!!reply.displayName}
              category={category}
            >
              {reply.text}
            </CommentBubble>
            <CommentDate>
              {reply.createdAt && `${moment().diff(reply.createdAt, "weeks")}w`}
            </CommentDate>
          </BubbleAndDate>
          <ReportFlag left={reply.displayName} to={replyReportLink(reply)} />
        </div>
      </div>
    );
  });
};

export default Replies;
