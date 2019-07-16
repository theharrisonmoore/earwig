import React, { Component } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { Collapse, Icon } from "antd";
import axios from "axios";

import { message } from "antd";
import { organizations } from "./../../../theme";
import {
  REPORT_CONTENT_URL,
  REPLY_URL
} from "./../../../constants/naviagationUrls";

import { ReactComponent as ReplyIcon } from "../../../assets/reply-icon.svg";

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
  ActionsButton,
  ReplyButton,
  VerifyPromo,
  VerifyLink,
  UserTrade,
  UserDiv,
  UserAdditionalDetails,
  HelpfulButtonWrapper
} from "./Profile.style";

import { authorization } from "./../../../helpers";

import HelpfulBubble from "./../../Common/HelpfulBubble";
import VoiceReview from "./ProfileAnswers/VoiceReview";

import { SectionTitle } from "./ReviewSection.style";

const Panel = Collapse.Panel;

export default class OverallReview extends Component {
  state = {
    commentsOpen: false,
    activeReview: "",
    activeReplies: [],
    repliesLoaded: false,
    counters: {
      written: {},
      audio: {}
    },
    isMouseDown: false,
    writtenOrAudioReviews: []
  };

  timer = null;

  pressingDown = e => {
    const { counters } = this.state;
    const { id } = e.target;
    // type = "audio" or "written"
    const { type } = e.target.dataset;

    const item = counters[type][id];
    const counter = item ? item.counter : 0;
    const sentNumber = item ? item.sentNumber : 0;

    const updateCounter = counter >= 10 ? 0 : counter + 1;

    this.setState(
      {
        counters: {
          ...counters,
          [type]: {
            ...counters[type],
            [id]: {
              counter: updateCounter,
              sentNumber: sentNumber,
              scaleValue: 1 + counter / 100,
              byUser: true
            }
          }
        },
        isMouseDown: true
      },
      () => {
        setTimeout(index => {
          const { isMouseDown } = this.state;
          if (isMouseDown) {
            this.hold(id, type);
          }
        }, 500);
      }
    );
  };

  hold = (id, type) => {
    const { counters, isMouseDown } = this.state;

    const item = counters[type][id];
    const counter = item ? item.counter : 0;

    if ((item && counter >= 10) || !isMouseDown) {
      return this.setState({ isMouseDown: false });
    }

    clearInterval(this.timer);

    this.timer = setInterval(() => {
      const { counters, isMouseDown } = this.state;
      const item = counters[type][id];
      const counter = item ? item.counter : 0;
      const sentNumber = item ? item.sentNumber : 0;

      if ((item && counter >= 10) || !isMouseDown) {
        clearInterval(this.timer);
        return this.setState({ isMouseDown: false });
      }

      this.setState({
        counters: {
          ...counters,
          [type]: {
            ...counters[type],
            [id]: {
              counter: counter + 1,
              sentNumber: sentNumber,
              scaleValue: 1 + counter / 100,
              byUser: true
            }
          }
        },
        isMouseDown: true
      });
    }, 300);
  };

  notPressingDown = e => {
    const { counters } = this.state;
    const reviewId = e.target.id;
    const { type } = e.target.dataset;

    const { userId } = e.target.dataset;

    const item = counters[type][reviewId];
    const counter = item ? item.counter : 0;
    const sentNumber = item ? item.sentNumber : 0;

    clearInterval(this.timer);
    if (item && counter !== sentNumber) {
      this.setState(
        {
          counters: {
            ...counters,
            [type]: {
              ...counters[type],
              [reviewId]: {
                counter: counter,
                sentNumber: counter,
                scaleValue: 1,
                byUser: true
              }
            }
          },
          isMouseDown: false
        },
        () => {
          this.postHelpfulPoints(counter, sentNumber, reviewId, userId, type);
        }
      );
    } else {
      this.setState({ isMouseDown: false });
    }
  };

