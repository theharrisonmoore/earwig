import React, { Component } from "react";
import { Prompt } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import { Modal, Input, Alert } from "antd";

import { colors } from "../../../theme";

import Select from "../../Common/Select";
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
  SelectWrapper,
  Error,
  EditIcon,
  PurpleDiv,
  ModalText,
} from "./UploadImage.style";

import example from "../../../assets/example.png";

import { INTRO_URL } from "../../../constants/naviagationUrls";

const {
  API_TRADE_URL,
  API_UPLOAD_VERIFICATION_IMAGE_URL,
} = require("../../../apiUrls");

const placeholder = "Choose your trade";

export default class UploadImage extends Component {
  state = {
    tradeId: "",
    newTrade: "",
    trades: [],
    error: "",
    ismodalVisible: false,
    confirmLoading: false,
    newTradeError: "",
    newTradeSuccess: false,
    disableSelect: false,
    city: "",
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
        title: "We are currently verifying your account",
        text: "Please come back soon!",
      }).then(() => {
        this.props.history.goBack();
      });
    } else {
      axios.get(API_TRADE_URL).then(res => {
        const { data } = res;
        const trades = data.reduce((accu, current) => {
          accu.push({ value: current._id, label: current.title });
          return accu;
        }, []);
        this.setState({ trades });
      });
    }
  }

  handleChange = value => {
    this.setState({ tradeId: value });
  };

  addTownHandler = e => {
    this.setState({ city: e.target.value });
  };

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
      }
    );
  };

  handleSubmit = event => {
    event.preventDefault();
    const form = new FormData();
    if (!this.state.imageFile) {
      this.setState({ error: "Please upload image" });
    } else if (!this.state.tradeId) {
      this.setState({ error: "Please choose your trade" });
    } else {
      this.setState({ error: "", loading: true });

      form.append("verificationImage", this.state.imageFile);
      form.append("tradeId", this.state.tradeId);
      form.append("city", this.state.city);

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

  showModal = e => {
    const { searchTerm } = e.target.dataset;
    this.setState({
      ismodalVisible: true,
      newTrade: searchTerm,
    });
  };

  handleOk = () => {
    if (this.state.newTrade && this.state.newTrade.length >= 3) {
      this.setState(
        {
          confirmLoading: true,
        },
        () => {
          axios
            .post(API_TRADE_URL, { trade: this.state.newTrade })
            .then(res => {
              const { data } = res;

              this.setState({
                trades: [{ value: data._id, label: data.title }],
                tradeId: data._id,
                disableSelect: true,
              });

              this.setState(
                {
                  newTradeSuccess: true,
                },
                () => {
                  setTimeout(() => {
                    this.setState({
                      newTradeSuccess: false,
                      ismodalVisible: false,
                      confirmLoading: false,
                    });
                  }, 1000);
                }
              );
            })
            .catch(err => {
              this.setState(
                {
                  newTradeSuccess: false,
                  newTradeError: err.response.data.error,
                },
                () => {
                  setTimeout(() => {
                    this.setState({
                      ismodalVisible: false,
                      confirmLoading: false,
                    });
                  }, 1000);
                }
              );
            });
        }
      );
    } else if (this.state.newTrade.length < 3) {
      this.setState({
        newTradeError: "Trade must be 3 charachters length at least",
      });
    }
  };

  handleCancel = () => {
    this.setState({
      ismodalVisible: false,
      newTradeSuccess: false,
      newTradeError: "",
    });
  };

  addNewTradeHandler = event => {
    const { value } = event.target;
    this.setState({ newTrade: value, newTradeError: "" });
  };

  render() {
    const {
      ismodalVisible,
      confirmLoading,
      error,
      image,
      loading,
      newTrade,
      isPopupVisible,
      browserBackAttempt,
    } = this.state;
    return (
      <UploadImageWrapper className="test">
        <PurpleDiv />
        <ContentWrapper>
          <EditIcon
            icon="getVerified"
            height="25"
            width="25"
            margin="0 0.5rem 0 0"
            fill={colors.veryLightGray}
          />
          <Heading>Verification</Heading>
          <form onSubmit={this.handleSubmit} style={{ width: "100%" }}>
            <SelectWrapper>
              <SubHeading>Trade</SubHeading>
              <Select
                placeholder={placeholder}
                options={this.state.trades}
                handleChange={this.handleChange}
                value={this.state.tradeId}
                disabled={this.state.disableSelect}
                isCreateNew
                showSearch
                addHandler={this.showModal}
                id="trade"
                scrollToTop
                ismodalVisible={ismodalVisible}
              />
              <div>
                <div>
                  <Modal
                    title="Add new trade"
                    visible={ismodalVisible}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                  >
                    {this.state.newTradeError && (
                      <>
                        <Alert
                          message={this.state.newTradeError}
                          type="error"
                          showIcon
                        />
                        <br />
                      </>
                    )}
                    {this.state.newTradeSuccess && (
                      <>
                        <Alert
                          message="Trade added successfully"
                          type="success"
                          showIcon
                        />
                        <br />
                      </>
                    )}
                    <Input
                      autoFocus
                      placeholder="Add your trade..."
                      allowClear
                      onChange={this.addNewTradeHandler}
                      value={newTrade}
                    />
                  </Modal>
                </div>
              </div>
            </SelectWrapper>
            <SelectWrapper>
              <SubHeading>Town or city</SubHeading>
              <Input onChange={this.addTownHandler} size="large" />
            </SelectWrapper>
            <SubHeading>Verification Photo</SubHeading>
            <Paragraph>
              Please upload a photo of your face holding your trade ID like the
              example below. Please no glare or blur!
            </Paragraph>
            <PopoverComponent
              popoverOptions={{
                text: `Any card or ticket that shows you are a worker, eg CSCS card.`,
                linkText: "Learn more",
                icon: "info",
                margin: "0 0 0.5rem 0",
              }}
              history={this.props.history}
            />
            <Paragraph>
              Once we’ve verified you, we’ll delete the photo to protect your
              identity.
            </Paragraph>
            <Button
              as="label"
              htmlFor="image-input"
              margin="1rem auto"
              styleType="secondary"
              text="Upload photo"
              width="160px"
            />
            <ImageInput
              id="image-input"
              type="file"
              onChange={this.handleImageChange}
              accept="image/*"
            />
            <Example src={image || example} />
            <SubHeading>Protecting you from blacklisting</SubHeading>
            <Paragraph>
              To hide your identity, we’ll randomly assign you a username, which
              is the only thing shown on earwig.
            </Paragraph>
            {error && <Error>{error}</Error>}
            <Button
              marginTop
              type="submit"
              error={error}
              disabled={loading}
              loading={loading}
              styleType="primary"
              text="Finish verification"
            />
          </form>
          <Modal
            visible={isPopupVisible}
            footer={null}
            closable={false}
            afterClose={() => {
              this.props.handleChangeState({ awaitingReview: true });
              this.props.history.push(INTRO_URL);
            }}
          >
            <ModalText>
              Thanks, we're checking your photo. Any reviews you give won't be
              shown on earwig until we've checked your photo
            </ModalText>
            <Button
              styleType="primary"
              margin="1rem auto"
              text="Okay"
              onClick={() => {
                this.props.handleChangeState({ awaitingReview: true });
                this.props.history.push(INTRO_URL);
              }}
            />
          </Modal>
        </ContentWrapper>
        <Prompt
          when={browserBackAttempt}
          message="Are you sure you want to leave this page? You will lose any unsaved data."
        />
      </UploadImageWrapper>
    );
  }
}
