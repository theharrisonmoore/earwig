import React, { Component } from "react";
import axios from "axios";

import { Drawer } from "antd";

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
    userId: ""
  };

  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
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
        console.log(err);
      });
  }

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
          <InfoWrapper>
            <Info>Email: {this.state.email}</Info>
            <Info>User ID: {this.state.userId}</Info>
          </InfoWrapper>
          <ButtonsWrapper>
            <StyledButton type="primary" ghost icon="check">
              Verify
            </StyledButton>

            <StyledButton type="danger" ghost icon="close">
              Reject
            </StyledButton>
          </ButtonsWrapper>
        </Header>
        <VerificationPhoto src={this.state.url} />
      </Drawer>
    );
  }
}
