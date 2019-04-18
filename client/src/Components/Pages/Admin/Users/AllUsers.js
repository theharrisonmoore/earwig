import React, { Component } from "react";
import axios from "axios";

import { Table, Modal } from "antd";
import createColumns from "./UsersColumns";
const confirm = Modal.confirm;

export default class AllUsers extends Component {
  state = {
    data: []
  };

  showDeleteConfirm = userId => {
    confirm({
      title: "Are you sure delete this user?",
      okText: "Yes",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        console.log("OK", userId);
      },
      onCancel() {
        console.log("Cancel", userId);
      }
    });
  };

  handleDeleteUser = () => {
    console.log("1111");
  };

  componentDidMount() {
    axios.get("/api/admin/users").then(res => {
      this.setState({ data: res.data });
    });
  }

  render() {
    return (
      <Table
        columns={createColumns(this.showDeleteConfirm)}
        dataSource={this.state.data}
        style={{ backgroundColor: "#ffffff" }}
      />
    );
  }
}
