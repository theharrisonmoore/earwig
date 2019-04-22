import React, { Component } from "react";
import axios from "axios";

import { Drawer, message, Button } from "antd";

import {
  VerificationPhoto,
  ButtonsWrapper,
  StyledButton,
  InfoWrapper,
  Header,
  Info
} from "./Users.style";

export default class AllUsers extends Component {
  state = {
    data: [],
    email: "",
    userId: "",
    rececting: false,
    verifying: false
  };

  componentDidMount() {
    const { userId } = this.props;
    axios
      .get(`/api/admin/users/${userId}`)
      .then(({ data }) => {
        this.setState({
          email: data.userInfo.email,
          userId: data.userInfo.userId,
          url: data.url
        });
      })
      .catch(err => {
        const error =
          err.response && err.response.data && err.response.data.error;
        message.error(error || "Something went wrong");
      });
  }

  handleVerify = () => {
    this.setState({ verifying: true });

    const { userId } = this.props;

    axios
      .patch(`/api/admin/users/verify`, { id: userId })
      .then(({ data }) => {
        this.props.closeDrawer();
        this.setState({ verifying: false });
        message.success("Worker has been verified");
        this.props.updateData();
      })
      .catch(err => {
        const error =
          err.response && err.response.data && err.response.data.error;
        message.error(error || "Something went wrong");
        this.props.closeDrawer();
        this.props.updateData();
      });
  };

  handleReject = () => {
    const { userId } = this.props;
    this.setState({ rececting: true });

    axios
      .patch(`/api/admin/users/reject`, { id: userId })
      .then(({ data }) => {
        this.setState({ rececting: false });
        this.props.closeDrawer();
        message.success("Worker has been rejected");
        this.props.updateData();
      })
      .catch(err => {
        const error =
          err.response && err.response.data && err.response.data.error;
        message.error(error || "Something went wrong");
        this.props.updateData();
        this.props.closeDrawer();
      });
  };

  render() {
    return (
      <Drawer
        placement="bottom"
        closable={false}
        onClose={this.props.onClose}
        visible={this.props.visible}
        height="100%"
      >
        <Header>
          <Button
            type="primary"
            icon="left"
            ghost
            onClick={this.props.closeDrawer}
          >
            Backward
          </Button>
          <InfoWrapper>
            <Info>Email: {this.state.email}</Info>
            <Info>User ID: {this.state.userId}</Info>
          </InfoWrapper>
          <ButtonsWrapper>
            <StyledButton
              type="primary"
              ghost
              icon="check"
              onClick={this.handleVerify}
              loading={this.state.verifying}
            >
              Verify
            </StyledButton>

            <StyledButton
              type="danger"
              ghost
              icon="close"
              onClick={this.handleReject}
              loading={this.state.rececting}
            >
              Reject
            </StyledButton>
          </ButtonsWrapper>
        </Header>
        <VerificationPhoto src={this.state.url} />
      </Drawer>
    );
  }
}
