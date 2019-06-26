import React, { Component } from "react";
import axios from "axios";
import { Route, Switch } from "react-router-dom";

import { Modal } from "antd";

import {
  Banner,
  Cancel,
  ContentWrapper,
  Wrapper,
  BlankDiv
} from "./ResetPassword.style";

import {
  ResetPassword as ResetPasswordContent,
  SetPassword,
  PasswordSent,
  PasswordSDone
} from "./Content";

import {
  RESET_PASSWORD_URL,
  SET_PASSWORD_URL,
  PASSWORD_SENT_URL,
  PASSWORD_DONE_URL
} from "./../../../constants/naviagationUrls";

import { API_RESET_PASSWORD, API_SET_PASSWORD } from "./../../../apiUrls";

export default class ResetPassword extends Component {
  state = {
    error: "",
    loading: false
  };

  handleSubmitSet = (values, { setSubmitting }, token) => {
    this.setState({ loading: true }, () => {
      axios
        .post(API_SET_PASSWORD, { ...values, token })
        .then(({ data }) => {
          this.setState({ loading: false }, () => {
            Modal.success({
              title: "Done!",
              content: "You successfully updated your password",
              onOk: () => {
                this.props.history.push(PASSWORD_DONE_URL);
              }
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
        .then(({ data }) => {
          this.setState({ loading: false }, () => {
            Modal.success({
              title: "Done!",
              content:
                "An email just sent to your email to reset your password",
              onOk: () => {
                this.props.history.push(PASSWORD_SENT_URL);
              }
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
    const { history } = this.props;

    return (
      <>
        <Wrapper>
          <Banner>
            <Cancel onClick={history.goBack}>Cancel</Cancel>
          </Banner>
          <BlankDiv />
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
                  <PasswordSDone
                    handleSubmitSet={this.handleSubmitSet}
                    error={error}
                    {...props}
                  />
                )}
              />
            </Switch>
          </ContentWrapper>
        </Wrapper>
      </>
    );
  }
}
