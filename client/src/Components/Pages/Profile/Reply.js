import React, { Component } from "react";
import { Mention, Input, Button, message } from "antd";
import * as yup from "yup";
import { Link } from "react-router-dom";
import axios from "axios";

import {
  UserID,
  CommentBubble,
  Error
} from "./ProfileAnswers/ProfileAnswers.style";
import { Wrapper, IndividComment } from "./Reply.style";

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
    let schema = yup.object().shape({
      comment: yup.string().min(1, "comment is required!"),
      user: yup.string().required("user is required!")
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
                  user: "",
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
            this.setState({
              replies: data,
              activeOverallId: id,
              loaded: true,
              reviewId: id
            });
          })
          .catch(err => {
            console.log(err);
          })
      : this.setState({
          replies: [],
          activeOverallId: "",
          loaded: true,
          reviewId: id
        });
  };

  componentDidMount() {
    const { reviewId, target } = this.props.location.state;
    if (target === "overall") {
      this.fetchOverallReplies(reviewId);
    }
  }

  render() {
    const { replies } = this.state;

    const users =
      replies &&
      replies.reduce((prev, curr) => {
        prev.push(curr.replies.displayName || curr.replies.user[0].userId);
        return prev;
      }, []);

    // const users = [];
    if (!this.state.loaded) {
      return <Loading />;
    }
    return (
      <Wrapper>
        <>
          {replies &&
            replies.map(reply => (
              <IndividComment key={reply.replies._id}>
                <UserID>{reply.replies.user[0].userId}</UserID>
                <CommentBubble as="pre">
                  {highlightMentions(reply.replies.text)}
                </CommentBubble>
                {/* <Link
                  to={{
                    pathname: REPORT_CONTENT_URL,
                    state: {
                      comment,
                      question,
                      organization,
                      target: "questionComment"
                    }
                  }}
                >
                  <StyledAntIcon type="flag" />
                </Link> */}
              </IndividComment>
            ))}

          <div ref={this.inputWrapper} style={{ textAlign: "left" }}>
            <Input
              placeholder="Comment as"
              style={{ marginTop: "0.25rem", width: "10rem" }}
              onChange={this.handleChangeUserName}
              value={this.state.user}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
            />
            {this.state.errors.user && <Error>{this.state.errors.user}</Error>}
            <Mention
              style={{ width: "100%", marginTop: "0.25rem" }}
              onChange={this.onChange}
              defaultSuggestions={users}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              value={this.state.commentContentState}
              multiLines
              placeholder={"input @ to mention"}
            />

            {this.state.errors.comment && (
              <Error>{this.state.errors.comment}</Error>
            )}

            <Button
              style={{ marginTop: "0.25rem" }}
              htmlType="submit"
              type="primary"
              onClick={this.handleSubmit}
            >
              Add Comment
            </Button>
          </div>
        </>
      </Wrapper>
    );
  }
}
