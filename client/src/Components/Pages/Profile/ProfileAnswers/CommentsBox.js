import React, { Component } from "react";

import {
  Wrapper,
  CommentsDiv,
  CommentsHeader,
  Close,
  CommentsTitle
} from "./ProfileAnswers.style";

import CloseIcon from "./../../../../assets/close-icon.svg";

export default class CommentsBox extends Component {
  render() {
    const { question, toggleComments } = this.props;

    console.log("Q", question);
    return (
      <Wrapper>
        <CommentsDiv>
          <CommentsHeader>
            <CommentsTitle>{question.question.profileText}</CommentsTitle>
            <Close src={CloseIcon} alt="close" onClick={toggleComments} />
          </CommentsHeader>
        </CommentsDiv>
      </Wrapper>
    );
  }
}
