import React, { Component } from "react";
import { Prompt } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Modal, Divider } from "antd";

import { colors } from "../../../theme";

import Button from "../../Common/Button";
import PopoverComponent from "../../Common/Popover";

import {
  UploadImageWrapper,
  ContentWrapper,
  Heading,
  SubHeading,
  ImageInput,
  Paragraph,
  Example,
  Error,
  EditIcon,
  PurpleDiv,
  ModalText,
  PopoverDiv,
} from "./UploadImage.style";

import example from "../../../assets/example.jpg";

import { HOME_PAGE } from "../../../constants/naviagationUrls";

const { API_UPLOAD_VERIFICATION_IMAGE_URL } = require("../../../apiUrls");

export default class UploadImage extends Component {
  state = {
    error: "",
    loading: false,
    isPopupVisible: false,
    browserBackAttempt: true,
  };

  componentDidMount() {
    if (this.props.verified) {
      Swal.fire({
        type: "warning",
        title: "Already verified",
        text: "you are already verified!",
      }).then(() => {
        this.props.history.goBack();
      });
    } else if (this.props.awaitingReview) {
      Swal.fire({
        type: "warning",
        title: "",
        text:
          "No need! We're currently checking your photo. Give us a few minutes",
      }).then(() => {
        this.props.history.goBack();
      });
    }
  }

  handleImageChange = event => {
    const image = event.target.files && event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const dataURL = reader.result;
      this.setState({
        image: dataURL,
      });
    };

    this.setState(
      {
        imageFile: image,
      },
      () => {
        // eslint-disable-next-line no-unused-expressions
        image && reader.readAsDataURL(image);
      },
    );
  };

  handleSubmit = event => {
    event.preventDefault();
    const form = new FormData();
    if (!this.state.imageFile) {
      this.setState({ error: "Please upload image" });
    } else {
      this.setState({ error: "", loading: true });

      form.append("verificationImage", this.state.imageFile);

      axios({
        method: "post",
        url: API_UPLOAD_VERIFICATION_IMAGE_URL,
        data: form,
        headers: {
          "content-type": `multipart/form-data; boundary=${form._boundary}`,
        },
      })
        .then(() => {
          this.setState({
            loading: false,
            isPopupVisible: true,
            browserBackAttempt: false,
          });
        })
        .catch(err => {
          this.setState({ loading: false }, () => {
            Swal.fire({
              type: "error",
              title: "Oops...",
              text: err.response.data.error,
            });
          });
        });
    }
  };

  getTooltipText = () => {
    return (
      <>
        <EditIcon
          icon="getVerified"
          height="25"
          width="25"
          margin="0 0.5rem 0 0"
          color={colors.dustyGray4}
        />
        <p style={{ textAlign: "center" }}>
          earwig is free for workers. All we ask is that you prove you are a
          genuine worker. This means all reviews are real and protects the
          worker community from fake reviews and spam by non-workers.
        </p>
        <p>Don't worry, you are always anonymous on earwig.</p>
      </>
    );
  };

  handleModalOk = () => {
    const {
      location: {
        state: {
          orgId,
          redirectToProfile,
          redirectToReview,
          category,
          name,
          redirectToCreateProfile,
        } = {},
      } = {},
    } = this.props;

    this.props.handleChangeState({ awaitingReview: true });

    // user coming from review page
    if (redirectToReview && orgId) {
      this.props.history.push({
        pathname: `/pre-review/${orgId}`,
      });
    }

    // user coming from profile page
    else if (redirectToProfile && orgId) {
      this.props.history.push({
        pathname: `/profile/${orgId}`,
      });
    }
    // user coming from create profile page
    else if (redirectToCreateProfile && name && category) {
      this.props.history.push({
        pathname: `/add-profile-sign-up/${category}/${name}`,
      });
    } else {
      this.props.history.push({
        pathname: HOME_PAGE,
      });
    }
  };

  render() {
    const {
      error,
      image,
      loading,
      isPopupVisible,
      browserBackAttempt,
    } = this.state;
    const { level, history } = this.props;

    return (
      <UploadImageWrapper className="test">
        <PurpleDiv />
        <ContentWrapper>
          <EditIcon
            icon="getVerified"
            height="25"
            width="25"
            margin="0 0.5rem 0 0"
            fill={colors.gray}
          />
          <Heading>Verification</Heading>
          <form onSubmit={this.handleSubmit} style={{ width: "100%" }}>
            <SubHeading>Please prove you are a worker</SubHeading>
            <Paragraph>
              Upload a photo of any of your trade cards, <br /> such as your
              CSCS.
            </Paragraph>
            <PopoverDiv style={{ marginBottom: "-1rem" }}>
              <PopoverComponent
                popoverOptions={{
                  text: this.getTooltipText(),
                  linkText: "Learn more",
                  icon: "info",
                  margin: "0 0 0.5rem 0",
                }}
                history={this.props.history}
              />
            </PopoverDiv>

            <ImageInput
              id="image-input"
              type="file"
              onChange={this.handleImageChange}
              accept="image/*"
            />
            <Example
              style={{ paddingBottom: "0.7rem" }}
              src={image || example}
            />

            <Button
              as="label"
              htmlFor="image-input"
              margin="1rem auto"
              styleType="primary"
              text="Upload photo of trade card"
              width="80%"
            />
            {error && <Error>{error}</Error>}
            <Divider style={{ margin: "2rem 0" }} />
            <Button
              marginTop
              type="submit"
              error={error}
              disabled={loading}
              loading={loading}
              styleType="primary"
              text="Done"
            />
            <Button
              margin="0 auto"
              styleType="secondary"
              text="Cancel"
              onClick={history.goBack}
            />
          </form>
          <Modal
            visible={isPopupVisible}
            footer={null}
            closable={false}
            afterClose={this.handleModalOk}
          >
            <ModalText>
              Thanks, we&apos;re checking your photo. Any reviews you give
              won&apos;t be shown on earwig until we&apos;ve checked your photo
            </ModalText>
            <Button
              styleType="primary"
              margin="1rem auto"
              text="Okay"
              onClick={this.handleModalOk}
            />
          </Modal>
        </ContentWrapper>
        <Prompt
          when={browserBackAttempt && level < 2}
          message="Are you sure you want to leave this page? You will lose any unsaved data."
        />
      </UploadImageWrapper>
    );
  }
}
