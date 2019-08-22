import React, { Component } from "react";
import { Mentions, Input, message, Alert } from "antd";
import * as yup from "yup";
import axios from "axios";

import {
  UserID,
  CommentBubble,
  Error
} from "./ProfileAnswers/ProfileAnswers.style";

import {
  Wrapper,
  IndividComment,
  ReplyWrapper,
  CommentsWrapper,
  Banner,
  Cancel
} from "./Reply.style";
import {
  BannerTitle,
  UserDiv,
  UserTrade,
  UserAdditionalDetails
} from "./Profile.style";

import { organizations } from "./../../../theme";

import { API_ADD_COMMENT_ON_REVIEW_URL } from "./../../../apiUrls";

import { highlightMentions } from "../../../helpers";

import Loading from "./../../Common/AntdComponents/Loading";
import Button from "./../../Common/Button";

export default class Reply extends Component {
  state = {
    commentContentState: "",
    replies: [],
    user: "",
    errors: {},
    loaded: false,
    submitting: false,
    focus: false
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

    let schema = yup.object().shape({
      comment: yup.string().min(1, "comment is required!"),
      user: isAdmin ? yup.string().required("user is required!") : null
    });

    return schema
      .validate(
        {
          comment: this.state.commentContentState,
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
        this.setState({ errors: {}, submitting: true }, () => {
          const data = {
            text: this.state.commentContentState,
            displayName: this.state.user,
            reviewId,
            target
          };
          axios
            .post(API_ADD_COMMENT_ON_REVIEW_URL, data)
            .then(({ data }) => {
              this.setState(
                {
                  commentContentState: "",
                  errors: {},
                  submitting: false
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
    });
  };

  inputWrapper = React.createRef();
  fixedDiv = React.createRef();

  fetchOverallReplies = (id, target) => {
    id
      ? axios
          .get(`/api/reviews/${target}/replies/${id}`)
          .then(({ data }) => {
            this.setState(
              {
                replies: data,
                activeOverallId: id,
                loaded: true,
                reviewId: id
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

    const { replies, loaded, submitting, focus } = this.state;
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
          <CommentsWrapper>
            {replies &&
              replies.map(reply => (
                <IndividComment key={reply.replies._id}>
                  {!verified && reply.replies.user._id === id && (
                    <Alert
                      message="Your replies are visible only for you untill you get
                    verified"
                      type="warning"
                      style={{
                        display: "inline-block",
                        marginBottom: "0.5rem"
                      }}
                      banner
                    />
                  )}
                  <UserDiv>
                    <UserID>
                      {" "}
                      {reply.replies.displayName || reply.replies.user.userId}
                    </UserID>
                    <UserTrade>
                      {reply.replies.user.trade &&
                        reply.replies.user.trade[0] &&
                        reply.replies.user.trade[0].title}
                    </UserTrade>
                  </UserDiv>
                  <UserAdditionalDetails>
                    <p>
                      Helped {reply.replies.user.helpedUsers} · Points{" "}
                      {reply.replies.user.points}
                    </p>
                  </UserAdditionalDetails>
                  <CommentBubble
                    as="pre"
                    color={organizations[category].secondary}
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
                maxWidth: "30rem"
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
                  placeholder={"Write your reply…"}
                >
                  {uniqueUsers.map((user, index) => {
                    return (
                      <Mentions.Option key={index} value={user}>
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
                width: "100%"
              }}
            >
              <Button
                style={{ maxWidth: "30rem", margin: "0 auto" }}
                category={category}
                backgroundColor={organizations[category].primary}
                loading={submitting}
                onClick={this.handleSubmit}
              >
                Post reply
              </Button>
            </div>
            {this.state.errors.comment && (
              <Error>{this.state.errors.comment}</Error>
            )}
          </ReplyWrapper>
        </Wrapper>
      </>
    );
  }
}
