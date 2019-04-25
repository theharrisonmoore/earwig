import React, { Component } from "react";
import axios from "axios";

import { Table, Modal, message } from "antd";

import ReviewsColumns from "./ReviewsColumns";

export default class AllReviews extends Component {
  state = {
    data: [],
    visible: false,
    id: ""
  };

  showDeleteConfirm = id => {
    Modal.confirm({
      title: "Are you sure you want to delete this review?",
      okText: "Yes",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        return new Promise((resolve, reject) => {
          axios
            .delete(`/api/admin/reviews`, {
              data: { id }
            })
            .then(() => {
              message.success("Deleted");
              this.fetchData();
              resolve();
            })
            .catch(err => {
              const error =
                err.response && err.response.data && err.response.data.error;
              message.error(error || "Something went wrong");
              this.fetchData();
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
    axios
      .get(`/api/admin/reviews${query}`)
      .then(res => {
        console.log(res);
        this.setState({ data: res.data });
      })
      .catch(err => {
        const error =
          err.response && err.response.data && err.response.data.error;
        message.error(error || "Something went wrong");
        this.fetchData();
      });
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <>
        <Table
          columns={ReviewsColumns({
            deletHandler: this.showDeleteConfirm
          })}
          dataSource={this.state.data}
          style={{ backgroundColor: "#ffffff" }}
        />
      </>
    );
  }
}
