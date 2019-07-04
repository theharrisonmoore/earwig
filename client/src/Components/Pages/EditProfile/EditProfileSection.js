import React, { Component } from "react";
import axios from "axios";

// COMMON
import CancelNavbar from "./../../Common/CancelNavbar";
import Button from "./../../Common/Button";

// STYLING
import {
  EditWrapper,
  BorderedWrapper,
  Title,
  SubTitle,
  Paragraph,
  CurrentValue,
  InputLabel,
  Input,
  ErrorMessage
} from "./EditProfile.style";

export default class EditProfileSection extends Component {
  // EDIT TRADE

  state = {
    oldPassword: "",
    newPassword: "",
    reNewPassword: "",
    verificationImage: "",
    imageFile: "",
    newUsername: "",
    newTrade: "",
    newCity: "",
    isSubmitting: false,
    errors: {},
    errorMsg: "",
    fields: {}
  };

  handleInput = event => {
    const { name, value } = event.target;
    const { fields } = this.state;
    fields[name] = value;
    this.setState({ fields });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { fields } = this.state;

    this.setState({ isSubmitting: true });

    axios
      .post("/api/edit-profile", fields)
      .then(({ data }) => {
        this.props.handleChangeState({ ...data, isLoggedIn: true });
        this.props.history.push("/my-profile");
        this.setState({ isSubmitting: false });
      })
      .catch(err => {
        this.setState({ error: err.response.data.error, isSubmitting: false });
      });
  };

  render() {
    const { history, section, currentValue, userId } = this.props;
    const { isSubmitting, errorMsg } = this.state;
    return (
      <>
        <CancelNavbar history={history} CancelText="Back" />
        <EditWrapper>
          <BorderedWrapper>
            {section === "earwigId" && (
              <div>
                <Title>Warning!</Title>
                <SubTitle>
                  To avoid the threat of blacklisting, we recommend you do not
                  use your real name or any name that could identify you
                </SubTitle>
                <Paragraph>
                  Whilst your earwig ID is the only thing that is shown beside
                  your reviews and activity, it is publicly visible
                </Paragraph>
                <CurrentValue>Current eawig ID: {userId}</CurrentValue>
                <InputLabel htmlFor="newUsername">New earwig ID</InputLabel>
                <Input
                  type="text"
                  name="newUsername"
                  id="newUsername"
                  onChange={this.handleInput}
                />
              </div>
            )}
            <div>
              <ErrorMessage>{errorMsg}</ErrorMessage>
              <Button
                onClick={this.handleSubmit}
                disabled={isSubmitting}
                loading={isSubmitting}
              >
                Save new ID
              </Button>
            </div>
          </BorderedWrapper>
        </EditWrapper>
      </>
    );
  }
}
