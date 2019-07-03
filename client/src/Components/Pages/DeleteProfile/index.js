import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import { colors } from "./../../../theme";
import CancelNavbar from "./../../Common/CancelNavbar";

import { ButtonSpinner } from "./../../Common/AntdComponents/Loading";

import {
  Wrapper,
  Title,
  Paragraph,
  TextArea,
  Button,
  DeleteButton,
  BorderedWrapper
} from "./DeleteProfile.style";

export default class index extends Component {
  state = {
    message: "",
    errors: null,
    isSubmitting: false,
    isDeleting: false
  };

  deleteUser = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: colors.green,
      cancelButtonColor: colors.red,
      confirmButtonText: "Yes, delete!"
    }).then(result => {
      if (result.value) {
        this.setState({ isDeleting: true }, () =>
          axios
            .delete("/api/delete-user")
            .then(res => {
              this.setState({ isDeleting: false }, () =>
                setTimeout(() => {
                  Swal.fire({
                    type: "success",
                    title: "Account Deleted",
                    text:
                      "Your user account, including any reviews and comments you made, have all been successfully deleted"
                  }).then(() => {
                    window.location.reload();
                  });
                }, 1000)
              );
            })
            .catch(err => {
              this.setState({ isDeleting: false }, () =>
                setTimeout(() => {
                  Swal.fire({
                    type: "error",
                    title: "Transaction unsuccessful",
                    text: err.response.data.error,
                    confirmButtonText: "Close"
                  }).then(() => {
                    window.location.reload();
                  });
                }, 1000)
              );
            })
        );
      }
    });
  };

  handleInput = event => {
    const { value } = event.target;
    this.setState({ message: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { message } = this.state;

    if (message.length > 0) {
      this.setState({ isSubmitting: true }, () =>
        axios
          .post("/api/thinking-of-deleting", { message })
          .then(() =>
            this.setState({ isSubmitting: false }, () =>
              Swal.fire({
                type: "success",
                title: "Thanks for sticking with us",
                text: "We’ll get back to you via email as soon as we can.",
                confirmButtonText: "Okay"
              }).then(() => (window.location = "/my-profile"))
            )
          )
          .catch(err =>
            this.setState({ isSubmitting: false }, () =>
              Swal.fire({
                type: "error",
                title: "Error sending message",
                text: err.response.data.error,
                confirmButtonText: "Close"
              })
            )
          )
      );
    } else {
      this.setState({ errors: "Message box is empty" });
      Swal.fire({
        type: "error",
        title: "Message empty",
        text: "Please write a message before sending",
        confirmButtonText: "Close"
      });
    }
  };

  render() {
    const { history } = this.props;
    const { isSubmitting, isDeleting } = this.state;

    return (
      <>
        <CancelNavbar history={history} CancelText="Back" />
        <Wrapper>
          <BorderedWrapper>
            <div>
              <Title>You’re about to delete your earwig account</Title>
              <Paragraph>
                If you want to permanently delete your earwig account, let us
                know. <br />
                <br />
                If you think you may like to keep your account but you’re
                unhappy about something, tell us what’s wrong so we can do our
                best to fix it.
              </Paragraph>
              <TextArea
                placeholder="What's wrong?"
                onChange={this.handleInput}
                type="textarea"
              />
              <Button onClick={this.handleSubmit} disabled={isSubmitting}>
                {isSubmitting && <ButtonSpinner />}Send
              </Button>
              <DeleteButton onClick={this.deleteUser} disabled={isDeleting}>
                {isDeleting && <ButtonSpinner />}Permanently delete account
              </DeleteButton>
            </div>
          </BorderedWrapper>
        </Wrapper>
      </>
    );
  }
}
