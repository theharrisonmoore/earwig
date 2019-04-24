import React, { Component } from "react";
import axios from "axios";
import { Table, Modal, message } from "antd";

export default class SingleReview extends Component {
  state = {
    isLoading: true,
    data: [],
    id: ""
  };

  fetchData = () => {
    const reviewID = window.location.href.split("/")[5];
    axios
      .get(`/api/admin/single-review/${reviewID}`)
      .then(res => {
        this.setState({ data: res.data, isLoading: false });
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
    const { isLoading } = this.state;
    if (isLoading) {
      return <div>loading....</div>;
    }
    console.log(this.state.data);
    return (
      <>
        <h1>hey</h1>
      </>
    );
  }
}
