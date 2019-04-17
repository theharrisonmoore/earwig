import React, { Component } from "react";

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

import CloseIcon from "./../../../../assets/close-icon.svg";

export default class CommentsBox extends Component {

  render() {
    const { question, toggleComments, comments, commentsLoaded } = this.props;

    console.log("Q", question);
    return (
      <Wrapper>
        <CommentsDiv>
          {commentsLoaded ? (
            <>
            <CommentsHeader>
            <CommentsTitle>{question.question.profileText}</CommentsTitle>
            <Close src={CloseIcon} alt="close" onClick={toggleComments} />
          </CommentsHeader>
          {comments && comments.map(comment => (
              <IndividComment>
               <UserID>{comment.userId}</UserID>
                <CommentBubble>{comment.text}</CommentBubble> 
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
