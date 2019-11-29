import React, { Component } from "react";
import { Mentions, Input, message, Alert } from "antd";
import * as yup from "yup";
import axios from "axios";

import { Error } from "./ProfileAnswers/ProfileAnswers.style";

import {
  Wrapper,
  IndividComment,
  ReplyWrapper,
  CommentsWrapper,
} from "./Reply.style";
import {
  UserDiv,
  UserTrade,
  UserAdditionalDetails,
  UserID,
  CommentBubble,
} from "./Profile.style";

import { organizations, colors } from "../../../theme";

import { API_ADD_COMMENT_ON_REVIEW_URL } from "../../../apiUrls";
import { highlightMentions } from "../../../helpers";

import Loading from "../../Common/AntdComponents/Loading";
import Button from "../../Common/Button";
import Layout from "../../Common/Layout";
import CancelNavbar from "../../Common/CancelNavbar";

export default class Reply extends Component {
  state = {
    commentContentState: "",
    replies: [],
    user: "",
    errors: {},
    loaded: false,
    submitting: false,
    focus: false,
  };

  handleChangeUserName = ({ target }) => {
    const { value } = target;
    this.setState({ user: value });
  };

  onChange = value => {
    this.setState({ commentContentState: value });
  };

  handleFocus = () => {
    this.setState({ focus: true });
  };

  handleBlur = () => {
    this.setState({ focus: false });
  };

  validate = () => {
    const { isAdmin } = this.props;

    const schema = yup.object().shape({
      comment: yup.string().min(1, "comment is required!"),
      user: isAdmin ? yup.string().required("user is required!") : null,
    });

    return schema
      .validate(
        {
          comment: this.state.commentContentState,
          user: this.state.user,
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
      if (res) {
        this.setState({ errors: {}, submitting: true }, () => {
          const data = {
            text: this.state.commentContentState,
            displayName: this.state.user,
            reviewId,
            target,
          };
          axios
            .post(API_ADD_COMMENT_ON_REVIEW_URL, data)
            .then(() => {
              this.setState(
                {
                  commentContentState: "",
                  user: "",
                  errors: {},
                  submitting: false,
                },
                () => this.fetchOverallReplies(reviewId, target)
              );
              // UNCOMMENT IF YOU WANT TO SEND BACK TO PROFILE AFTER SUBMITTING COMMENT
              // this.props.history.push(`/profile/${orgId}`);
            })
            .catch(err => {
              this.setState({ submitting: false });
              const error =
                err.response && err.response.data && err.response.data.error;
              message.error(error || "Something went wrong");
            });
        });
      }
    });
  };

  inputWrapper = React.createRef();

  fixedDiv = React.createRef();

  fetchOverallReplies = (id, target) => {
    if (id) {
      axios
        .get(`/api/reviews/${target}/replies/${id}`)
        .then(({ data }) => {
          this.setState(
            {
              replies: data,
              loaded: true,
            },
            () => {
              window.scrollTo(0, document.body.scrollHeight);
            }
          );
        })
        .catch(err => {
          const error =
            err.response && err.response.data && err.response.data.error;
          message.error(error || "Something went wrong");
        });
    } else {
      this.setState({
        replies: [],
        loaded: true,
      });
    }
  };

  componentDidMount() {
    if (this.props.location && this.props.location.state) {
      const { reviewId, target } = this.props.location.state;
      // target equal "overallReview" OR "voiceReview";
      this.fetchOverallReplies(reviewId, target);
    } else {
      this.goBack();
    }
  }

  goBack = () => {
    const { orgId, pageYOffset } = this.props.location.state;
    this.props.history.replace(`/profile/${orgId}`, { pageYOffset });
  };

  render() {
    const { verified, history, location, id } = this.props;
    if (!location || !location.state) {
      return history.goBack();
    }

    const {
      replies,
      loaded,
      submitting,
      focus,
      commentContentState,
    } = this.state;
    const { isAdmin } = this.props;
    const { category } = this.props.location.state;

    const users =
      replies &&
      replies.reduce((prev, curr) => {
        prev.push(curr.replies.displayName || curr.replies.user.userId);
        return prev;
      }, []);

    const uniqueUsers = [];
    users.forEach(user => {
      if (!uniqueUsers.includes(user)) {
        uniqueUsers.push(user);
      }
    });

    if (!loaded) {
      return <Loading />;
    }
    return (
      <Layout type="center">
        <CancelNavbar
          history={history}
          title="Replying"
          titleColor={colors.profileFontColor}
          CancelText="Back"
        />
        <Wrapper
          style={{
            position: "relative",
            minHeight: "100vh",
            paddingBottom: "9rem",
          }}
        >
          <CommentsWrapper>
            {replies &&
              replies.map(reply => (
                <IndividComment
                  key={reply.replies._id}
                  adminReply={reply.replies.displayName}
                  category={category}
                >
                  {!verified && reply.replies.user._id === id && (
                    <Alert
                      message="Your replies are visible only for you untill you get
                    verified"
                      type="warning"
                      style={{
                        display: "inline-block",
                        marginBottom: "0.5rem",
                      }}
                      banner
                    />
                  )}
                  <UserDiv>
                    <UserID adminReply={!!reply.replies.displayName}>
                      {" "}
                      {reply.replies.displayName || reply.replies.user.userId}
                    </UserID>
                    <UserTrade>
                      {!reply.replies.displayName &&
                        reply.replies.user.trade &&
                        reply.replies.user.trade[0] &&
                        reply.replies.user.trade[0].title}
                    </UserTrade>
                  </UserDiv>
                  {!reply.replies.displayName && (
                    <UserAdditionalDetails>
                      <p>
                        Helped {reply.replies.user.helpedUsers} · Points{" "}
                        {reply.replies.user.points}
                      </p>
                    </UserAdditionalDetails>
                  )}
                  <CommentBubble
                    as="pre"
                    style={{ maxWidth: "100%" }}
                    bgColor={
                      reply.replies.displayName
                        ? "white"
                        : organizations[category].secondary
                    }
                    color={
                      reply.replies.displayName &&
                      organizations[category].primary
                    }
                    adminReply={!!reply.replies.displayName}
                    category={category}
                  >
                    {highlightMentions(reply.replies.text)}
                  </CommentBubble>
                </IndividComment>
              ))}
          </CommentsWrapper>

          <ReplyWrapper>
            <div
              ref={this.inputWrapper}
              style={{
                textAlign: "left",
                width: "100%",
                background: "white",
                paddingBottom: focus ? "0.5rem" : "2rem",
                maxWidth: "30rem",
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
                <Mentions
                  rows="3"
                  style={{ width: "100%" }}
                  onChange={this.onChange}
                  onSelect={this.onSelect}
                  placeholder="Write your reply…"
                  value={commentContentState}
                >
                  {uniqueUsers.map(user => {
                    return (
                      <Mentions.Option key={user} value={user}>
                        {user}
                      </Mentions.Option>
                    );
                  })}
                </Mentions>
              </div>
            </div>
            <div
              style={{
                paddingBottom: focus ? "5rem" : "2rem",
                width: "100%",
              }}
            >
              <Button
                margin="0 auto"
                loading={submitting}
                onClick={this.handleSubmit}
                styleType="primary"
                text="Post reply"
              />
            </div>
            {this.state.errors.comment && (
              <Error>{this.state.errors.comment}</Error>
            )}
          </ReplyWrapper>
        </Wrapper>
      </Layout>
    );
  }
}
