import React from "react";
import moment from "moment";

import { generateReportLink } from "../../../../helpers";

import ReportFlag from "../../../Common/ReportFlag";
import InvisibleCommentAlert from "../../../Common/InvisibleCommentAlert";
import UserInfo from "../../../Common/UserInfo";
import { organizations } from "../../../../theme";
import { REPORT_CONTENT_URL } from "../../../../constants/naviagationUrls";

import { CommentBubble, CommentDate, BubbleAndDate } from "../Profile.style";

const Replies = ({
  overallReplies,
  level,
  userId,
  orgId,
  orgName,
  updatedUsers,
  category,
  text,
  ownerUserId,
}) => {
  const replyReportLink = reply => {
    const reportLink = generateReportLink(
      {
        reportedReviewUserId: ownerUserId,
        reportedReviewText: text,
        reportedReplyUserId: reply.replies.user.userId,
        reportedReplyText: reply.replies.text,
        orgId,
        orgName,
      },
      REPORT_CONTENT_URL
    );
    return reportLink;
  };

  return overallReplies.map(reply => {
    return (
      <div
        key={reply.replies._id}
        style={{
          position: "relative",
          marginBottom: "2rem",
          direction: `${reply.replies.displayName && "rtl"}`,
        }}
      >
        {level < 3 && reply.replies.user._id === userId && (
          <InvisibleCommentAlert />
        )}

        <UserInfo
          userId={reply.replies.displayName || reply.replies.user.userId}
          adminReply={!!reply.replies.displayName}
          trade={
            !reply.replies.displayName &&
            reply.replies.user.trade[0] &&
            reply.replies.user.trade[0].title
          }
          helpedUsers={
            updatedUsers[reply.replies.user._id]
              ? updatedUsers[reply.replies.user._id].helpedUsers
              : reply.replies.user.helpedUsers
          }
          points={
            updatedUsers[reply.replies.user._id]
              ? updatedUsers[reply.replies.user._id].points
              : reply.replies.user.points
          }
        />

        <div
          style={{
            position: "relative",
            marginBottom: "2rem",
          }}
        >
          <BubbleAndDate>
            <CommentBubble
              style={{ maxWidth: "100%" }}
              bgColor={
                reply.replies.displayName
                  ? "white"
                  : organizations[category].secondary
              }
              color={
                reply.replies.displayName && organizations[category].primary
              }
              adminReply={!!reply.replies.displayName}
              category={category}
            >
              {reply.replies.text}
            </CommentBubble>
            <CommentDate>
              {reply.replies.createdAt &&
                `${moment().diff(reply.replies.createdAt, "weeks")}w`}
            </CommentDate>
          </BubbleAndDate>
          <ReportFlag
            left={reply.replies.displayName}
            to={replyReportLink(reply)}
          />
        </div>
      </div>
    );
  });
};

export default Replies;
