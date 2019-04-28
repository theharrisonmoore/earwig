import React, { Component } from "react";
import { Icon } from "antd";
import { Link } from "react-router-dom";

import {
  Wrapper,
  CommentsDiv,
  CommentsHeader,
  Close,
  CommentsTitle,
  IndividComment,
  UserID,
  CommentBubble
} from "./ProfileAnswers.style";

import { StyledAntIcon } from "./../Profile.style";

import { REPORT_CONTENT_URL } from "./../../../../constants/naviagationUrls";

import CloseIcon from "./../../../../assets/close-icon.svg";

export default class CommentsBox extends Component {
  render() {
    const {
      question,
      toggleComments,
      comments,
      commentsLoaded,
      isMobile,
      organization
    } = this.props;

    return (
      <Wrapper>
        <CommentsDiv isMobile={isMobile}>
          {commentsLoaded ? (
            <>
              <CommentsHeader>
                <CommentsTitle>{question.question.profileText}</CommentsTitle>
                <Close src={CloseIcon} alt="close" onClick={toggleComments} />
              </CommentsHeader>
              {comments &&
                comments.map(comment => (
                  <IndividComment key={comment._id}>
                    <UserID>{comment.userId}</UserID>
                    <CommentBubble>{comment.text}</CommentBubble>
                    <Link
                      to={{
                        pathname: REPORT_CONTENT_URL,
                        state: {
                          comment,
                          question,
                          organization,
                          target: "questionComment"
                        }
                      }}
                    >
                      <StyledAntIcon type="flag" />
                    </Link>
                  </IndividComment>
                ))}
            </>
          ) : (
            <h2>Loading...</h2>
          )}
        </CommentsDiv>
      </Wrapper>
    );
  }
}
