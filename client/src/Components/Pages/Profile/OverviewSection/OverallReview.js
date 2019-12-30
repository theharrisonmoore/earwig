/* eslint-disable no-param-reassign */
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { message } from "antd";
import axios from "axios";

import OverallReviewsContent from "./OverallReviewsContent";

import {
  getVerifiedUsers,
  getVerifiedRepliesCount,
  checkAdminReply,
} from "../utils";

import { organizations } from "../../../../theme";
import { REPLY_URL } from "../../../../constants/naviagationUrls";
import { authorization } from "../../../../helpers";

import { LightTitle, ReviewDiv } from "../Profile.style";

import { SectionTitle } from "../DetailedSection/ReviewSection.style";

class OverallReview extends Component {
  state = {
    activeReview: "",
    counters: {
      written: {},
      audio: {},
    },
    writtenOrAudioReviews: [],
    updatedUsers: {},
  };

  toggleHelpful = e => {
    const { counters } = this.state;
    const { id: reviewId } = e.target;
    // type = "audio" or "written"
    const { type, organization, userId } = e.target.dataset;
    const item = counters[type][reviewId];
    const counter = item ? item.counter : 0;
    const sentNumber = item ? item.sentNumber : 0;

    const updateCounter = counter > 0 ? 0 : 1;

    this.setState(
      {
        counters: {
          ...counters,
          [type]: {
            ...counters[type],
            [reviewId]: {
              counter: updateCounter,
              sentNumber,
              byUser: true,
            },
          },
        },
      },
      () => {
        this.postHelpfulPoints({
          points: updateCounter,
          reviewId,
          userId,
          type,
          organization,
        });
      }
    );
  };

  postHelpfulPoints = ({ points, reviewId, userId, type, organization }) => {
    const target = type === "written" ? "overallReview" : "voiceReview";
    axios
      .patch(`/api/review/${reviewId}/${target}/helpful-points`, {
        points,
        userId,
        organization,
      })
      .then(({ data: { points: newPoints, helpedUsers: newHelpedUsers } }) => {
        const { counters } = this.state;

        this.setState({
          counters: {
            ...counters,
            [type]: {
              ...counters[type],
              [reviewId]: {
                counter: points,
                sentNumber: points,
                byUser: true,
              },
            },
          },
          updatedUsers: {
            [userId]: {
              helpedUsers: newHelpedUsers,
              points: newPoints,
            },
          },
        });
      })
      .catch(err => {
        const error =
          err.response && err.response.data && err.response.data.error;
        message.error(error || "Something went wrong");
      });
  };

  togglePanel = key => {
    if (!key) return this.setState({ activeReview: "" });

    const [reviewId, type] = key.split("/");
    const target = type === "written" ? "overallReview" : "voiceReview";
    if (reviewId) {
      return this.setState({ activeReview: key }, () => {
        this.props.fetchOverallReplies(reviewId, target);
      });
    }
    return this.setState({ activeReview: "" });
  };

  goTOReply = e => {
    const { reviewId, category, orgId, target } = e.target.dataset;
    const { pageYOffset } = window;
    const { history } = this.props;
    history.push({
      pathname: REPLY_URL,
      state: {
        reviewId,
        target,
        category,
        orgId,
        pageYOffset,
      },
    });
  };

  getUserVotesOnProfile = () => {
    const { id, orgId } = this.props;
    axios.get(`/api/users/${id}/profile/${orgId}/votes`).then(({ data }) => {
      const newCounters = data.reduce(
        (prev, currReview) => {
          if (currReview.target === "voiceReview") {
            prev.audio[currReview.review] = {
              counter: currReview.points,
              sentNumber: currReview.points,
              byUser: false,
            };
          } else if (currReview.target === "overallReview") {
            prev.written[currReview.review] = {
              counter: currReview.points,
              sentNumber: currReview.points,
              byUser: false,
            };
          }

          return prev;
        },
        { written: {}, audio: {} }
      );
      this.setState({
        counters: newCounters,
      });
    });
  };

  componentDidMount() {
    this.getUserVotesOnProfile();

    const { summary } = this.props;
    const totalReviews = [];

    if (summary)
      summary.reviews.forEach(review => {
        let replies = [];
        if (review.overallReview && review.overallReview.allRepliesUsers) {
          replies = [...replies, ...review.overallReview.allRepliesUsers];
        }
        if (review.voiceReview && review.voiceReview.allRepliesUsers) {
          replies = [...replies, ...review.voiceReview.allRepliesUsers];
        }
        const verifiedUsers = getVerifiedUsers(replies);
        const { overallReview, voiceReview } = review;

        // check if admin has replied to the review
        review.adminReplied = checkAdminReply(replies);

        // check for writtenReview and add to array
        if (overallReview && overallReview.text) {
          const repliesCount = getVerifiedRepliesCount(
            review.overallReview.replies,
            verifiedUsers
          );

          totalReviews.push({
            text: review.overallReview.text,
            repliesCount,
            user: review.user,
            createdAt: review.createdAt,
            _id: review._id,
            category: "written",
            review,
            organization: review.organization,
            rate: review.rate,
            adminReplied: review.adminReplied,
          });
        }

        // check for audioReview and add to array
        if (voiceReview && voiceReview.audio) {
          const repliesCount = getVerifiedRepliesCount(
            review.voiceReview.replies,
            verifiedUsers
          );

          totalReviews.push({
            text: review.voiceReview.audio,
            repliesCount,
            user: review.user,
            createdAt: review.createdAt,
            _id: review._id,
            category: "audio",
            organization: review.organization,
            rate: review.rate,
          });
        }
      });

    this.setState(
      {
        writtenOrAudioReviews: totalReviews,
      },
      () => {
        const pageYOffset =
          this.props.location.state && this.props.location.state.pageYOffset;

        if (pageYOffset) {
          window.scrollTo(0, pageYOffset);
        }
      }
    );
  }

