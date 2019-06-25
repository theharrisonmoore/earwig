import React, { Component } from "react";
import { Mention, Input, message } from "antd";
import * as yup from "yup";
import axios from "axios";

import {
  UserID,
  CommentBubble,
  Error
} from "./ProfileAnswers/ProfileAnswers.style";

import { Wrapper, IndividComment } from "./Reply.style";
import { Banner, StyledReplyIcon, Cancel, BannerTitle } from "./Profile.style";

import { organizations } from "./../../../theme";

import {
  API_GET_OVERALL_REVIEW_REPLIES_URL,
  API_ADD_COMMENT_ON_REVIEW_URL
} from "./../../../apiUrls";

import { highlightMentions } from "../../../helpers";

import Loading from "./../../Common/AntdComponents/Loading";

const { toString, toContentState } = Mention;

export default class Reply extends Component {
  state = {
    commentContentState: toContentState(""),
    replies: [],
    user: "",
    errors: {},
    loaded: false
  };

  handleChangeUserName = ({ target }) => {
    const { value } = target;
    this.setState({ user: value });
  };

  onChange = contentState => {
    this.setState({ commentContentState: contentState });
  };

  validate = () => {
    const { isAdmin } = this.props;

    let schema = yup.object().shape({
      comment: yup.string().min(1, "comment is required!"),
      user: isAdmin ? yup.string().required("user is required!") : null
    });

    return schema
      .validate(
        {
          comment: toString(this.state.commentContentState),
          user: this.state.user
        },
        { abortEarly: false }
      )
      .catch(err => {
        const errors = {};
        err.inner.forEach(element => {
          errors[element.path] = element.message;
        });
        this.setState({ errors });
      });
  };

  handleSubmit = () => {
    const { reviewId, target } = this.props.location.state;

    this.validate().then(res => {
      res &&
        this.setState({ errors: {} }, () => {
          const data = {
            text: toString(this.state.commentContentState),
            displayName: this.state.user,
            reviewId,
            target
          };
          axios
            .post(API_ADD_COMMENT_ON_REVIEW_URL, data)
            .then(({ data }) => {
              this.setState(
                {
                  commentContentState: toContentState(""),
                  errors: {}
                },
                () => this.fetchOverallReplies(reviewId)
              );
            })
            .catch(err => {
              const error =
                err.response && err.response.data && err.response.data.error;
              message.error(error || "Something went wrong");
            });
        });
    });
  };

  inputWrapper = React.createRef();
  fixedDiv = React.createRef();

  fetchOverallReplies = id => {
    id
      ? axios
          .get(`${API_GET_OVERALL_REVIEW_REPLIES_URL}/${id}`)
          .then(({ data }) => {
            this.setState(
              {
                replies: data,
                activeOverallId: id,
                loaded: true,
                reviewId: id
              },
              () => {
                window.scrollTo(0, window.innerHeight);
              }
            );
          })
          .catch(err => {
            const error =
              err.response && err.response.data && err.response.data.error;
            message.error(error || "Something went wrong");
          })
      : this.setState({
          replies: [],
          activeOverallId: "",
          loaded: true,
          reviewId: id
        });
  };

  componentDidMount() {
    if (this.props.location && this.props.location.state) {
      const { reviewId, target } = this.props.location.state;
      if (target === "overall") {
        this.fetchOverallReplies(reviewId);
      }
    } else {
      this.goBack();
    }
  }

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    if (!this.props.location || !this.props.location.state) {
      return this.props.history.goBack();
    }
    const { replies, loaded } = this.state;
    const { isAdmin } = this.props;
    const { category } = this.props.location.state;
    const users =
      replies &&
      replies.reduce((prev, curr) => {
        prev.push(curr.replies.displayName || curr.replies.user[0].userId);
        return prev;
      }, []);

    if (!loaded) {
      return <Loading />;
    }
    return (
      <>
        <Banner category={category}>
          <BannerTitle>Replying</BannerTitle>
          <Cancel onClick={this.goBack}>Cancel</Cancel>
        </Banner>
        <Wrapper
          style={{
            position: "relative",
            minHeight: "100vh",
            paddingBottom: "9rem"
          }}
        >
          <>
            {replies &&
              replies.map(reply => (
                <IndividComment key={reply.replies._id}>
                  <UserID>
                    {reply.replies.displayName || reply.replies.user[0].userId}
                  </UserID>
                  <CommentBubble
                    as="pre"
                    color={organizations[category].secondary}
                  >
                    {highlightMentions(reply.replies.text)}
                  </CommentBubble>
                </IndividComment>
              ))}

            <div
              ref={this.inputWrapper}
              style={{
                textAlign: "left",
                position: "fixed",
                width: "100%",
                bottom: "0",
                background: "white",
                paddingBottom: "2rem",
                maxWidth: "30rem",
                margin: "0 auto",
                left: 0,
                right: 0
              }}
            >
              {isAdmin && (
                <Input
                  placeholder="Comment as"
                  style={{ marginTop: "0.25rem", width: "10rem" }}
                  onChange={this.handleChangeUserName}
                  value={this.state.user}
                  onFocus={this.handleFocus}
                  onBlur={this.handleBlur}
                />
              )}
              {this.state.errors.user && (
                <Error>{this.state.errors.user}</Error>
              )}
              <div style={{ position: "relative" }}>
                <Mention
                  autoFocus
                  style={{ width: "100%", marginTop: "0.25rem" }}
                  onChange={this.onChange}
                  defaultSuggestions={users}
                  onFocus={this.handleFocus}
                  onBlur={this.handleBlur}
                  value={this.state.commentContentState}
                  multiLines
                  placeholder={"Add a reply… use @ to mention"}
                />
                <StyledReplyIcon
                  width="40px"
                  fill={organizations[category].primary}
                  onClick={this.handleSubmit}
                />
              </div>

              {this.state.errors.comment && (
                <Error>{this.state.errors.comment}</Error>
              )}
            </div>
          </>
        </Wrapper>
      </>
    );
  }
}
