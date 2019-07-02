import React, { Component } from "react";
import axios from "axios";
import { message } from "antd";

import {
  Wrapper,
  ContentWrapper,
  BlankDiv
} from "./../../Common/StaticPages.style";

import Loading from "./../../Common/AntdComponents/Loading.js";
import SelectReason from "./SelectReason";
import Thanks from "./Thanks";
import CancelNavbar from "./../../Common/CancelNavbar";
import { colors } from "./../../../theme";

import { API_REPORT_CONTENT_URL } from "./../../../apiUrls";
export default class ReportContent extends Component {
  state = {
    reason: "",
    description: "",
    activePage: "selectReason"
  };

  componentDidMount() {
    if (!this.props.location || !this.props.location.state) {
      this.props.history.goBack();
    }
  }

  handleSelect = reason => {
    this.setState({ reason });
  };

  handleTextAreaChange = ({ target }) => {
    this.setState({ description: target.value });
  };

  handleSubmit = () => {
    if (!this.state.description) {
      return message.error("Please fill in some information!");
    }
    this.setState({ loading: true }, () => {
      axios
        .post(API_REPORT_CONTENT_URL, {
          ...this.props.location.state,
          description: this.state.description,
          reason: this.state.reason
        })
        .then(() => {
          this.setState({ loading: false, activePage: "thanks" });
        })
        .catch(err => {
          this.setState({ loading: true }, () => {
            const error =
              err.response && err.response.data && err.response.data.error;
            message.error(error || "Something went wrong");
          });
        });
    });
  };

  render() {
    const { activePage } = this.state;
    const { history } = this.props;
    return (
      <>
        <CancelNavbar
          history={history}
          title="Reporting content"
          titleColor={colors.profileFontColor}
        />
        <Wrapper>
          {this.state.loading ? (
            <Loading />
          ) : (
            <>
              <BlankDiv />
              <ContentWrapper>
                <div style={{ maxWidth: "300px", margin: "0 auto" }}>
                  {activePage === "selectReason" ? (
                    <SelectReason
                      handleCancel={this.handleCancel}
                      handleSelect={this.handleSelect}
                      handleSubmit={this.handleSubmit}
                      handleTextAreaChange={this.handleTextAreaChange}
                      description={this.state.description}
                    />
                  ) : (
                    <Thanks history={history} />
                  )}
                </div>
              </ContentWrapper>
            </>
          )}
        </Wrapper>
      </>
    );
  }
}
