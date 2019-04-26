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
        <TextArea placholder="What's wrong?" />
        <Button>Send</Button>
        <CancelLink to="/edit-profile">Cancel</CancelLink>
        <DeleteButton onClick={this.deleteUser}>
          Permanently delete account
        </DeleteButton>
      </Wrapper>
    );
  }
}
