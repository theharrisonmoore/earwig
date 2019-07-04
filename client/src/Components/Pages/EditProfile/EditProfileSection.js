import React, { Component } from "react";

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
    errorMsg: ""
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
                <InputLabel htmlFor="earwigID">New earwig ID</InputLabel>
                <Input type="text" name="earwigID" id="earwigID" />
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
