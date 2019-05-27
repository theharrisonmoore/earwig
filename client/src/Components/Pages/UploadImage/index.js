import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Modal, Input, Alert, Icon } from "antd";

import { colors } from "./../../../theme";

import Select from "./../../Common/Select";

import {
  UploadImageWrapper,
  ContentWrapper,
  Heading,
  SubHeading,
  ImageInput,
  Paragraph,
  Example,
  Button,
  StyledLink,
  SelectWrapper,
  Error,
  EditIcon
} from "./UploadImage.style";

import example from "./../../../assets/example.png";

import { PROFILE_URL } from "../../../constants/naviagationUrls";

const {
  API_TRADE_URL,
  API_UPLOAD_VERIFICATION_IMAGE_URL,
  API_UPDATE_VERIFICATION_IMAGE_URL
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
    city: ""
  };

  componentDidMount() {
    this.setState({
      verified: this.props.verified,
      awaitingReview: this.props.awaitingReview
    });

    axios.get(API_TRADE_URL).then(res => {
      const { data } = res;
      const trades = data.reduce((accu, current) => {
        accu.push({ value: current._id, label: current.title });
        return accu;
      }, []);
      this.setState({ trades });
    });
  }

  handleChange = value => {
    this.setState({ tradeId: value });
  };

  addTownHandler = e => {
    this.setState({ city: e.target.value });
  };

  handleImageChange = event => {
    const image = event.target.files && event.target.files[0];
    var reader = new FileReader();

    reader.onload = () => {
      var dataURL = reader.result;
      this.setState({
        image: dataURL
      });
    };

    this.setState(
      {
        imageFile: image
      },
      () => {
        image && reader.readAsDataURL(image);
      }
    );
  };

  handleSubmit = event => {
    const { verified, awaitingReview } = this.state;
    const allowedToUploadPartialData = verified || awaitingReview;

    const url = !allowedToUploadPartialData
      ? API_UPLOAD_VERIFICATION_IMAGE_URL
      : API_UPDATE_VERIFICATION_IMAGE_URL;

    event.preventDefault();
    const form = new FormData();
    if (!allowedToUploadPartialData && !this.state.imageFile) {
      this.setState({ error: "Please upload image" });
    } else if (!allowedToUploadPartialData && !this.state.tradeId) {
      this.setState({ error: "Please select your trade" });
    } else if (!allowedToUploadPartialData && !this.state.city) {
      this.setState({ error: "Please enter your city/town" });
    } else {
      Swal.fire({
        title: "Uploading!",
        onBeforeOpen: () => {
          Swal.showLoading();
          this.setState({ error: "" });

          form.append("verificationImage", this.state.imageFile);
          form.append("tradeId", this.state.tradeId);
          form.append("city", this.state.city);

          axios({
            method: "post",
            url: url,
            data: form,
            headers: {
              "content-type": `multipart/form-data; boundary=${form._boundary}`
            }
          })
            .then(res => {
              Swal.fire({
                type: "success",
                title: "Done!",
                showConfirmButton: false,
                timer: 1500
              }).then(() => {
                this.props.handleChangeState({
                  awaitingReview: true,
                  trade: this.state.tradeId || this.props.trade
                });
                this.props.history.push(PROFILE_URL);
              });
            })
            .catch(err => {
              Swal.fire({
                type: "error",
                title: "Oops...",
                text: err.response.data.error
              });
            });
        }
      });
    }
  };

  showModal = () => {
    this.setState({
      ismodalVisible: true
    });
  };

  handleOk = () => {
    if (this.state.newTrade && this.state.newTrade.length >= 3) {
      this.setState(
        {
          confirmLoading: true
        },
        () => {
          axios
            .post(API_TRADE_URL, { trade: this.state.newTrade })
            .then(res => {
              const { data } = res;

              this.setState({
                trades: [{ value: data._id, label: data.title }],
                tradeId: data._id,
                disableSelect: true
              });

              this.setState(
                {
                  newTradeSuccess: true
                },
                () => {
                  setTimeout(() => {
                    this.setState({
                      newTradeSuccess: false,
                      ismodalVisible: false,
                      confirmLoading: false
                    });
                  }, 1000);
                }
              );
            })
            .catch(err => {
              this.setState(
                {
                  newTradeSuccess: false,
                  newTradeError: err.response.data.error
                },
                () => {
                  setTimeout(() => {
                    this.setState({
                      ismodalVisible: false,
                      confirmLoading: false
                    });
                  }, 1000);
                }
              );
            });
        }
      );
    } else if (this.state.newTrade.length < 3) {
      this.setState({
        newTradeError: "Trade must be 3 charachters length at least"
      });
    }
  };

  handleCancel = () => {
    this.setState({
      ismodalVisible: false,
      newTradeSuccess: false,
      newTradeError: ""
    });
  };

  addNewTradeHandler = event => {
    const { value } = event.target;
    this.setState({ newTrade: value, newTradeError: "" });
  };

  render() {
    const { error, image } = this.state;
    const { ismodalVisible, confirmLoading } = this.state;
    return (
      <UploadImageWrapper className="test">
        <ContentWrapper>
          <Heading>Verifying you are a worker</Heading>
          <EditIcon
            icon="getVerified"
            height="36"
            width="36"
            margin="0 0.5rem 0 0"
            fill={colors.veryLightGray}
          />
          <form onSubmit={this.handleSubmit}>
            <SelectWrapper>
              <SubHeading>Your trade</SubHeading>
              <Select
                placeholder={placeholder}
                options={this.state.trades}
                handleChange={this.handleChange}
                value={this.state.tradeId}
                disabled={this.state.disableSelect}
                defaultValue={this.props.trade}
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
                    />
                  </Modal>
                </div>
              </div>
            </SelectWrapper>
            <SelectWrapper>
              <SubHeading>Your town or city</SubHeading>
              <Input onChange={this.addTownHandler} />
            </SelectWrapper>
            <SubHeading>Verification Photo</SubHeading>
            <Paragraph>
              Please upload a photo of your face holding your trade ID like the
              example below. Please no glare or blur!
              <br />
              <br />
              Once we’ve verified you, we’ll delete your photo to protect your
              anonymity.
            </Paragraph>
            <Example src={image ? image : example} />
            <Button as="label" htmlFor="image-input">
              Upload photo for verification{" "}
              {image && (
                <Icon
                  type="check"
                  style={{ color: "green", fontSize: "23px" }}
                />
              )}
            </Button>
            <ImageInput
              id="image-input"
              type="file"
              onChange={this.handleImageChange}
              accept="image/*"
            />
            <SubHeading>Protecting you from blacklisting</SubHeading>
            <Paragraph>
              We believe that every voice counts and should be protected by
              anonymity - everybody has a right to speak and be heard without
              fear of blacklisting. To protect you, we’ll randomly assign you an
              earwig ID, which is the only thing that will be shown beside your
              reviews and activity.
            </Paragraph>
            {error && <Error>{error}</Error>}
            <Button marginTop={true} type="submit" error={error}>
              Finish verification
            </Button>
            <StyledLink to={PROFILE_URL}>
              Cancel and return to your profile
            </StyledLink>
          </form>
        </ContentWrapper>
      </UploadImageWrapper>
    );
  }
}
