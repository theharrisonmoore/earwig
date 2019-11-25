/* eslint-disable no-param-reassign */
import React, { Component } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { Collapse, Icon as AntdIcon, message, Alert } from "antd";
import axios from "axios";

import Icon from "../../Common/Icon/Icon";

import { organizations, colors } from "../../../theme";
import {
  REPORT_CONTENT_URL,
  REPLY_URL,
} from "../../../constants/naviagationUrls";
import { authorization } from "../../../helpers";

import {
  CommentDiv,
  UserID,
  LightTitle,
  CommentBubble,
  CommentDate,
  BubbleAndDate,
  ReviewDiv,
  StyledAntIcon,
  ActionsDiv,
  ButtonsWrapper,
  ReplyButton,
  HelpfulButton,
  UserTrade,
  UserDiv,
  UserAdditionalDetails,
} from "./Profile.style";

import VoiceReview from "./ProfileAnswers/VoiceReview";

import { SectionTitle } from "./ReviewSection.style";

const { Panel } = Collapse;

export default class OverallReview extends Component {
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
                byUser: false,
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
        const { overallReview, voiceReview } = review;

        // check for writtenReview and add to array
        if (overallReview && overallReview.text) {
          const repliesCount =
            (review.overallReview.replies &&
              review.overallReview.replies.length) ||
            0;

          totalReviews.push({
            text: review.overallReview.text,
            repliesCount,
            user: review.user,
            createdAt: review.createdAt,
            _id: review._id,
            category: "written",
            review,
            organization: review.organization,
          });
        }

        // check for audioReview and add to array
        if (voiceReview && voiceReview.audio) {
          const repliesCount =
            (review.voiceReview.replies && review.voiceReview.replies.length) ||
            0;
          totalReviews.push({
            text: review.voiceReview.audio,
            repliesCount,
            user: review.user,
            createdAt: review.createdAt,
            _id: review._id,
            category: "audio",
            organization: review.organization,
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
    const isAuthorized = authorization({
      isAdmin,
      verified,
      awaitingReview,
      minimumLevel: "LEVEL2",
    });

    return FilteredReviewMonths[0] && FilteredReviewMonths[0].createdAt ? (
      <ReviewDiv isTablet={isTablet} isMobile={isMobile}>
        <SectionTitle>Reviews ({totalReviews})</SectionTitle>
        {/* check if any written comments */}
        {this.checkWrittenComments(summary.reviews) === false && (
          <LightTitle>No written reviews yet. Be the first...</LightTitle>
        )}
        {writtenOrAudioReviews &&
          writtenOrAudioReviews.map(review => {
            if (this.checkIfReviewExist(review)) {
              return (
                <CommentDiv key={`${review._id}comment${review.category}`}>
                  <UserDiv>
                    <UserID>{review.user && review.user.userId}</UserID>
                    <UserTrade>
                      {review.user &&
                        review.user.trade &&
                        review.user.trade.length > 0 &&
                        review.user.trade[0].title}
                    </UserTrade>
                  </UserDiv>
                  <UserAdditionalDetails>
                    <p>
                      Helped{" "}
                      {updatedUsers[review.user._id]
                        ? updatedUsers[review.user._id].helpedUsers
                        : review.user.helpedUsers}{" "}
                      · Points{" "}
                      {updatedUsers[review.user._id]
                        ? updatedUsers[review.user._id].points
                        : review.user.points}
                    </p>
                  </UserAdditionalDetails>
                  <BubbleAndDate>
                    <CommentBubble bgColor={organizations[category].secondary}>
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
                  </BubbleAndDate>
                  {/* FLAG ICON */}
                  {/*  BUTTONS SECTION */}
                  <ActionsDiv>
                    <ButtonsWrapper>
                      {review.user._id !== userId && (
                        <>
                          <HelpfulButton
                            onClick={isAuthorized && this.toggleHelpful}
                            number={
                              counters[review.category][review._id]
                                ? counters[review.category][review._id].counter
                                : 0
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
                            type="primary"
                            color={
                              verified || awaitingReview
                                ? organizations[category].primary
                                : organizations[category].secondary
                            }
                            disabled={!(verified || awaitingReview)}
                          >
                            Helpful
                          </HelpfulButton>
                        </>
                      )}
                      <ReplyButton
                        onClick={(verified || awaitingReview) && this.goTOReply}
                        data-target={
                          review.category === "written"
                            ? "overallReview"
                            : "voiceReview"
                        }
                        data-category={category}
                        data-org-id={orgId}
                        data-review-id={review._id}
                        type="primary"
                        color={
                          verified || awaitingReview
                            ? organizations[category].primary
                            : organizations[category].secondary
                        }
                        disabled={!(verified || awaitingReview)}
                      >
                        Reply
                      </ReplyButton>
                    </ButtonsWrapper>
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
                      <StyledAntIcon type="flag" />
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
                                : "Read Replies"}
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
                              {!verified && reply.replies.user._id === userId && (
                                <Alert
                                  message="Your replies are visible only for you untill you get
                    verified"
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
                                  <StyledAntIcon type="flag" />
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
