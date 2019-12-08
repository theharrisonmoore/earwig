/* eslint-disable no-param-reassign */
import React, { Component } from "react";
import moment from "moment";
import { Link, withRouter } from "react-router-dom";
import { Collapse, Icon as AntdIcon, message, Alert, Rate } from "antd";
import axios from "axios";

import { getVerifiedUsers, getVerifiedRepliesCount } from "../utils";

import Icon from "../../../Common/Icon/Icon";

import { organizations, colors } from "../../../../theme";
import {
  REPORT_CONTENT_URL,
  REPLY_URL,
} from "../../../../constants/naviagationUrls";
import { authorization } from "../../../../helpers";

import {
  CommentDiv,
  UserID,
  LightTitle,
  CommentBubble,
  CommentDate,
  BubbleAndDate,
  ReviewDiv,
  ActionsDiv,
  ButtonsWrapper,
  UserTrade,
  UserDiv,
  UserAdditionalDetails,
  UserInfoWrapper,
  RatingWithUserInfo,
  LikeWrapper,
  CommentIconWrapper,
} from "../Profile.style";

import VoiceReview from "../ProfileAnswers/VoiceReview";

import { SectionTitle } from "../DetailedSection/ReviewSection.style";

const { Panel } = Collapse;

const UserInfo = ({ userId, trade, helpedUsers, points }) => {
  return (
    <>
      <Icon
        icon="getVerified"
        color={colors.black2}
        height="25"
        width="25"
        margin="0 0 0 0.5rem"
      />
      <UserInfoWrapper>
        <UserDiv>
          <UserID>{userId}</UserID>
          <UserTrade>{trade}</UserTrade>
        </UserDiv>
        <UserAdditionalDetails>
          <p>
            Helped {helpedUsers} · Points {points}
          </p>
        </UserAdditionalDetails>
      </UserInfoWrapper>
    </>
  );
};

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
        if (review.overallReview.allRepliesUsers) {
          replies = [...replies, ...review.overallReview.allRepliesUsers];
        }
        if (review.voiceReview.allRepliesUsers) {
          replies = [...replies, ...review.voiceReview.allRepliesUsers];
        }
        const verifiedUsers = getVerifiedUsers(replies);
        const { overallReview, voiceReview } = review;

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
      orgId,
      awaitingReview,
      FilteredReviewMonths,
      id: userId,
    } = this.props;

    const { totalReviews } = summary;
    const {
      activeReview,
      counters,
      writtenOrAudioReviews,
      updatedUsers,
    } = this.state;

    const { isAuthorized, level } = authorization({
      isAdmin,
      verified,
      awaitingReview,
      minimumLevel: "LEVEL3",
    });

    return FilteredReviewMonths[0] && FilteredReviewMonths[0].createdAt ? (
      <ReviewDiv isTablet={isTablet} isMobile={isMobile}>
        <SectionTitle>Reviews by workers ({totalReviews})</SectionTitle>
        {/* check if any written comments */}
        {this.checkWrittenComments(summary.reviews) === false && (
          <LightTitle>No written reviews yet. Be the first...</LightTitle>
        )}
        {writtenOrAudioReviews &&
          writtenOrAudioReviews.map(review => {
            if (this.checkIfReviewExist(review)) {
              return (
                <CommentDiv key={`${review._id}comment${review.category}`}>
                  <BubbleAndDate>
                    <CommentBubble
                      bgColor={
                        review.category === "audio"
                          ? "transparent"
                          : organizations[category].secondary
                      }
                    >
                      {review.category === "written" && review.text}
                      {review.category === "audio" && (
                        <VoiceReview
                          category={category}
                          filename={review.text}
                        />
                      )}
                    </CommentBubble>
                    <CommentDate>
                      {moment().diff(review.createdAt, "weeks")}w
                    </CommentDate>
                    {review.category === "audio" && (
                      <Icon
                        icon="voiceRecord"
                        width="36px"
                        height="48px"
                        color={colors.profileFontColor}
                      />
                    )}
                  </BubbleAndDate>
                  <RatingWithUserInfo style={{ display: "flex" }}>
                    <Rate
                      disabled
                      value={review.rate || 0}
                      style={{
                        color: `${colors.stars}`,
                        fontSize: "0.8rem",
                      }}
                      className="last-reviewed-star-rate"
                    />
                    <UserInfo
                      userId={review.user && review.user.userId}
                      trade={
                        review.user &&
                        review.user.trade &&
                        review.user.trade.length > 0 &&
                        review.user.trade[0].title
                      }
                      helpedUsers={
                        updatedUsers[review.user._id]
                          ? updatedUsers[review.user._id].helpedUsers
                          : review.user.helpedUsers
                      }
                      points={
                        updatedUsers[review.user._id]
                          ? updatedUsers[review.user._id].points
                          : review.user.points
                      }
                    />
                  </RatingWithUserInfo>
                  {/*  BUTTONS SECTION */}
                  <ActionsDiv>
                    <ButtonsWrapper>
                      {review.user._id !== userId && (
                        <LikeWrapper
                          as="button"
                          onClick={
                            isAuthorized ? this.toggleHelpful : undefined
                          }
                          id={review._id}
                          data-user-id={review.user._id}
                          data-type={review.category}
                          data-organization={review.organization}
                          data-target={
                            review.category === "written"
                              ? "overallReview"
                              : "voiceReview"
                          }
                          data-category={category}
                          disabled={level < 2}
                          active={
                            counters[review.category][review._id] &&
                            counters[review.category][review._id].counter > 0 &&
                            counters[review.category][review._id].byUser
                          }
                        >
                          <Icon
                            icon="like"
                            fill={
                              counters[review.category][review._id] &&
                              counters[review.category][review._id].counter > 0
                                ? colors.primary
                                : colors.gray
                            }
                            width="27"
                            height="27"
                          />
                        </LikeWrapper>
                      )}
                      <CommentIconWrapper
                        onClick={level >= 2 ? this.goTOReply : undefined}
                        data-target={
                          review.category === "written"
                            ? "overallReview"
                            : "voiceReview"
                        }
                        data-category={category}
                        data-org-id={orgId}
                        data-review-id={review._id}
                        disabled={level < 2}
                      >
                        <Icon
                          icon="comment"
                          fill={colors.gray}
                          width="27"
                          height="27"
                        />
                      </CommentIconWrapper>
                    </ButtonsWrapper>
                    {/* FLAG ICON */}
                    <Link
                      style={{ right: 0, width: "10%" }}
                      to={{
                        pathname: REPORT_CONTENT_URL,
                        state: {
                          review: {
                            overallReview:
                              review.review && review.review.overallReview,
                            user: review.user,
                          },
                          organization: summary,
                          target:
                            review.category === "written"
                              ? "overallReview"
                              : "voiceReview",
                        },
                      }}
                    >
                      <Icon
                        icon="flag"
                        fill={colors.gray}
                        width="27"
                        height="27"
                      />
                    </Link>
                  </ActionsDiv>
                  {review.repliesCount ? (
                    <Collapse
                      bordered={false}
                      data-id={review._id}
                      onChange={this.togglePanel}
                      accordion
                      activeKey={this.state.activeReview}
                    >
                      <Panel
                        showArrow={false}
                        header={
                          <>
                            {activeReview ===
                              `${review._id}/${review.category}` &&
                            activeOverallId === review._id ? (
                              <AntdIcon
                                fontWeight={700}
                                type="up"
                                style={{
                                  color: colors.primary,
                                  width: "15px",
                                  marginRight: "0.5rem",
                                  fontWeight: 700,
                                }}
                              />
                            ) : (
                              <Icon
                                icon="reply"
                                width="15px"
                                style={{
                                  transform: "rotate(180deg)",
                                  marginRight: "0.5rem",
                                }}
                                fill={colors.primary}
                              />
                            )}
                            <span
                              style={{
                                fontWeight: 700,
                                color: colors.primary,
                                marginBottom: "1rem",
                              }}
                            >
                              {activeReview ===
                                `${review._id}/${review.category}` &&
                              activeOverallId === review._id
                                ? "Hide Replies"
                                : `Read Replies (${review.repliesCount})`}
                            </span>
                          </>
                        }
                        key={`${review._id}/${review.category}`}
                      >
                        {overallReplies.map(reply => {
                          return (
                            <div
                              key={reply.replies._id}
                              style={{
                                position: "relative",
                                marginBottom: "2rem",
                                direction: `${reply.replies.displayName &&
                                  "rtl"}`,
                              }}
                            >
                              {level < 3 && reply.replies.user._id === userId && (
                                <Alert
                                  message="Your replies are only visible to you until we've checked your verification photo."
                                  type="warning"
                                  style={{
                                    display: "inline-block",
                                    marginBottom: "0.5rem",
                                  }}
                                  banner
                                />
                              )}

                              <UserDiv>
                                <UserID
                                  adminReply={!!reply.replies.displayName}
                                >
                                  {" "}
                                  {reply.replies.displayName ||
                                    reply.replies.user.userId}
                                </UserID>

                                <UserTrade>
                                  {!reply.replies.displayName &&
                                    reply.replies.user.trade[0] &&
                                    reply.replies.user.trade[0].title}
                                </UserTrade>
                              </UserDiv>
                              {!reply.replies.displayName && (
                                <UserAdditionalDetails>
                                  <p>
                                    Helped{" "}
                                    {updatedUsers[reply.replies.user._id]
                                      ? updatedUsers[reply.replies.user._id]
                                          .helpedUsers
                                      : reply.replies.user.helpedUsers}{" "}
                                    · Points{" "}
                                    {updatedUsers[reply.replies.user._id]
                                      ? updatedUsers[reply.replies.user._id]
                                          .points
                                      : reply.replies.user.points}
                                  </p>
                                </UserAdditionalDetails>
                              )}
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
                                      reply.replies.displayName &&
                                      organizations[category].primary
                                    }
                                    adminReply={!!reply.replies.displayName}
                                    category={category}
                                  >
                                    {reply.replies.text}
                                  </CommentBubble>
                                  <CommentDate>
                                    {reply.replies.createdAt &&
                                      `${moment().diff(
                                        reply.replies.createdAt,
                                        "weeks"
                                      )}w`}
                                  </CommentDate>
                                </BubbleAndDate>
                                <Link
                                  style={{
                                    [reply.replies.displayName
                                      ? "left"
                                      : "right"]: 0,
                                    width: "10%",
                                    position: "absolute",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                  }}
                                  to={{
                                    pathname: REPORT_CONTENT_URL,
                                    state: {
                                      review: {
                                        overallReview: review.overallReview,
                                        user: review.user,
                                      },
                                      organization: summary,
                                      reply: reply.replies,
                                      target: "overallReply",
                                    },
                                  }}
                                >
                                  <Icon
                                    icon="flag"
                                    fill={colors.gray}
                                    width="27"
                                    height="27"
                                  />
                                </Link>
                              </div>
                            </div>
                          );
                        })}
                      </Panel>
                    </Collapse>
                  ) : null}
                </CommentDiv>
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
