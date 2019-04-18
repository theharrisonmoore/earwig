import React, { Component } from "react";
import axios from "axios";

import { Table, Modal, message } from "antd";
import createColumns from "./UsersColumns";

export default class AllUsers extends Component {
  state = {
    data: []
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
