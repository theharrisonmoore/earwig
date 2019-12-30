import React, { Component } from "react";

import axios from "axios";

import { message } from "antd";
import { checkAdminReply } from "../utils";
import RepliesAndCommentsCollaps from "../../../Common/RepliesAndCommentsCollaps";

import OverallReviewsContent from "../OverviewSection/OverallReviewsContent";
import BarChartAnswer from "./BarChartAnswer";
import CanteenItemAnswer from "./CanteenItemAnswer";
// import CommentsBox from "./CommentsBox";
import ImageSlider from "./ImageSlider";
import ListAnswer from "./ListAnswer";
import PayrollAnswer from "./PayrollAnswer";
import PieAnswer from "./PieAnswer";
import ScatterAnswer from "./ScatterAnswer";
import SiteItemAnswer from "./SiteItemAnswer";
import VoiceReview from "./VoiceReview";
import YesNoAnswer from "./YesNoAnswer";
import CanteenSubItemAnswer from "./CanteenSubItemAnswer";

import { organizations } from "../../../../theme";

// custom HOC to append the comments for each question
const withComments = WrapprdComponent => {
  return class WrapprdComponentWithComments extends Component {
    state = {
      comments: [],
      loading: false,
      isActive: false,
    };

    toggleComments = () => {
      this.setState(prevState => {
        if (!prevState.isActive) {
          this.fetchComments();
        }
        return {
          isActive: !prevState.isActive,
          loading: true,
        };
      });
    };

    fetchComments = () => {
      const { question: { _id: questionID } = {}, organizationID } = this.props;
      // fetch comments
      axios
        .post("/api/comments", { organizationID, questionID })
        .then(res => {
          const comments = res.data.map(comment => ({
            ...comment,
            adminReplied: checkAdminReply(comment.repliedUsers),
          }));
          this.setState({
            comments,
            loading: false,
          });
        })
        .catch(err => {
          const error =
            err.response && err.response.data && err.response.data.error;
          message.error(error || "Something went wrong");
        });
    };

    render() {
      const {
        question: { commentsCount, _id: questionID } = {},
        organizationID,
        organizationName,
        category,
        level,
      } = this.props;

      const { isActive, comments } = this.state;

      const activeKey = isActive && questionID;
      return (
        <div>
          <WrapprdComponent {...this.props} />
          {commentsCount ? (
            <RepliesAndCommentsCollaps
              id={`${organizationID}/${questionID}`}
              isActive={isActive}
              panelKey={questionID}
              count={commentsCount}
              onToggle={this.toggleComments}
              activeKey={activeKey}
              comments
            >
              {comments.map(comment => (
                <>
                  <OverallReviewsContent
                    key={`${comment._id}comment`}
                    bgColor={organizations[category].secondary}
                    written
                    text={comment.text}
                    time={comment.createdAt}
                    owner={{}}
                    helpedUsers={comment.helpedUsers}
                    userPoints={comment.userPoints}
                    // _id
                    userId={comment.userId}
                    category={category}
                    level={level}
                    reviewId={comment.review}
                    reviewCategory="comment"
                    reviewOrganizationId={comment.organization}
                    adminReplied={comment.adminReplied}
                    updatedUsers={{}}
                    repliesCount={comment.repliesCount}
                    // overallReplies={overallReplies}
                    activeKey={activeKey}
                    // overallReview={overallReview}
                    orgId={organizationID}
                    orgName={organizationName}
                    togglePanel={this.togglePanel}
                    toggleHelpful={this.toggleHelpful}
                    goTOReply={this.goTOReply}
                    ownerTrade={comment.trade}
                    ownerId={comment.userId}
                    ownerUserId={comment.userUserId}
                  />
                </>
              ))}
            </RepliesAndCommentsCollaps>
          ) : null}
        </div>
      );
    }
  };
};

export default {
  BarChartAnswer: withComments(BarChartAnswer),
  CanteenItemAnswer: withComments(CanteenItemAnswer),
  // CommentsBox: withComments(CommentsBox),
  ImageSlider: withComments(ImageSlider),
  ListAnswer: withComments(ListAnswer),
  PayrollAnswer: withComments(PayrollAnswer),
  PieAnswer: withComments(PieAnswer),
  ScatterAnswer: withComments(ScatterAnswer),
  SiteItemAnswer: withComments(SiteItemAnswer),
  VoiceReview: withComments(VoiceReview),
  YesNoAnswer: withComments(YesNoAnswer),
  CanteenSubItemAnswer: withComments(CanteenSubItemAnswer),
};
