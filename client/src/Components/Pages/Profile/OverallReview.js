import React, { Component } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { Collapse, Icon } from "antd";

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
  ActionsButton
} from "./Profile.style";

import { SectionTitle } from "./ReviewSection.style";

const Panel = Collapse.Panel;

export default class OverallReview extends Component {
  state = {
    commentsOpen: false,
    activeReview: "",
    activeReplies: [],
    repliesLoaded: false
  };

  togglePanel = id => {
    id
      ? this.setState({ activeReview: id }, () => {
          this.props.fetchOverallReplies(id);
        })
      : this.setState({ activeReview: "" });
  };

  render() {
    const {
      summary,
      isTablet,
      isMobile,
      category,
      overallReplies,
      activeOverallId
    } = this.props;
    const { activeReview } = this.state;

    return summary.reviews[0].createdAt ? (
      <ReviewDiv isTablet={isTablet} isMobile={isMobile}>
        <SectionTitle>Overall ratings</SectionTitle>
        {summary.reviews.map((review, index) => (
          <CommentDiv key={review._id + "comment"}>
            <UserID>{review.user && review.user.userId}</UserID>
            <BubbleAndDate>
              <CommentBubble color={organizations[category].secondary}>
                {review.overallReview.text}
              </CommentBubble>
              <CommentDate>
                {moment().diff(review.createdAt, "weeks")}w
              </CommentDate>
            </BubbleAndDate>
            {/* FLAG ICON */}
            {/*  BUTTONS SECTION */}
            <ActionsDiv>
              <ButtonsWrapper>
                <ActionsButton
                  type="primary"
                  BGColor={organizations[category].primary}
                >
                  Helpful
                </ActionsButton>
                <ActionsButton
                  type="primary"
                  BGColor={organizations[category].primary}
                >
                  <Link
                    to={{
                      pathname: REPLY_URL,
                      state: {
                        reviewId: review._id,
                        target: "overall",
                        category
                      }
                    }}
                  >
                    Reply
                  </Link>
                </ActionsButton>
              </ButtonsWrapper>
              <Link
                style={{ right: 0, width: "10%" }}
                to={{
                  pathname: REPORT_CONTENT_URL,
                  state: {
                    review: {
                      overallReview: review.overallReview,
                      user: review.user
                    },
                    organization: summary,
                    target: "overallReview"
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
                    {activeReview && activeOverallId === review._id ? (
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
                        color: organizations[category].primary
                      }}
                    >
                      {activeReview && activeOverallId === review._id
                        ? "Hide Replies"
                        : "Read Replies"}
                    </span>
                  </>
                }
                key={review._id}
              >
                {overallReplies.map(reply => (
                  <div key={reply.replies._id}>
                    <UserID>
                      {reply.replies.displayName ||
                        reply.replies.user[0].userId}
                    </UserID>
                    <div style={{ position: "relative", marginBottom: "2rem" }}>
                      <BubbleAndDate
                        style={{
                          display: "inline-block",
                          position: "relative"
                        }}
                      >
                        <CommentBubble
                          style={{ maxWidth: "86%" }}
                          color={organizations[category].secondary}
                        >
                          {reply.replies.text}
                        </CommentBubble>
                        <CommentDate
                          style={{
                            position: "absolute",
                            left: "81%"
                          }}
                        >
                          {reply.replies.createdAt &&
                            moment().diff(reply.replies.createdAt, "weeks") +
                              "w"}
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
                ))}
              </Panel>
            </Collapse>
          </CommentDiv>
        ))}
      </ReviewDiv>
    ) : (
      <>
        <ReviewDiv isTablet={isTablet} isMobile={isMobile}>
          <SectionTitle>Overall ratings</SectionTitle>
          <LightTitle>No reviews yet. Be the first…</LightTitle>
        </ReviewDiv>
      </>
    );
  }
}