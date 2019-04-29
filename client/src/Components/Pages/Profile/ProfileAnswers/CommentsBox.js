import React, { Component } from "react";
import { Mention, Input } from "antd";

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

import { isMobileDevice } from "./../../../../helpers";

const { toString, toContentState, getMentions } = Mention;

export default class CommentsBox extends Component {
  state = {
    commentContentState: toContentState(""),
    user: ""
  };

  handleChangeUserName = ({ target }) => {
    const { value } = target;
    this.setState({ user: value });
  };

  onChange = contentState => {
    this.setState({ commentContentState: contentState });
  };

  handleFocus = e => {
    if (isMobileDevice.any()) {
      this.inputWrapper.current.style.marginBottom = "320px";
      this.fixedDiv.current.scrollIntoView(false);
    }
  };

  inputWrapper = React.createRef();
  fixedDiv = React.createRef();

  render() {
    const {
      question,
      toggleComments,
      comments,
      commentsLoaded,
      isMobile
    } = this.props;

    const users =
      comments &&
      comments.reduce((prev, curr) => {
        prev.push(curr.userId);
        return prev;
      }, []);

    // console.log(getMentions(toContentState("@ramy shurafa @shurafa2")));

    return (
      <Wrapper>
        <CommentsDiv isMobile={isMobile} ref={this.fixedDiv}>
          {commentsLoaded ? (
            <>
              <CommentsHeader id="test" ref={this.ref}>
                <CommentsTitle>{question.question.profileText}</CommentsTitle>
                <Close src={CloseIcon} alt="close" onClick={toggleComments} />
              </CommentsHeader>

              {comments &&
                comments.map(comment => (
                  <IndividComment>
                    <UserID>{comment.userId}</UserID>
                    <CommentBubble>{comment.text}</CommentBubble>
                  </IndividComment>
                ))}

              <div ref={this.inputWrapper}>
                <Input
                  placeholder="Comment as"
                  style={{ margin: "0.25rem 0", width: "10rem" }}
                  onChange={this.handleChangeUserName}
                  value={this.state.user}
                />
                <Mention
                  style={{ width: "100%" }}
                  onChange={this.onChange}
                  defaultSuggestions={users}
                  onFocus={this.handleFocus}
                  value={this.state.commentContentState}
                  multiLines
                  placeholder={"input @ to mention"}
                />
              </div>
            </>
          ) : (
            <h2>Loading...</h2>
          )}
        </CommentsDiv>
      </Wrapper>
    );
  }
}
