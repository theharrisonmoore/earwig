import React, { Component } from "react";
import { Mention, Input, Button, Icon } from "antd";
import * as yup from "yup";
import { Link } from "react-router-dom";
import axios from "axios";

import {
  Wrapper,
  CommentsDiv,
  CommentsHeader,
  Close,
  CommentsTitle,
  IndividComment,
  UserID,
  CommentBubble
} from "./ProfileAnswers.style";

import { StyledAntIcon } from "./../Profile.style";

import { REPORT_CONTENT_URL } from "./../../../../constants/naviagationUrls";

import CloseIcon from "./../../../../assets/close-icon.svg";

import { isMobileDevice } from "./../../../../helpers";
import { API_ADD_COMMENT_ON_QUESTION_URL } from "./../../../../apiUrls";

const { toString, toContentState, getMentions } = Mention;

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
    let schema = yup.object().shape({
      comment: yup.string().min(1, "comment is required!"),
      user: yup.string().required("user is required!")
    });

    // return new Promise((resolve, reject) => {
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
              console.log("----------------------");
            })
            .catch(err => {
              console.log(err, "+++++++++++++++++++");
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
      organization
    } = this.props;

    const users =
      comments &&
      comments.reduce((prev, curr) => {
        prev.push(curr.userId);
        return prev;
      }, []);

    // console.log(getMentions(toContentState("@ramy shurafa @shurafa2")));

    return (
      <Wrapper>
        <CommentsDiv isMobile={isMobile} ref={this.fixedDiv}>
          {commentsLoaded ? (
            <>
              <CommentsHeader>
                <CommentsTitle>{question.question.profileText}</CommentsTitle>
                <Close src={CloseIcon} alt="close" onClick={toggleComments} />
              </CommentsHeader>

              {comments &&
                comments.map(comment => (
                  <IndividComment key={comment._id}>
                    <UserID>{comment.displayName || comment.userId}</UserID>
                    <CommentBubble>
                      <pre style={{ marginBottom: 0 }}>{comment.text}</pre>
                    </CommentBubble>
                    <Link
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
              <div ref={this.inputWrapper}>
                <Input
                  placeholder="Comment as"
                  style={{ margin: "0.25rem 0", width: "10rem" }}
                  onChange={this.handleChangeUserName}
                  value={this.state.user}
                />
                {this.state.errors.user && <p>{this.state.errors.user}</p>}
                <Mention
                  style={{ width: "100%" }}
                  onChange={this.onChange}
                  defaultSuggestions={users}
                  onFocus={this.handleFocus}
                  value={this.state.commentContentState}
                  multiLines
                  placeholder={"input @ to mention"}
                />
                {this.state.errors.comment && (
                  <p>{this.state.errors.comment}</p>
                )}

                {/* loading={submitting}
                  onClick={onSubmit} */}
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
          ) : (
            <h2>Loading...</h2>
          )}
        </CommentsDiv>
      </Wrapper>
    );
  }
}
