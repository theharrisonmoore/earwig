import React, { Component } from "react";

import {
  Wrapper,
  CommentTitle,
  CommentBox,
  Button,
  LogInPrompt
} from "./CommentBox.style";

import { LOGIN_URL } from "./../../../constants/naviagationUrls";

export default class index extends Component {
  render() {
    const { title, isLoggedIn } = this.props;
    return (
      <Wrapper>
        <CommentTitle>{title}</CommentTitle>
        {isLoggedIn ? (
          <>
            <CommentBox />
            <Button>Send</Button>
          </>
        ) : (
          <LogInPrompt to={LOGIN_URL}>
            Please log in to send a message
          </LogInPrompt>
        )}
      </Wrapper>
    );
  }
}
