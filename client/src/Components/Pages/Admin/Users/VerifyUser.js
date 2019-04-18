import React, { Component } from "react";
import axios from "axios";

import { Table, Modal, message, Drawer, Button } from "antd";
import { awaitingReviewUsers } from "./UsersColumns";

export default class AllUsers extends Component {
  state = {
    data: []
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

  render() {
    return (
      <Drawer
        title="Basic Drawer"
        placement="bottom"
        closable={false}
        onClose={this.props.onClose}
        visible={this.props.visible}
        height="100%"
        width="50%"
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    );
  }
}