  postHelpfulPoints = (points, prevPoints, reviewId, userId, type) => {
    const target = type === "written" ? "overallReview" : "voiceReview";
    axios
      .patch(`/api/review/${reviewId}/${target}/helpful-points`, {
        points,
        prevPoints,
        userId
      })
      .then(({ data }) => {
        const { counters } = this.state;

        this.setState({
          counters: {
            ...counters,
            [type]: {
              ...counters[type],
              [reviewId]: {
                counter: points,
                sentNumber: points,
                scaleValue: 1,
                byUser: false
              }
            }
          },
          isMouseDown: false
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

    const [id, type] = key.split("/");
    const target = type === "written" ? "overallReview" : "voiceReview";
    id
      ? this.setState({ activeReview: key }, () => {
          this.props.fetchOverallReplies(id, target);
        })
      : this.setState({ activeReview: "" });
  };

  componentDidMount() {
    const { id, summary } = this.props;
    const { counters } = this.state;

    const newCounters =
      summary &&
      summary.reviews.reduce(
        (prev, currReview) => {
          const { overallReview, voiceReview } = currReview;

          overallReview &&
            overallReview.votes.forEach(vote => {
              if (vote && vote.user === id) {
                prev["written"][currReview._id] = {
                  counter: vote.points,
                  sentNumber: vote.points,
                  scaleValue: 1,
                  byUser: false
                };
              }
            });

          voiceReview &&
            voiceReview.votes.forEach(vote => {
              if (vote && vote.user === id) {
                prev["audio"][currReview._id] = {
                  counter: vote.points,
                  sentNumber: vote.points,
                  scaleValue: 1,
                  byUser: false
                };
              }
            });
          return prev;
        },
        { written: {}, audio: {} }
      );

    let totalReviews = [];

    if (summary)
      summary.reviews.forEach(review => {
        const { overallReview, voiceReview } = review;

        // check for writtenReview and add to array
        if (overallReview) {
          totalReviews.push({
            text: review.overallReview.text,
            user: review.user,
            createdAt: review.createdAt,
            _id: review._id,
            category: "written",
            review
          });
        }

        // check for audioReview and add to array
        if (voiceReview) {
          totalReviews.push({
            text: review.voiceReview.audio,
            user: review.user,
            createdAt: review.createdAt,
            _id: review._id,
            category: "audio"
          });
        }
      });

    this.setState({
      counters: {
        ...counters,
        ...newCounters
      },
      writtenOrAudioReviews: totalReviews
    });
  }

  checkWrittenComments = reviews => {
    const writtenReviews = reviews.filter(
      review => review.overallReview.text.length > 0
    );

    return writtenReviews.length > 0;
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
      level,
      isAdmin,
      orgId,
      awaitingReview,
      FilteredReviewMonths
    } = this.props;

    const { writtenOrAudioReviews } = this.state;

    const { activeReview, counters } = this.state;

    const isAuthorized = authorization({
      isAdmin,
      verified,
      minimumLevel: "LEVEL3"
    });

    return FilteredReviewMonths[0] && FilteredReviewMonths[0].createdAt ? (
      <ReviewDiv isTablet={isTablet} isMobile={isMobile}>
        <SectionTitle>Overall ratings</SectionTitle>
        {/* check if any written comments */}
        {this.checkWrittenComments(summary.reviews) === false && (
          <LightTitle>No written reviews yet. Be the first...</LightTitle>
        )}
        {writtenOrAudioReviews &&
          writtenOrAudioReviews.map((review, index) => (
            <CommentDiv
              key={review._id + "comment" + review.category}
              noReview={!!review.text && review.text.length < 1}
            >
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
                  Helped {review.user.helpedPoints} · Points{" "}
                  {review.user.points}
                </p>
              </UserAdditionalDetails>
              <BubbleAndDate>
                <CommentBubble color={organizations[category].secondary}>
                  {review.category === "written" && review.text}
                  {review.category === "audio" && (
                    <VoiceReview category={category} filename={review.text} />
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
                  <HelpfulButtonWrapper
                    number={
                      counters[review._id] ? counters[review._id].counter : 0
                    }
                    color={
                      category !== "company"
                        ? organizations[category].secondary
                        : "#424242"
                    }
                    isMobile={isMobile}
                  >
                    <HelpfulBubble
                      number={
                        counters[review.category][review._id] &&
                        counters[review.category][review._id].byUser
                          ? counters[review.category][review._id].counter
                          : undefined
                      }
                      color={organizations[category].primary}
                    />

                    <ActionsButton
                      data-user-id={review.user._id}
                      data-type={review.category}
                      type="primary"
                      bgcolor={
                        isAuthorized
                          ? organizations[category].primary
                          : organizations[category].secondary
                      }
                      id={review._id}
                      onMouseDown={isAuthorized && this.pressingDown}
                      onTouchStart={isAuthorized && this.pressingDown}
                      onMouseUp={isAuthorized && this.notPressingDown}
                      onMouseLeave={isAuthorized && this.notPressingDown}
                      onTouchEnd={isAuthorized && this.notPressingDown}
                      scale={1}
                      disabled={!verified}
                      isMobile={isMobile}
                      //   this.state.counters[review._id]
                      //     ? this.state.counters[review._id].scaleValue
                      //     : 1
                      // }
                    >
                      This is helpful
                    </ActionsButton>
                  </HelpfulButtonWrapper>
                  <Link
                    to={{
                      pathname: REPLY_URL,
                      state: {
                        reviewId: review._id,
                        target:
                          review.category === "written"
                            ? "overallReview"
                            : "voiceReview",
                        category,
                        orgId
                      }
                    }}
                  >
                    <ReplyButton
                      type="primary"
                      color={
                        verified
                          ? organizations[category].primary
                          : organizations[category].secondary
                      }
                      disabled={!verified}
                    >
                      Reply
                    </ReplyButton>
                  </Link>
                </ButtonsWrapper>
                <Link
                  style={{ right: 0, width: "10%" }}
                  to={{
                    pathname: REPORT_CONTENT_URL,
                    state: {
                      review: {
                        overallReview:
                          review.review && review.review.overallReview,
                        user: review.user
                      },
                      organization: summary,
                      target:
                        review.category === "written"
                          ? "overallReview"
                          : "voiceReview"
                    }
                  }}
                >
                  <StyledAntIcon type="flag" />
                </Link>
              </ActionsDiv>
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
                      {activeReview === review._id + "/" + review.category &&
                      activeOverallId === review._id ? (
                        <Icon
                          fontWeight={700}
                          type="up"
                          style={{
                            color: organizations[category].primary,
                            width: "15px",
                            marginRight: "0.5rem",
                            fontWeight: 700
                          }}
                        />
                      ) : (
                        <ReplyIcon
                          width="15px"
                          fill={organizations[category].primary}
                          style={{
                            transform: "rotate(180deg)",
                            marginRight: "0.5rem"
                          }}
                        />
                      )}
                      <span
                        style={{
                          fontWeight: 700,
                          color: organizations[category].primary,
                          marginBottom: "1rem"
                        }}
                      >
                        {activeReview === review._id + "/" + review.category &&
                        activeOverallId === review._id
                          ? "Hide Replies"
                          : "Read Replies"}
                      </span>
                    </>
                  }
                  key={review._id + "/" + review.category}
                >
                  {overallReplies.map(reply => {
                    return (
                      <div key={reply.replies._id}>
                        <UserDiv>
                          <UserID>
                            {" "}
                            {reply.replies.displayName ||
                              reply.replies.user.userId}
                          </UserID>
                          <UserTrade>
                            {reply.replies.user.trade[0] &&
                              reply.replies.user.trade[0].title}
                          </UserTrade>
                        </UserDiv>
                        <UserAdditionalDetails>
                          <p>
                            Helped {reply.replies.user.helpedPoints} · Points{" "}
                            {reply.replies.user.points}
                          </p>
                        </UserAdditionalDetails>
                        <div
                          style={{ position: "relative", marginBottom: "2rem" }}
                        >
                          <BubbleAndDate>
                            <CommentBubble
                              style={{ maxWidth: "100%" }}
                              color={organizations[category].secondary}
                            >
                              {reply.replies.text}
                            </CommentBubble>
                            <CommentDate>
                              {reply.replies.createdAt &&
                                moment().diff(
                                  reply.replies.createdAt,
                                  "weeks"
                                ) + "w"}
                            </CommentDate>
                          </BubbleAndDate>
                          <Link
                            style={{
                              right: 0,
                              width: "10%",
                              position: "absolute",
                              top: "50%",
                              transform: "translateY(-50%)"
                            }}
                            to={{
                              pathname: REPORT_CONTENT_URL,
                              state: {
                                review: {
                                  overallReview: review.overallReview,
                                  user: review.user
                                },
                                organization: summary,
                                reply: reply.replies,
                                target: "overallReply"
                              }
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
            </CommentDiv>
          ))}
        {level === 1 && !awaitingReview && (
          <VerifyPromo>
            <p>
              Get verified as a worker to give reviews, comment on other reviews
              and search jobs
            </p>
            <VerifyLink to={"/upload-verification-photo"} category={category}>
              Get verified now >
            </VerifyLink>
          </VerifyPromo>
        )}
      </ReviewDiv>
    ) : (
      <>
        <ReviewDiv isTablet={isTablet} isMobile={isMobile}>
          <SectionTitle>Overall ratings</SectionTitle>
          <LightTitle>No reviews yet. Be the first…</LightTitle>
          {level === 1 && (
            <VerifyPromo>
              <p>
                Get verified as a worker to give reviews, comment on other
                reviews and search jobs
              </p>
              <VerifyLink to={"/upload-verification-photo"} category={category}>
                Get verified now >
              </VerifyLink>
            </VerifyPromo>
          )}
        </ReviewDiv>
      </>
    );
  }
}
