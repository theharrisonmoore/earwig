import React, { Component } from "react";
import axios from "axios";

import { Table, Modal, message, Button } from "antd";

import VerifyUser from "./VerifyUser";

import userColumns from "./UsersColumns";

export default class AllUsers extends Component {
  state = {
    data: [],
    id: ""
  };

  state = { visible: false };

  showDrawer = id => {
    this.setState({
      visible: true,
      id
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  showDeleteConfirm = id => {
    Modal.confirm({
      title: "Are you sure delete this user?",
      okText: "Yes",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        return new Promise((resolve, reject) => {
          axios
            .delete(`/api/admin/users`, {
              data: { id }
            })
            .then(() => {
              message.success("Deleted");
              resolve();
            })
            .catch(() => {
              message.error("Something went wronge!");
              resolve();
            });
        });
      }
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.awaitingReview !== this.props.awaitingReview) {
      this.fetchData();
    }
  }

  fetchData = () => {
    const query = this.props.awaitingReview ? "?awaitingReview=true" : "";
    axios.get(`/api/admin/users${query}`).then(res => {
      this.setState({ data: res.data });
    });
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <>
        <Table
          columns={userColumns({
            deletHandler: this.showDeleteConfirm,
            viewHandler: this.showDrawer
          })}
          dataSource={this.state.data}
          style={{ backgroundColor: "#ffffff" }}
        />
        {this.state.visible && (
          <VerifyUser
            visible={this.state.visible}
            onClose={this.onClose}
            userId={this.state.id}
          />
        )}
      </>
    );
  }
}
