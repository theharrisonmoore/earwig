import React, { Component } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { Button, Collapse, Icon } from "antd";

import RepliesBox from "./Reply";

import { organizations } from "./../../../theme";
import {
  REPORT_CONTENT_URL,
  REPLY_URL
} from "./../../../constants/naviagationUrls";

import { ReactComponent as ReplyIcon } from "../../../assets/reply-icon.svg";

import {
  CommentDiv,
  UserID,
  CommentBubble,
  CommentDate,
  BubbleAndDate,
  ReviewDiv,
  StyledAntIcon
} from "./Profile.style";

import { SectionTitle } from "./ReviewSection.style";

const Panel = Collapse.Panel;

export default class OverallReview extends Component {
  stat = {
    commentsOpen: false,
    activeReview: "",
    activeReplies: [],
    repliesLoaded: false
  };

  toggleOverallReplies = () => {
    console.log("toggle");
  };

  render() {
    const {
      summary,
      isTablet,
      isMobile,
      category,
      overallReplies,
      fetchOverallReplies,
      activeOverallId
    } = this.props;
    return (
      summary.reviews[0].createdAt && (
        <ReviewDiv isTablet={isTablet} isMobile={isMobile}>
          <SectionTitle>Overall ratings</SectionTitle>
          {summary.reviews.map((review, index) => (
            <CommentDiv key={review._id}>
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  maxWidth: "25rem",
                  margin: "0 auto"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    width: "90%"
                  }}
                >
                  <Button
                    type="primary"
                    style={{
                      background: organizations[category].primary,
                      border: "none",
                      fontWeight: "700",
                      fontSize: "1rem",
                      padding: "0.5rem 1rem",
                      height: "auto"
                    }}
                  >
                    Helpful
                  </Button>
                  <Button
                    type="primary"
                    style={{
                      background: organizations[category].primary,
                      border: "none",
                      fontWeight: "700",
                      fontSize: "1rem",
                      padding: "0.5rem 1rem",
                      height: "auto"
                    }}
                  >
                    <Link
                      to={{
                        pathname: REPLY_URL,
                        state: { reviewId: review._id }
                      }}
                    >
                      Reply
                    </Link>
                  </Button>
                </div>
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
              </div>
              <Collapse
                bordered={false}
                data-id={review._id}
                onChange={fetchOverallReplies}
              >
                <Panel
                  showArrow={false}
                  header={
                    <>
                      {activeOverallId === review._id ? (
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
                        {activeOverallId === review._id
                          ? "Hide Replies"
                          : "Read Replies"}
                      </span>
                    </>
                  }
                  key={review._id}
                >
                  {overallReplies.map(reply => (
                    <div key={reply._id}>
                      <UserID>{reply.replies.user[0].userId}</UserID>
                      <BubbleAndDate>
                        <CommentBubble
                          color={organizations[category].secondary}
                        >
                          {reply.replies.text}
                        </CommentBubble>
                        <CommentDate>
                          {reply.replies.createdAt &&
                            moment().diff(reply.replies.createdAt, "weeks")}
                          w
                        </CommentDate>
                      </BubbleAndDate>
                    </div>
                  ))}
                </Panel>
              </Collapse>
            </CommentDiv>
          ))}
          {/* {this.state.commentsOpen && (
            <RepliesBox
              organization={summary}
              review={this.state.activeReview}
              replies={this.state.activeReplies}
              repliesLoaded={this.state.repliesLoaded}
              toggleOverallReplies={this.toggleOverallReplies}
              isMobile={isMobile}
              fetchComments={this.fetchComments}
            />
          )} */}
        </ReviewDiv>
      )
    );
  }
}
