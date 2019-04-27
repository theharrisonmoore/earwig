import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import { colors } from "./../../../theme";

import {
  Wrapper,
  Title,
  Paragraph,
  TextArea,
  Button,
  CancelLink,
  DeleteButton
} from "./DeleteProfile.style";

export default class index extends Component {
  state = {
    message: "",
    errors: null
  };

  deleteUser = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: colors.green,
      cancelButtonColor: colors.red,
      confirmButtonTest: "Yes, delete!"
    }).then(result => {
      if (result.value) {
        Swal.fire({
          title: "Deleting account..."
        });
        Swal.showLoading();

        axios
          .delete("/api/delete-user")
          .then(res => {
            setTimeout(() => {
              Swal.fire({
                type: "success",
                title: "Account Deleted",
                text:
                  "Your user account, including any reviews and comments you made, have all been successfully deleted"
              }).then(() => {
                window.location.reload();
              });
            }, 1000);
          })
          .catch(err => {
            setTimeout(() => {
              Swal.fire({
                type: "error",
                title: "Transaction unsuccessful",
                text: err.response.data.error,
                confirmButtonText: "Close"
              }).then(() => {
                window.location.reload();
              });
            }, 1000);
          });
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
      axios
        .post("/api/thinking-of-deleting", { message })
        .then(() =>
          Swal.fire({
            type: "success",
            title: "Thanks for sticking with us",
            text: "We’ll get back to you via email as soon as we can.",
            confirmButtonText: "Okay"
          }).then(() => (window.location = "/my-profile"))
        )
        .catch(err =>
          Swal.fire({
            type: "error",
            title: "Error sending message",
            text: err.response.data.error,
            confirmButtonText: "Close"
          })
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
    return (
      <Wrapper>
        <Title>Delete my earwig account</Title>
        <Paragraph>
          If you want to permanently delete your earwig account, let us know.
          Once the deletion process begins, you won’t be able to reactivate your
          account or access any of the content you’ve given or the points you’ve
          earned. <br />
          <br />
          If you think you may like to keep your account but you’re unhappy
          about something, tell us why so we can do our best to fix it.
        </Paragraph>
        <TextArea
          placholder="What's wrong?"
          onChange={this.handleInput}
          type="textarea"
        />
        <Button onClick={this.handleSubmit}>Send</Button>
        <CancelLink to="/edit-profile">Cancel</CancelLink>
        <DeleteButton onClick={this.deleteUser}>
          Permanently delete account
        </DeleteButton>
      </Wrapper>
    );
  }
}
