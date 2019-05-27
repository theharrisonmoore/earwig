import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import { colors } from "./../../../theme";

import {
  Wrapper,
  CommentTitle,
  CommentBox,
  StyledButton,
  LogInPrompt
} from "./CommentBox.style";

import { LOGIN_URL } from "./../../../constants/naviagationUrls";

export default class index extends Component {
  state = {
    message: "",
    loading: null
  };

  handleInput = event => {
    const { value } = event.target;
    this.setState({ message: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { message } = this.state;

    if (message.length > 0) {
      this.setState({ loading: true });
      axios
        .post("/api/give-feedback", { message, page: window.location.href })
        .then(() => {
          this.setState({ loading: false });
          Swal.fire({
            type: "success",
            title: "Message sent",
            text:
              "Thanks for getting in touch. If required, we'll get back to you via email as soon as we can.",
            confirmButtonText: "Okay",
            confirmButtonColor: colors.heliotrope
          }).then(() => window.location.reload());
        })
        .catch(err => {
          this.setState({ loading: false });

          Swal.fire({
            type: "error",
            title: "Error sending message",
            text:
              err.response.data.error === "no credentials"
                ? "Only logged in users are authorized to send messages. Please log in first."
                : err.response.data.error,
            confirmButtonText: "Close"
          });
        });
    } else {
      Swal.fire({
        type: "error",
        title: "Message empty",
        text: "Please write a message before sending",
        confirmButtonText: "Close"
      });
    }
  };

  render() {
    const { title, isLoggedIn } = this.props;
    return (
      <Wrapper>
        <CommentTitle>{title}</CommentTitle>
        {isLoggedIn ? (
          <>
            <CommentBox
              placeholder="Enter your comments here..."
              onChange={this.handleInput}
            />
            <StyledButton
              loading={this.state.loading}
              onClick={this.handleSubmit}
            >
              Send
            </StyledButton>
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
