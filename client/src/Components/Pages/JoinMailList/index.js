import React, { Component } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import { Spin, Button, Icon } from "antd";

import { Wrapper, Content, Heading, Paragraph } from "./JoinMailList.style";
import { API_CONFIRM_EMAIL } from "./../../../apiUrls";
import { LOGIN_URL } from "./../../../constants/naviagationUrls";
export default class JoinEmailList extends Component {
  state = {
    loading: true,
    heading: "",
    error: false
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    axios
      .post(API_CONFIRM_EMAIL, { id })
      .then(({ data }) => {
        this.setState(
          {
            loading: false,
            heading: "Thank you",
            message: data.message,
            error: false
          },
          () => {
            setTimeout(() => {
              this.props.history.push(LOGIN_URL);
            }, 2000);
          }
        );
      })
      .catch(err => {
        this.setState({
          loading: false,
          error: true,
          heading: "Something went wrong!",
          message: err.response.data.error
        });
      });
  }

  render() {
    return (
      <Wrapper>
        <Content>
          {this.state.loading ? (
            <Spin size="large" />
          ) : (
            <>
              {this.state.error ? (
                <Icon
                  type="close-circle"
                  theme="filled"
                  style={{ color: "red", fontSize: "30px" }}
                />
              ) : (
                <Icon
                  type="check-circle"
                  theme="filled"
                  style={{ color: "green", fontSize: "30px" }}
                />
              )}
              <Heading>{this.state.heading}</Heading>
              <Paragraph>{this.state.message}</Paragraph>
              {this.state.error && (
                <Button type="primary" ghost icon="left">
                  <Link to="/">Home Page</Link>
                </Button>
              )}
            </>
          )}
        </Content>
      </Wrapper>
    );
  }
}
