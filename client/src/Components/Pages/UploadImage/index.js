import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Modal, Input, Alert, Icon, Divider } from "antd";

import { colors } from "../../../theme";

import Select from "../../Common/Select";
import Button from "../../Common/Button";

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
} from "./UploadImage.style";

import example from "../../../assets/example.png";

import { INTRO_URL } from "../../../constants/naviagationUrls";

const {
  API_TRADE_URL,
  API_UPLOAD_VERIFICATION_IMAGE_URL,
} = require("../../../apiUrls");

const placeholder = "Select your trade";

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
      this.setState({ error: "Please select your trade" });
    } else if (!this.state.city) {
      this.setState({ error: "Please enter your city/town" });
    } else {
      Swal.fire({
        title: "Uploading!",
        onBeforeOpen: () => {
          Swal.showLoading();
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
              this.setState({ loading: false }, () => {
                Swal.fire({
                  type: "success",
                  title: "Done!",
                  showConfirmButton: false,
                  timer: 1500,
                }).then(() => {
                  this.props.handleChangeState({ awaitingReview: true });
                  this.props.history.push(INTRO_URL);
                });
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
        },
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
    } = this.state;
    return (
      <UploadImageWrapper className="test">
        <PurpleDiv width="50%" />
        <ContentWrapper>
          <EditIcon
            icon="getVerified"
            height="25"
            width="25"
            margin="0 0.5rem 0 0"
            fill={colors.veryLightGray}
          />
          <Heading>Verification</Heading>
          <form onSubmit={this.handleSubmit}>
            <SelectWrapper>
              <SubHeading>Your trade</SubHeading>
              <Select
                placeholder={placeholder}
                options={this.state.trades}
                handleChange={this.handleChange}
                value={this.state.tradeId}
                disabled={this.state.disableSelect}
                isCreateNew
                showSearch
                addHandler={this.showModal}
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
              <SubHeading>Your town or city</SubHeading>
              <Input onChange={this.addTownHandler} size="large" />
            </SelectWrapper>
            <SubHeading>Verification Photo</SubHeading>
            <Paragraph>
              We need to verify you’re a genuine worker so the worker community
              is protected from fake reviews and spam by non-workers. Please
              upload a photo of your face holding your trade ID like the example
              below. Please no glare or blur!
              <br />
              <br />
              Don’t worry! Once we’ve verified you, we’ll delete your photo to
              protect your identity.
            </Paragraph>
            <div style={{ width: "60%", margin: "0 auto" }}>
              <Example src={image || example} />
              <Button
                as="label"
                htmlFor="image-input"
                style={{ marginTop: "1rem" }}
                styleType="primary"
              >
                Upload photo
                {image && (
                  <Icon
                    type="check"
                    style={{ color: "white", fontSize: "23px" }}
                  />
                )}
              </Button>
              <ImageInput
                id="image-input"
                type="file"
                onChange={this.handleImageChange}
                accept="image/*"
              />
            </div>
            <SubHeading>Protecting you from blacklisting</SubHeading>
            <Paragraph>
              To protect your identity, we’ll randomly assign you an earwig
              Username, which is the only thing shown beside your reviews and
              activity.
            </Paragraph>
            <Divider style={{ margin: "3rem auto" }} />
            {error && <Error>{error}</Error>}
            <Button
              marginTop
              type="submit"
              error={error}
              loading={loading}
              styleType="primary"
              text="Finish verification"
            />
          </form>
        </ContentWrapper>
      </UploadImageWrapper>
    );
  }
}
