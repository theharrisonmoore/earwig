// renders a single review and shows all the answers
// admin can change isVerified status
// admin can delete individual answers
// uses its own formik component but the styles from Review.style

import React, { Component } from "react";
import axios from "axios";
import { Formik, Form, Field, FieldArray } from "formik";
import StarRatingComponent from "react-star-rating-component";
import moment from "moment";
import Swal from "sweetalert2";
import { message, Select, Input, Modal, InputNumber } from "antd";

import Loading from "./../../../Common/AntdComponents/Loading";
import VoiceReview from "../../Profile/ProfileAnswers/VoiceReview";

import { SVGCreator, NewSVGCreator, isMobile } from "../../../../helpers";

import {
  ReviewWrapper,
  Content,
  ImageBox,
  Organization,
  OrgName,
  Paragraph,
  FormWrapper,
  DetailsDiv,
  Button,
  ButtonDiv,
  DelButton,
  StarRating,
  Headline
} from "../../Review/Review.style";

import { SingleReviewHeader, DetailedAnswers } from "./AdminReview.style";

import {
  QuestionOptionsWrapper,
  AnswerDiv,
  QText,
  HintText,
  Options,
  StyledInput,
  InputWrapper
} from "../../Review/Question/Question.style";

import { colors } from "../../../../theme";

export default class SingleReview extends Component {
  state = {
    isLoading: true,
    groups: [],
    organization: { category: "", name: "" },
    user: { id: "", email: "" },
    images: {},
    review: {}
  };

  // get the image url using the image name
  fetchImage = answer => {
    if (!this.state.images[answer]) {
      axios.get(`/api/admin/images/${answer}`).then(({ data }) => {
        this.setState({ images: { ...this.state.images, [answer]: data.url } });
      });
    }
  };

  // fetches all data relevant to user, organisation and review
  fetchData = () => {
    const { id: reviewId } = this.props.match.params;

    axios
      .get(`/api/admin/single-review/${reviewId}`)
      .then(res => {
        const { review, details } = res.data;
        this.setState({
          groups: details,
          isLoading: false,
          review: review,
          organization: review.organization,
          user: review.user
        });
      })
      .catch(err => {
        const error =
          err.response && err.response.data && err.response.data.error;
        message.error(error || "Something went wrong");
        this.fetchData();
      });
  };

  componentDidMount() {
    this.fetchData();
  }

  // checks boxes according to answers given
  checkIten = (answer, option) => {
    return answer === option ? true : false;
  };

  // changes color of isVerified updater button
  changeBtnColor = bool => (bool === true ? colors.red : colors.green);

  // renders btn text
  renderBtnText = bool => (bool === true ? "Reject Review" : "Approve Review");

  // updates isVerified status and notifies admin
  updateIsVerified = ({ id, bool }) => {
    axios
      .patch("/api/admin/reviews/update-status", {
        id,
        bool
      })
      .then(res => {
        Swal.fire({
          type: "success",
          title: "Review status updated",
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          // this.props.history.push("/admin/reviews/verify");
          this.props.history.goBack();
        });
      })
      .catch(err => {
        Swal.fire({
          type: "error",
          title: "Oops...error updating review status",
          text: err.response.data.error
        });
      });
  };

