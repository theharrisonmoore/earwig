import React, { Component } from "react";
import { Mentions, Input, message } from "antd";
import * as yup from "yup";
import axios from "axios";

import queryString from "query-string";

import UserInfo from "../../Common/UserInfo";
import InvisibleCommentAlert from "../../Common/InvisibleCommentAlert";

import { Error } from "../Profile/ProfileAnswers/ProfileAnswers.style";

import {
  Wrapper,
  IndividComment,
  ReplyWrapper,
  CommentsWrapper,
} from "./Reply.style";
import { CommentBubble } from "../Profile/Profile.style";

import { organizations, colors } from "../../../theme";

import {
  API_ADD_COMMENT_ON_REVIEW_URL,
  API_ADD_COMMENT_ON_QUESTION_URL,
} from "../../../apiUrls";
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
          comment: this.state.commentContentState.trim(),
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

  postCommentOnOverallReview = ({ reviewId, target }) => {
    const body = {
      text: this.state.commentContentState.trim(),
      displayName: this.state.user,
      reviewId,
      target,
    };
    axios
      .post(API_ADD_COMMENT_ON_REVIEW_URL, body)
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
  };

  postReplyOnComment = ({ questionId, orgId, parentCommentId, reviewId }) => {
    const body = {
      text: this.state.commentContentState,
      displayName: this.state.user,
      question: questionId,
      organization: orgId,
      parentCommentId,
      reviewId,
    };

    axios
      .post(API_ADD_COMMENT_ON_QUESTION_URL, body)
      .then(() => {
        this.setState(
          {
            commentContentState: "",
            user: "",
            errors: {},
            submitting: false,
          },
          () => this.fetchComments(parentCommentId)
        );
      })
      .catch(err => {
        const error =
          err.response && err.response.data && err.response.data.error;
        message.error(error || "Something went wrong");
      });
  };

  handleSubmit = () => {
    const {
      reviewId,
      target,
      questionId,
      orgId,
      parentCommentId,
    } = queryString.parse(this.props.location.search);

    this.validate().then(res => {
      if (res) {
        this.setState({ errors: {}, submitting: true }, () => {
          if (target === "comment") {
            this.postReplyOnComment({
              questionId,
              orgId,
              parentCommentId,
              reviewId,
            });
          } else {
            this.postCommentOnOverallReview({ reviewId, target });
          }
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
    const { reviewId, target, parentCommentId } = queryString.parse(
      this.props.location.search
    );
    if (target) {
      // target equal "overallReview" OR "voiceReview" OR "comment";
      if (target === "comment") {
        this.fetchComments(parentCommentId);
      } else {
        this.fetchOverallReplies(reviewId, target);
      }
    } else {
      this.goBack();
    }
  }

  fetchComments = parentCommentId => {
    axios.get(`/api/comments/${parentCommentId}`).then(({ data }) => {
      this.setState({
        replies: data.subComments,
        loaded: true,
      });
    });
  };

  goBack = () => {
    const { orgId, pageYOffset } = queryString.parse(
      this.props.location.search
    );

    this.props.history.replace(`/profile/${orgId}`, { pageYOffset });
  };

  goToSameTab = () => {
    const { orgId, activeTab } = queryString.parse(this.props.location.search);

    if (activeTab) {
      this.props.history.push(`/profile/${orgId}`, {
        activeTab,
      });
    } else {
      this.props.history.goBack();
    }
  };

  render() {
    const { verified, history, id } = this.props;
    const {
      reviewId,
      target,
      category,
      orgId,
      pageYOffset,
    } = queryString.parse(this.props.location.search);
    if (
      target !== "comment" &&
      (!reviewId || !target || !category || !orgId || !pageYOffset)
    ) {
      history.goBack();
      return null;
    }

    const {
      replies,
      loaded,
      submitting,
      focus,
      commentContentState,
    } = this.state;
    const { isAdmin } = this.props;

    const users =
      replies &&
      replies.reduce((prev, curr) => {
        prev.push(curr.displayName || curr.user.userId);
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
          customAction={() => this.goToSameTab()}
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
                  key={reply._id}
                  adminReply={reply.displayName}
                  category={category}
                >
                  {!verified && reply.user._id === id && (
                    <InvisibleCommentAlert />
                  )}

                  <UserInfo
                    userId={reply.displayName || reply.user.userId}
                    adminReply={!!reply.displayName}
                    trade={
                      !reply.displayName &&
                      reply.user.trade &&
                      reply.user.trade[0] &&
                      reply.user.trade[0].title
                    }
                    helpedUsers={reply.user.helpedUsers}
                    points={reply.user.points}
                  />

                  <CommentBubble
                    as="pre"
                    style={{ maxWidth: "100%" }}
                    bgColor={
                      reply.displayName
                        ? "white"
                        : organizations[category].secondary
                    }
                    color={reply.displayName && organizations[category].primary}
                    adminReply={!!reply.displayName}
                    category={category}
                  >
                    {highlightMentions(reply.text)}
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