  checkWrittenComments = reviews => {
    const writtenReviews = reviews.filter(
      review => review.overallReview.text.length > 0
    );

    return writtenReviews.length > 0;
  };

  checkIfReviewExist = review => {
    const { category, text } = review;
    if (category === "written" && text.length) {
      return true;
    }
    if (category === "audio" && text.length) {
      return true;
    }
    return false;
  };

  render() {
    const {
      summary,
      isTablet,
      isMobile,
      category,
      overallReplies,
      activeOverallId,
      verified,
      isAdmin,
      awaitingReview,
      FilteredReviewMonths,
      id: userId,
    } = this.props;

    const { name: orgName, _id: orgId } = summary;
    const {
      activeReview,
      counters,
      writtenOrAudioReviews,
      updatedUsers,
    } = this.state;

    console.log({ summary });
    const { isAuthorized, level } = authorization({
      isAdmin,
      verified,
      awaitingReview,
      minimumLevel: "LEVEL3",
    });

    return FilteredReviewMonths[0] && FilteredReviewMonths[0].createdAt ? (
      <ReviewDiv isTablet={isTablet} isMobile={isMobile}>
        <SectionTitle>
          Reviews by workers ({writtenOrAudioReviews.length})
        </SectionTitle>
        {/* check if any written comments */}
        {writtenOrAudioReviews.length === 0 && (
          <LightTitle>
            No written or audio reviews yet. Be the first...
          </LightTitle>
        )}
        {writtenOrAudioReviews &&
          writtenOrAudioReviews.map(review => {
            if (this.checkIfReviewExist(review)) {
              const {
                repliesCount,
                adminReplied,
                category: reviewCategory,
                _id: reviewId,
                organization: reviewOrganizationId,
                review: { overallReview } = {},
                rate = 0,
                user: owner = {},
                text: reviewText,
              } = review;

              const {
                _id: ownerId,
                helpedUsers: OwnerHelpedUsers,
                points: ownerPoints,
                userId: ownerUserId,
              } = owner;

              const isAudio = reviewCategory === "audio";
              const isWritten = reviewCategory === "written";

              const ownerTrade =
                owner.trade && owner.trade.length > 0 && owner.trade[0].title;

              const helpedUsers = updatedUsers[ownerId]
                ? updatedUsers[ownerId].helpedUsers
                : OwnerHelpedUsers;

              const userPoints = updatedUsers[ownerId]
                ? updatedUsers[ownerId].points
                : ownerPoints;

              return (
                <OverallReviewsContent
                  key={`${review._id}comment${reviewCategory}`}
                  bgColor={
                    isAudio ? "transparent" : organizations[category].secondary
                  }
                  written={isWritten}
                  text={reviewText}
                  audio={isAudio}
                  time={review.createdAt}
                  rate={rate}
                  owner={owner}
                  helpedUsers={helpedUsers}
                  userPoints={userPoints}
                  // _id
                  userId={userId}
                  isAuthorized={isAuthorized}
                  category={category}
                  level={level}
                  reviewId={reviewId}
                  reviewCategory={reviewCategory}
                  reviewOrganizationId={reviewOrganizationId}
                  counters={counters}
                  adminReplied={adminReplied}
                  updatedUsers={updatedUsers}
                  repliesCount={repliesCount}
                  overallReplies={overallReplies}
                  activeReview={activeReview}
                  activeOverallId={activeOverallId}
                  overallReview={overallReview}
                  orgId={orgId}
                  orgName={orgName}
                  togglePanel={this.togglePanel}
                  toggleHelpful={this.toggleHelpful}
                  goTOReply={this.goTOReply}
                  ownerTrade={ownerTrade}
                  ownerId={ownerId}
                  ownerUserId={ownerUserId}
                />
              );
            }
            return null;
          })}
      </ReviewDiv>
    ) : (
      <>
        <ReviewDiv isTablet={isTablet} isMobile={isMobile}>
          <SectionTitle>Reviews</SectionTitle>
          <LightTitle>No reviews yet. Be the first…</LightTitle>
        </ReviewDiv>
      </>
    );
  }
}

export default withRouter(OverallReview);
