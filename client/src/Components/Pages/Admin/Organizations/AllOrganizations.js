import React, { Component } from "react";
import axios from "axios";

import { Table, Modal, message } from "antd";

import OrganizationsColumns from "./OrganizationsColumns";

export default class AllOrganizations extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.category !== this.props.category) {
      this.fetchData();
    }
  }

  deletHandler = id => {
    const { category } = this.props;
    Modal.confirm({
      title: `Are you sure deactivate this ${category}?`,
      okText: "Yes",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        return new Promise((resolve, reject) => {
          axios
            .patch(`/api/admin/organizations`, {
              id
            })
            .then(() => {
              message.success("Deactivate!");
              this.fetchData();
              resolve();
            })
            .catch(() => {
              message.error("Something went wrong!");
              this.fetchData();
              resolve();
            });
        });
      }
    });
  };

  fetchData = () => {
    const { category } = this.props;
    axios
      .get(`/api/admin/organizations/${category}`)
      .then(({ data }) => {
        this.setState({ data });
      })
      .catch(err => {
        const error =
          err.response && err.response.data && err.response.data.error;
        message.error(error || "Something went wrong");
        this.fetchData();
      });
  };

  render() {
    const { category } = this.props;
    return (
      <div>
        <Table
          rowClassName={(record, index) => {
            if (!record.active) {
              return "disabled";
            }
          }}
          columns={OrganizationsColumns({
            category,
            deletHandler: this.deletHandler
          })}
          dataSource={this.state.data}
          style={{ backgroundColor: "#ffffff" }}
          bordered={true}
        />
      </div>
    );
  }
}
