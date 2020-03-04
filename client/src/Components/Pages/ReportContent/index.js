import React, { Component } from "react";
import axios from "axios";
import { message } from "antd";
import queryString from "query-string";

import { Wrapper, ContentWrapper } from "../../Common/StaticPages.style";

import Layout from "../../Common/Layout";
import Loading from "../../Common/AntdComponents/Loading";
import SelectReason from "./SelectReason";
import Thanks from "./Thanks";
import CancelNavbar from "../../Common/CancelNavbar";
import { colors } from "../../../theme";

import { API_REPORT_CONTENT_URL } from "../../../apiUrls";

export default class ReportContent extends Component {
  state = {
    reason: "",
    description: "",
    activePage: "selectReason",
    loading: false,
  };

  componentDidMount() {
    // if (!this.props.location || !this.props.location.state) {
    //   this.props.history.goBack();
    // }
  }

  handleSelect = reason => {
    this.setState({ reason });
  };

  handleTextAreaChange = ({ target }) => {
    this.setState({ description: target.value });
  };

  handleSubmit = () => {
    console.log("REACHED");
    const {
      target,
      orgId,
      orgName,
      questionText,
      commentText,
      reportedUserId,
      reportedReviewUserId,
      reportedReviewText,
      reportedReplyUserId,
      reportedReplyText,
    } = queryString.parse(this.props.location.search);

    // get image from URL
    const isImage =
      this.props.location.search &&
      this.props.location.search.split("image")[1];
    const image = isImage && isImage.replace(/^=/, "");
    console.log("im", isImage);

    if (!this.state.description) {
      return message.error("Please fill in some information!");
    }
    return this.setState({ loading: true }, () => {
      axios
        .post(API_REPORT_CONTENT_URL, {
          target,
          orgId,
          orgName,
          questionText,
          commentText,
          reportedUserId,
          reportedReviewUserId,
          reportedReviewText,
          reportedReplyUserId,
          reportedReplyText,
          image,
          description: this.state.description,
          reason: this.state.reason,
        })
        .then(() => {
          this.setState({ loading: false, activePage: "thanks" });
        })
        .catch(err => {
          this.setState({ loading: false }, () => {
            const error =
              err.response && err.response.data && err.response.data.error;
            message.error(error || "Something went wrong");
          });
        });
    });
  };

  render() {
    const { activePage, loading } = this.state;
    const { history, isMobile } = this.props;
    return (
      <Layout type="side" position="right">
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
              <ContentWrapper>
                <div style={{ maxWidth: "300px", margin: "0 auto" }}>
                  {activePage === "selectReason" ? (
                    <SelectReason
                      isMobile={isMobile}
                      handleCancel={this.handleCancel}
                      handleSelect={this.handleSelect}
                      handleSubmit={this.handleSubmit}
                      handleTextAreaChange={this.handleTextAreaChange}
                      description={this.state.description}
                      loading={loading}
                      reason={this.state.reason}
                    />
                  ) : (
                    <Thanks history={history} />
                  )}
                </div>
              </ContentWrapper>
            </>
          )}
        </Wrapper>
      </Layout>
    );
  }
}
