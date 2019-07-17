import React, { Component } from "react";
import { Mention, Input, message } from "antd";
import * as yup from "yup";
import { Link } from "react-router-dom";
import axios from "axios";

import Loading from "./../../../Common/AntdComponents/Loading";

import {
  Wrapper,
  CommentsDiv,
  CommentsHeader,
  Close,
  CommentsTitle,
  IndividComment,
  UserID,
  CommentBubble,
  Error
} from "./ProfileAnswers.style";

import { organizations } from "./../../../../theme";

import { StyledAntIcon, StyledReplyIcon } from "./../Profile.style";

import { REPORT_CONTENT_URL } from "./../../../../constants/naviagationUrls";

import CloseIcon from "./../../../../assets/close-icon.svg";

import { isMobileDevice, highlightMentions } from "./../../../../helpers";
import { API_ADD_COMMENT_ON_QUESTION_URL } from "./../../../../apiUrls";

const { toString, toContentState } = Mention;

export default class CommentsBox extends Component {
  state = {
    commentContentState: toContentState(""),
    user: "",
    errors: {}
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

  handleFocus = e => {
    if (isMobileDevice.any()) {
      this.inputWrapper.current.style.marginBottom = "320px";
      this.fixedDiv.current.scrollIntoView(false);
    }
  };

  handleBlur = () => {
    if (isMobileDevice.any()) {
      this.inputWrapper.current.style.marginBottom = "2rem";
    }
  };

  handleSubmit = () => {
    this.validate().then(res => {
      res &&
        this.setState({ errors: {} }, () => {
          const { organization, question } = this.props;
          const data = {
            text: toString(this.state.commentContentState),
            displayName: this.state.user,
            question: question._id,
            organization: organization._id
          };
          axios
            .post(API_ADD_COMMENT_ON_QUESTION_URL, data)
            .then(({ data }) => {
              const question = {
                ...this.props.question,
                _id: this.props.question._id
              };
              this.setState(
                {
                  commentContentState: toContentState(""),
                  errors: {}
                },
                () => this.props.fetchComments(question)
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

  render() {
    const {
      question,
      toggleComments,
      comments,
      commentsLoaded,
      isMobile,
      organization,
      category,
      isAdmin,
      verified
    } = this.props;

    const users =
      comments &&
      comments.reduce((prev, curr) => {
        prev.push(curr.displayName || curr.userId);
        return prev;
      }, []);

    return (
      <Wrapper>
        <CommentsDiv isMobile={isMobile} ref={this.fixedDiv}>
          {commentsLoaded ? (
            <>
              <CommentsHeader>
                <CommentsTitle>{question.profileText}</CommentsTitle>
                <Close src={CloseIcon} alt="close" onClick={toggleComments} />
              </CommentsHeader>

              {comments &&
                comments.map(comment => (
                  <IndividComment key={comment._id}>
                    <UserID>{comment.displayName || comment.userId}</UserID>
                    <CommentBubble as="pre">
                      {highlightMentions(comment.text)}
                    </CommentBubble>
                    <Link
                      style={{
                        right: 0,
                        position: "absolute",
                        border: 0,
                        bottom: "-0.5rem"
                      }}
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
                    </Link>
                  </IndividComment>
                ))}
              {verified && (
                <div ref={this.inputWrapper}>
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
                  <div style={{ position: "relative", marginBottom: "2rem" }}>
                    <Mention
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
                    <Error style={{ marginTop: "-2rem" }}>
                      {this.state.errors.comment}
                    </Error>
                  )}
                </div>
              )}
            </>
          ) : (
            <Loading />
          )}
        </CommentsDiv>
      </Wrapper>
    );
  }
}