  // asks admin if sure to delete answer
  showDeleteConfirm = answerID => {
    // delete from db and update
    Modal.confirm({
      title: "Are you sure you want to delete this answer?",
      okText: "Yes",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        return new Promise((resolve, reject) => {
          axios
            .delete(`/api/admin/reviews/delete-answer/${answerID}`)
            .then(res => {
              message.success("Deleted");
              this.fetchData();
              resolve();
            })
            .catch(err => {
              const error =
                err.response && err.response.data && err.response.data.error;
              message.error(error || "Something went wrong");
            });
        });
      }
    });
  };
  showDeleteReviewConfirm = reviewId => {
    // delete from db and update
    Modal.confirm({
      title: "Are you sure you want to delete this answer?",
      okText: "Yes",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () =>
        axios
          .patch(`/api/admin/reviews/${reviewId}`, {
            data: {
              "voiceReview.audio": ""
            }
          })
          .then(res => {
            message.success("Deleted");
            this.fetchData();
          })
          .catch(err => {
            const error =
              err.response && err.response.data && err.response.data.error;
            message.error(error || "Something went wrong");
          })
    });
  };

  // renders delete btn next to answer
  createDeleteBtn = answerID => {
    return (
      <DelButton type="button" onClick={() => this.showDeleteConfirm(answerID)}>
        {SVGCreator("delete-icon")}
      </DelButton>
    );
  };

  createDeleteOverallReview = reviewId => {
    return (
      <DelButton
        type="button"
        onClick={() => this.showDeleteReviewConfirm(reviewId)}
      >
        {SVGCreator("delete-icon")}
      </DelButton>
    );
  };

  render() {
    const { isLoading } = this.state;
    if (isLoading) {
      return <Loading />;
    }

    // state
    const {
      groups,
      organization: { name, category },
      user: { email, _id: id },
      review: {
        voiceReview,
        overallReview: { text: overallText, replies },
        workPeriod: { from: workedFrom, to: workedTo },
        rate,
        _id: reviewId,
        isVerified
      }
    } = this.state;

    return (
      <ReviewWrapper>
        <SingleReviewHeader orgType={category} style={{ marginBottom: "3rem" }}>
          <Content>
            <ImageBox>
              {!isMobile(window.innerWidth) &&
                NewSVGCreator(category, "4rem", "4rem", "white")}
            </ImageBox>
            <Organization>
              <Paragraph style={{ paddingRight: ".5rem" }}>Review </Paragraph>
              <Paragraph> (ID {reviewId}) </Paragraph>
              <OrgName>{name}</OrgName>
            </Organization>
          </Content>
        </SingleReviewHeader>
        <DetailedAnswers>
          <Formik>
            {() => {
              return (
                <FormWrapper>
                  <Form>
                    <QuestionOptionsWrapper>
                      <QText>Overall Rating </QText>
                      <StarRating>
                        <StarRatingComponent
                          name="star rating component"
                          editing={false}
                          starCount={5}
                          value={rate}
                          emptyStarColor={"#D3D3D3"}
                        />
                      </StarRating>
                    </QuestionOptionsWrapper>
                    <QuestionOptionsWrapper>
                      <Headline>User Data:</Headline>
                      <DetailsDiv>
                        <QText>Email:</QText>
                        <HintText>{email}</HintText>
                      </DetailsDiv>
                      <DetailsDiv>
                        <QText>ID:</QText>
                        <HintText>{id}</HintText>
                      </DetailsDiv>
                    </QuestionOptionsWrapper>
                    <QuestionOptionsWrapper>
                      <Headline>Voice review:</Headline>
                      {!!voiceReview && !!voiceReview.audio ? (
                        <>
                          <VoiceReview
                            category={category}
                            filename={voiceReview.audio}
                          />
                          {this.createDeleteOverallReview(reviewId)}
                        </>
                      ) : (
                        <div>No voice review</div>
                      )}
                    </QuestionOptionsWrapper>
                    <QuestionOptionsWrapper>
                      <Headline>Overall Results</Headline>

                      {workedFrom && workedTo && (
                        <DetailsDiv>
                          <QText>Work Period:</QText>
                          <HintText>
                            {moment(workedFrom).format("DD MMM YYYY")} to{" "}
                            {moment(workedTo).format("DD MMM YYYY")}
                          </HintText>
                        </DetailsDiv>
                      )}
                      {!!overallText && (
                        <DetailsDiv>
                          <QText>Overall Feedback:</QText>
                          <HintText>{overallText}</HintText>
                        </DetailsDiv>
                      )}
                      {!!replies && !!replies.length && (
                        <DetailsDiv>
                          <QText>Replies: </QText>
                          {replies.map((reply, i) => {
                            return (
                              <div key={i}>
                                <HintText>
                                  {reply.text} by UserID {reply.user}
                                </HintText>
                              </div>
                            );
                          })}
                        </DetailsDiv>
                      )}
                    </QuestionOptionsWrapper>
                    {groups && !!groups.length && (
                      <div>
                        <Headline>Full Review Answers</Headline>

                        {groups.map(group => {
                          if (group.group && group.group.text) {
                            return (
                              <div key={group._id}>
                                <h2>{group.group.text}</h2>
                                {group.answers.map((entry, i) => {
                                  const question = entry.question[0];
                                  const answer = entry.answer;
                                  const {
                                    type,
                                    options,
                                    number,
                                    category,
                                    label
                                  } = question;

                                  if (type === "yesno" || type === "radio") {
                                    return (
                                      <QuestionOptionsWrapper>
                                        <Options options={options.length}>
                                          <div
                                            className={`choices choices-${options.length}`}
                                          >
                                            {options.map((option, i, arr) => {
                                              return (
                                                <InputWrapper
                                                  option={option}
                                                  orgType={category}
                                                  options={
                                                    question.options.length
                                                  }
                                                  key={option}
                                                >
                                                  <input
                                                    name={question.number}
                                                    id={`${option}-${question.number}`}
                                                    type="radio"
                                                    value={option}
                                                    className="radio-button"
                                                    checked={this.checkIten(
                                                      answer,
                                                      option
                                                    )}
                                                  />
                                                  <StyledInput
                                                    htmlFor={`${option}-${question.number}`}
                                                    className={`yesno options-3`}
                                                  >
                                                    {option}
                                                  </StyledInput>
                                                </InputWrapper>
                                              );
                                            })}
                                            {this.createDeleteBtn(entry._id)}
                                          </div>
                                        </Options>
                                      </QuestionOptionsWrapper>
                                    );
                                  }

                                  if (type === "open") {
                                    return (
                                      <QuestionOptionsWrapper key={i}>
                                        <QText>{question.text}</QText>
                                        <HintText>{question.hintText}</HintText>
                                        <AnswerDiv>
                                          <Field name={`questions[${number}]`}>
                                            {() => (
                                              <Input
                                                size="large"
                                                value={answer}
                                                style={{
                                                  border: `1px solid ${colors.dustyGray1}`
                                                }}
                                              />
                                            )}
                                          </Field>
                                          {this.createDeleteBtn(entry._id)}
                                        </AnswerDiv>
                                      </QuestionOptionsWrapper>
                                    );
                                  }

                                  if (type === "number") {
                                    return (
                                      <QuestionOptionsWrapper key={i}>
                                        <QText>{question.text}</QText>
                                        <HintText>{question.hintText}</HintText>
                                        <AnswerDiv>
                                          <Field
                                            name={`questions[${number}]`}
                                            type="number"
                                          >
                                            {() => (
                                              <InputNumber
                                                style={{
                                                  border: `1px solid ${colors.dustyGray1}`,
                                                  width: "12rem",
                                                  height: "70px",
                                                  lineHeight: "70px"
                                                }}
                                                size="large"
                                                value={answer}
                                                placeholder={`£       ${label}`}
                                              />
                                            )}
                                          </Field>
                                          {this.createDeleteBtn(entry._id)}
                                        </AnswerDiv>
                                      </QuestionOptionsWrapper>
                                    );
                                  }

                                  if (type === "dropdown") {
                                    return (
                                      <QuestionOptionsWrapper key={i}>
                                        <QText>{question.text}</QText>
                                        <HintText>{question.hintText}</HintText>
                                        <AnswerDiv>
                                          <Field name={`questions[${number}]`}>
                                            {() => {
                                              return (
                                                <>
                                                  <Select
                                                    value={answer}
                                                    disabled
                                                    style={{
                                                      border: `1px solid ${colors.dustyGray1}`
                                                    }}
                                                  />
                                                </>
                                              );
                                            }}
                                          </Field>
                                          {this.createDeleteBtn(entry._id)}
                                        </AnswerDiv>
                                      </QuestionOptionsWrapper>
                                    );
                                  }

                                  if (type === "overallReview") {
                                    return (
                                      <QuestionOptionsWrapper>
                                        <QText>{question.text}</QText>
                                        <HintText>{question.hintText}</HintText>
                                        <AnswerDiv>
                                          <Field name={`review.overallReview`}>
                                            {() => (
                                              <Input.TextArea
                                                rows={4}
                                                // {...form}
                                                value={answer}
                                                style={{
                                                  border: `1px solid ${colors.inputBorder}`
                                                }}
                                              />
                                            )}
                                          </Field>
                                          {this.createDeleteBtn(entry._id)}
                                        </AnswerDiv>
                                      </QuestionOptionsWrapper>
                                    );
                                  }

                                  if (type === "checklist") {
                                    return (
                                      <QuestionOptionsWrapper key={i}>
                                        <QText>{question.text}</QText>
                                        <HintText>{question.hintText}</HintText>
                                        <AnswerDiv>
                                          <FieldArray
                                            name={`questions[${number}]`}
                                            render={() => (
                                              <div>
                                                {options &&
                                                  options.length > 0 &&
                                                  options.map(
                                                    (option, index) => (
                                                      <div key={option}>
                                                        <Field
                                                          id={`${option}-${number}`}
                                                          type="checkbox"
                                                          name={`questions[${number}].${index}`}
                                                          checked={answer.includes(
                                                            option
                                                          )}
                                                        />
                                                        <label
                                                          htmlFor={`${option}-${number}`}
                                                        >
                                                          {option}
                                                        </label>
                                                      </div>
                                                    )
                                                  )}
                                              </div>
                                            )}
                                          />
                                          {this.createDeleteBtn(entry._id)}
                                        </AnswerDiv>
                                      </QuestionOptionsWrapper>
                                    );
                                  }

                                  if (type === "image") {
                                    this.fetchImage(answer);
                                    return (
                                      <QuestionOptionsWrapper key={i}>
                                        <QText>{question.text}</QText>
                                        <HintText>{question.hintText}</HintText>
                                        {this.state.images[answer] ? (
                                          <div style={{ position: "relative" }}>
                                            <img
                                              style={{ width: "90%" }}
                                              src={this.state.images[answer]}
                                              alt={answer}
                                            />
                                            <div
                                              style={{
                                                position: "absolute",
                                                right: 0,
                                                top: 0
                                              }}
                                            >
                                              {this.createDeleteBtn(entry._id)}
                                            </div>
                                          </div>
                                        ) : (
                                          <p>image Not Found</p>
                                        )}
                                      </QuestionOptionsWrapper>
                                    );
                                  }
                                  return null;
                                })}
                              </div>
                            );
                          }
                          return null;
                        })}
                      </div>
                    )}
                  </Form>
                </FormWrapper>
              );
            }}
          </Formik>

          <ButtonDiv>
            <Button
              color={this.changeBtnColor(isVerified)}
              onClick={() =>
                this.updateIsVerified({
                  id: reviewId,
                  bool: !isVerified
                })
              }
            >
              {this.renderBtnText(isVerified)}
            </Button>
          </ButtonDiv>
        </DetailedAnswers>
      </ReviewWrapper>
    );
  }
}
