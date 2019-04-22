import React, { Component } from "react";
import axios from "axios";

import { Table, Modal, message } from "antd";

// import VerifyUser from "./VerifyUser";

import OrganizationsColumns from "./OrganizationsColumns";

export default class AllOrganizations extends Component {
  state = {};
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
      title: `Are you sure delete this ${category}?`,
      okText: "Yes",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        return new Promise((resolve, reject) => {
          axios
            .delete(`/api/admin/organization/:id`, {
              data: { id }
            })
            .then(() => {
              message.success("Deleted");
              this.fetchData();
              resolve();
            })
            .catch(() => {
              message.error("Something went wronge!");
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
        console.log(err);
      });
  };
  render() {
    const { category } = this.props;
    return (
      <div>
        <Table
          columns={OrganizationsColumns({
            category,
            deletHandler: this.deletHandler
          })}
          dataSource={this.state.data}
          style={{ backgroundColor: "#ffffff" }}
          bordered={true}
        />
        <h2>{this.props.category}</h2>
      </div>
    );
  }
}
