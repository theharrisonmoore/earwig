import React, { Component } from "react";

import { withRouter } from "react-router-dom";

import axios from "axios";
import { message } from "antd";

import { addSearchParamsToLink } from "../../../../helpers";

import { REPLY_URL } from "../../../../constants/naviagationUrls";

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
      counters: {},
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

    goTOReply = parentCommentId => {
      const { question: { _id: questionID } = {}, organizationID } = this.props;

      // const { pageYOffset } = window;
      const { history } = this.props;

      const params = {
        target: "comment",
        questionId: questionID,
        organizationId: organizationID,
        parentCommentId,
      };
      const link = addSearchParamsToLink(params, REPLY_URL);
      history.push(link);
    };

    toggleHelpful = e => {
      const { counters } = this.state;
      const { id: reviewId } = e.target;
      // target = "voiceReview" or "overallReview"
      const counter = counters[reviewId] || {};
      const updateCounter = counter.points > 0 ? 0 : 1;

      this.setState({
        counters: {
          ...counters,
          [reviewId]: {
            points: updateCounter,
            updateCounter,
            byUser: true,
          },
        },
      });
    };

    render() {
      const {
        question: { commentsCount, _id: questionID } = {},
        organizationID,
        organizationName,
        category,
        level,
        userId,
        // userUserId,
      } = this.props;

      const { isActive, comments, counters } = this.state;

      const activeKey = isActive && questionID;
      return (
        <div>
          <WrapprdComponent {...this.props} />
          {commentsCount ? (
            <RepliesAndCommentsCollaps
              id={`${questionID}`}
              isActive={isActive}
              panelKey={`${questionID}`}
              count={commentsCount}
              onToggle={this.toggleComments}
              activeKey={activeKey}
              comments
            >
              {comments.map(comment => {
                const isLiked =
                  counters[comment.review] &&
                  counters[comment.review].points > 0;

                const isLikedByUser =
                  isLiked && counters[comment.review].byUser;

                return (
                  <OverallReviewsContent
                    key={`${comment._id}comment`}
                    bgColor={organizations[category].secondary}
                    written
                    text={comment.text}
                    time={comment.createdAt}
                    helpedUsers={comment.helpedUsers}
                    userPoints={comment.userPoints}
                    // logged in user _id
                    userId={userId}
                    category={category}
                    level={level}
                    reviewId={comment.review}
                    reviewCategory="comment"
                    reviewOrganizationId={comment.organization}
                    adminReplied={comment.adminReplied}
                    updatedUsers={{}}
                    repliesCount={comment.repliesCount}
                    // replies={replies}
                    activeKey={activeKey}
                    orgId={organizationID}
                    orgName={organizationName}
                    togglePanel={this.togglePanel}
                    toggleHelpful={this.toggleHelpful}
                    goTOReply={() => this.goTOReply(comment._id)}
                    ownerTrade={comment.trade}
                    ownerId={comment.userId}
                    ownerUserId={comment.userUserId}
                    target="comment"
                    isLiked={isLiked}
                    isLikedByUser={isLikedByUser}
                  />
                );
              })}
            </RepliesAndCommentsCollaps>
          ) : null}
        </div>
      );
    }
  };
};

export default {
  BarChartAnswer: withRouter(withComments(BarChartAnswer)),
  CanteenItemAnswer: withRouter(withComments(CanteenItemAnswer)),
  // CommentsBox: withRouter(withComments(CommentsBox)),
  ImageSlider: withRouter(withComments(ImageSlider)),
  ListAnswer: withRouter(withComments(ListAnswer)),
  PayrollAnswer: withRouter(withComments(PayrollAnswer)),
  PieAnswer: withRouter(withComments(PieAnswer)),
  ScatterAnswer: withRouter(withComments(ScatterAnswer)),
  SiteItemAnswer: withRouter(withComments(SiteItemAnswer)),
  VoiceReview: withRouter(withComments(VoiceReview)),
  YesNoAnswer: withRouter(withComments(YesNoAnswer)),
  CanteenSubItemAnswer: withRouter(withComments(CanteenSubItemAnswer)),
};
