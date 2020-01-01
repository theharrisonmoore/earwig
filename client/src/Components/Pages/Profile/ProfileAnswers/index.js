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
      tabs: {},
      replies: {},
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

    toggleReplies = parentCommentId => {
      this.setState(prevState => {
        const isActive = prevState.tabs[parentCommentId];
        if (!isActive) {
          axios.get(`/api/comments/${parentCommentId}`).then(({ data }) => {
            this.setState({
              replies: {
                ...prevState.replies,
                [parentCommentId]: data.subComments,
              },
              loaded: true,
            });
          });
        }
        this.setState({
          tabs: {
            ...prevState.tabs,
            [parentCommentId]: !isActive,
          },
          loading: true,
        });
      });
    };

    fetchComments = () => {
      const { question: { _id: questionID } = {}, organizationID } = this.props;
      // fetch comments
      axios
        .get("/api/comments", {
          params: {
            organizationID,
            questionID,
          },
        })
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

    goTOReply = (parentCommentId, reviewId) => {
      const {
        question: { _id: questionID } = {},
        organizationID,
        category,
      } = this.props;

      // const { pageYOffset } = window;
      const { history } = this.props;

      const params = {
        target: "comment",
        questionId: questionID,
        organizationId: organizationID,
        parentCommentId,
        reviewId,
        category,
      };
      const link = addSearchParamsToLink(params, REPLY_URL);
      history.push(link);
    };

    toggleHelpful = (reviewId, commentId, ownerId) => {
      const { counters } = this.props;

      const target = "comment";
      const counter = counters[target][commentId] || {};
      const updateCounter = counter.counter > 0 ? 0 : 1;

      const { organizationID } = this.props;
      axios
        .patch(`/api/review/${reviewId}/${target}/helpful-points`, {
          points: updateCounter,
          userId: ownerId,
          organization: organizationID,
          comment: commentId,
        })
        .then(
          // new points for the user that got the new points
          ({ data: { points: newPoints, helpedUsers: newHelpedUsers } }) => {
            this.props.setCounters({
              ...counters,
              [target]: {
                ...counters[target],
                [commentId]: {
                  counter: updateCounter,
                  updateCounter,
                  byUser: true,
                },
              },
            });

            this.props.updateUserPoints({
              userId: ownerId,
              points: newPoints,
              helpedUsers: newHelpedUsers,
            });
          }
        )
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
        userId,
        updatedUsers,
        counters,
        // userUserId,
      } = this.props;
      const target = "comment";

      const { isActive, comments, replies, tabs } = this.state;

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
                  counters[target][comment._id] &&
                  counters[target][comment._id].counter > 0;

                const isLikedByUser =
                  isLiked && counters[target][comment._id].byUser;
                const OwnerHelpedUsers = comment.helpedUsers;
                const ownerPoints = comment.points;

                const helpedUsers = updatedUsers[comment.userId]
                  ? updatedUsers[comment.userId].helpedUsers
                  : OwnerHelpedUsers;

                const userPoints = updatedUsers[comment.userId]
                  ? updatedUsers[comment.userId].points
                  : ownerPoints;

                return (
                  <OverallReviewsContent
                    key={`${comment._id}comment`}
                    bgColor={organizations[category].secondary}
                    written
                    text={comment.text}
                    time={comment.createdAt}
                    // logged in user _id
                    userId={userId}
                    category={category}
                    level={level}
                    reviewId={comment.review}
                    reviewCategory={target}
                    reviewOrganizationId={comment.organization}
                    adminReplied={comment.adminReplied}
                    updatedUsers={updatedUsers}
                    repliesCount={comment.repliesCount}
                    replies={replies[comment._id]}
                    activeKey={comment._id}
                    isActive={tabs[comment._id]}
                    orgId={organizationID}
                    orgName={organizationName}
                    togglePanel={() => this.toggleReplies(comment._id)}
                    toggleHelpful={() =>
                      this.toggleHelpful(
                        comment.review,
                        comment._id,
                        comment.userId
                      )
                    }
                    goTOReply={() =>
                      this.goTOReply(comment._id, comment.review)
                    }
                    ownerTrade={comment.trade}
                    ownerId={comment.userId}
                    ownerUserId={comment.userUserId}
                    target={target}
                    isLiked={isLiked}
                    isLikedByUser={isLikedByUser}
                    helpedUsers={helpedUsers}
                    userPoints={userPoints}
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
