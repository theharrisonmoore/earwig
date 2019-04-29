import React, { Component } from "react";
import axios from "axios";
import { message } from "antd";

import { Wrapper, ContentWrapper } from "./../../Common/StaticPages.style";

import SelectReason from "./SelectReason";
import GiveInformation from "./GiveInformation";
import Thanks from "./Thanks";

import { API_REPORT_CONTENT_URL } from "./../../../apiUrls";
export default class ReportContent extends Component {
  state = {
    reason: "",
    step: 0,
    description: ""
  };

  componentDidMount() {
    if (!this.props.location || !this.props.location.state) {
      this.props.history.goBack();
    }
  }

  handleSelect = reason => {
    this.setState({ reason });
  };

  handleCancel = () => {
    this.props.history.goBack();
  };

  handleMove = direction => {
    const { step, reason, description } = this.state;
    if (step === 0 && direction === 1 && !reason) {
      return message.error("Please select a reason!");
    }
    if (step === 1 && direction === 1 && !description) {
      return message.error("Please fill in some information!");
    }
    this.setState({ step: this.state.step + direction });
  };

  handleTextAreaChange = ({ target }) => {
    this.setState({ description: target.value });
  };

  handleSubmit = () => {
    if (!this.state.description) {
      return message.error("Please fill in some information!");
    }

    axios
      .post(API_REPORT_CONTENT_URL, {
        ...this.props.location.state,
        description: this.state.description,
        reason: this.state.reason
      })
      .then(() => {
        this.handleMove(1);
      })
      .catch(err => {
        const error =
          err.response && err.response.data && err.response.data.error;
        message.error(error || "Something went wrong");
      });
  };

  render() {
    const Components = [SelectReason, GiveInformation, Thanks];
    const ActiveComponent = Components[this.state.step];

    return (
      <Wrapper>
        <ContentWrapper>
          <ActiveComponent
            handleCancel={this.handleCancel}
            handleSelect={this.handleSelect}
            handleMove={this.handleMove}
            handleSubmit={this.handleSubmit}
            handleTextAreaChange={this.handleTextAreaChange}
            description={this.state.description}
          />
        </ContentWrapper>
      </Wrapper>
    );
  }
}
