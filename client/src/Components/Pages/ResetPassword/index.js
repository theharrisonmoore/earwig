import React, { Component } from "react";
import axios from "axios";
import { Route, Switch } from "react-router-dom";
import { Modal } from "antd";

import { ContentWrapper, Wrapper } from "./ResetPassword.style";

import Layout from "../../Common/Layout";
import CancelNavbar from "../../Common/CancelNavbar";

import {
  ResetPassword as ResetPasswordContent,
  SetPassword,
  PasswordSent,
  PasswordDone,
} from "./Content";

import {
  RESET_PASSWORD_URL,
  SET_PASSWORD_URL,
  PASSWORD_SENT_URL,
  PASSWORD_DONE_URL,
} from "../../../constants/naviagationUrls";

import { API_RESET_PASSWORD, API_SET_PASSWORD } from "../../../apiUrls";

export default class ResetPassword extends Component {
  state = {
    error: "",
    loading: false,
  };

  handleSubmitSet = (values, { setSubmitting }, token) => {
    this.setState({ loading: true }, () => {
      axios
        .post(API_SET_PASSWORD, { ...values, token })
        .then(() => {
          this.setState({ loading: false }, () => {
            Modal.success({
              title: "Done!",
              content: "You successfully updated your password",
              onOk: () => {
                this.props.history.push(PASSWORD_DONE_URL);
              },
            });
          });
        })
        .catch(err => {
          this.setState({ error: err.response.data.error, loading: false });
          setSubmitting(false);
        });
    });
  };

  handleSubmitReset = (values, { setSubmitting }) => {
    this.setState({ loading: true }, () => {
      axios
        .post(API_RESET_PASSWORD, values)
        .then(() => {
          this.setState({ loading: false }, () => {
            Modal.success({
              title: "Done!",
              content:
                "Instructions to reset your password have been sent to the email address provided",
              onOk: () => {
                this.props.history.push(PASSWORD_SENT_URL);
              },
            });
          });
        })
        .catch(err => {
          this.setState({ error: err.response.data.error, loading: false });
          setSubmitting(false);
        });
    });
  };

  render() {
    const { error, loading } = this.state;
    const { history, match } = this.props;
    const { path, isExact } = match;
    const shouldShowNavbar = path !== RESET_PASSWORD_URL || isExact;
    return (
      <Layout type="side" position="right">
        <Wrapper>
          {shouldShowNavbar && <CancelNavbar history={history} />}
          <ContentWrapper>
            <Switch>
              <Route
                path={RESET_PASSWORD_URL}
                exact
                render={props => (
                  <ResetPasswordContent
                    handleSubmitReset={this.handleSubmitReset}
                    error={error}
                    {...props}
                    loading={loading}
                  />
                )}
              />
              <Route
                path={SET_PASSWORD_URL}
                render={props => (
                  <SetPassword
                    handleSubmitSet={this.handleSubmitSet}
                    error={error}
                    {...props}
                    loading={loading}
                  />
                )}
              />
              <Route
                path={PASSWORD_SENT_URL}
                render={props => (
                  <PasswordSent
                    handleSubmitSet={this.handleSubmitSet}
                    error={error}
                    {...props}
                  />
                )}
              />
              <Route
                path={PASSWORD_DONE_URL}
                render={props => (
                  <PasswordDone
                    handleSubmitSet={this.handleSubmitSet}
                    error={error}
                    {...props}
                  />
                )}
              />
            </Switch>
          </ContentWrapper>
        </Wrapper>
      </Layout>
    );
  }
}
