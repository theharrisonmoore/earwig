import React, { Component } from "react";
import axios from "axios";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import StarRatingComponent from "react-star-rating-component";
import moment from "moment";

import {
  Table,
  Modal,
  message,
  Select,
  Icon,
  Divider,
  Input,
  Rate,
  InputNumber
} from "antd";
import ModalComment from "../../../Common/AntdComponents/ModalComment";
import commentIcon from "../../../../assets/comment-icon.svg";
import {
  ReviewWrapper,
  SubmitButton,
  UserAgreement,
  CheckboxWrapper,
  Header,
  Content,
  ImageBox,
  Image,
  Organization,
  OrgName,
  ReviewTime,
  Paragraph,
  FormWrapper,
  Level2Header,
  AgreementLabel
} from "../../Review/Review.style";

import {
  QuestionWrapper,
  QuestionOptionsWrapper,
  InputWrapper,
  QText,
  HintText,
  Options,
  CommentsIcon,
  StyledErrorMessage,
  Input as StyledInput
} from "../../Review/Question/Question.style";

import { Question, RadioButton } from "../../Review/Question/index";
import agencyIcon from "../../../../assets/agency-icon.svg";
import clockLong from "./../../../../assets/clock-long-icon.svg";
import { initQueestionsValues } from "../../Review/initialQuestionsValues";
import { colors, organizations } from "../../../../theme";

export default class SingleReview extends Component {
  state = {
    isLoading: true,
    groups: [],
    rate: null,
    organization: { category: "", name: "" },
    user: { id: "", email: "" },
    reviewID: ""
  };
  fetchData = () => {
    const { category, name, userEmail, userID } = this.props.location.state;
    const { organization, user, reviewID } = this.state;
    organization.category = category;
    organization.name = name;
    user.email = userEmail;
    user.id = userID;
    const id = window.location.href.split("/")[5];

    axios
      .get(`/api/admin/single-review/${id}`)
      .then(res => {
        this.setState({
          groups: res.data,
          reviewID: id,
          isLoading: false
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

  checkIten = (answer, option) => {
    return answer === option ? true : false;
  };

  checkBoxIten = (answers, option) => {
    return answers.map(answer => (answer === option ? true : false));
  };

  render() {
    const { isLoading } = this.state;
    if (isLoading) {
      return <div>loading....</div>;
    }
    const initialValues = {
      questions: initQueestionsValues[this.state.organization.category],
      comments: initQueestionsValues[this.state.organization.category],
      // checklist: [],
      review: {
        workPeriod: {
          from: "2019-01-01",
          to: "2019-03-31"
        },
        rate: 3,
        overallReview: "",
        voiceReview: ""
      },
      hasAgreed: false,
      worksiteImage: ""
    };
    if (!this.state && !this.state.groups[0]) {
      return null;
    }

    const {
      groups,
      organization: { name, category },
      user: { email, id },
      reviewID
    } = this.state;
    console.log(groups);
    // get overall review details
    let overallRating, overallText, workedFrom, workedTo, replies, votes;
    if (groups.length && groups[0].answers.length) {
      overallRating = groups[0].answers[0].review[0].rate;
      overallText = groups[0].answers[0].review[0].overallReview.text;
      workedFrom = groups[0].answers[0].review[0].workPeriod.from;
      workedTo = groups[0].answers[0].review[0].workPeriod.to;
      replies = groups[0].answers[0].review[0].overallReview.replies;
      votes = groups[0].answers[0].review[0].overallReview.votes;
    }

    return (
      <ReviewWrapper>
        <Header orgType={category}>
          <Content>
            <ImageBox className="image-box">
              <Image src={agencyIcon} alt="" className="header-icon" />
            </ImageBox>
            <Organization>
              <Paragraph>Review </Paragraph>
              <Paragraph> (ID {reviewID}) </Paragraph>
              <OrgName>{name}</OrgName>
              <StarRatingComponent
                name="star rating component"
                editing={false}
                starCount={5}
                value={overallRating}
                emptyStarColor={"#D3D3D3"}
              />
            </Organization>
          </Content>
        </Header>
        <section>
          <Formik initialValues={initialValues}>
            {({ values }) => {
              return (
                <FormWrapper>
                  <Form>
                    <QuestionOptionsWrapper>
                      <h1>User:</h1>
                      <QText>Email:</QText>
                      <HintText>{email}</HintText>
                      <QText>ID:</QText>
                      <HintText>{id}</HintText>
                    </QuestionOptionsWrapper>
                    <QuestionOptionsWrapper>
                      <h1>Overall Results</h1>
                      {workedFrom && workedTo && (
                        <div>
                          <QText>Work Period:</QText>
                          <HintText>
                            {moment(workedFrom).format("DD MMM YYYY")} to{" "}
                            {moment(workedTo).format("DD MMM YYYY")}
                          </HintText>
                        </div>
                      )}
                      {overallText && (
                        <div>
                          <QText>Feedback:</QText>
                          <HintText>{overallText}</HintText>
                        </div>
                      )}
                      {replies && replies.length && (
                        <div>
                          <QText>Replies: </QText>
                          {replies.map(reply => {
                            return (
                              <div>
                                <HintText>
                                  {reply.text} by UserID {reply.user}
                                </HintText>
                              </div>
                            );
                          })}
                        </div>
                      )}
                      {votes && votes.length && (
                        <div>
                          <QText>Votes: </QText>
                          {votes.map(vote => {
                            return (
                              <div>
                                <HintText>
                                  {vote.points} Points by UserID {vote.user}
                                </HintText>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </QuestionOptionsWrapper>
                    <div>
                      <h1>Answers</h1>

                      {groups.map(group => {
                        if (group.group && group.group.text) {
                          return (
                            <div key={group._id}>
                              <h2>{group.group.text}</h2>
                              {group.answers.map(entry => {
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
                                      <QText>{question.text}</QText>
                                      <HintText>{question.hintText}</HintText>
                                      <Options>
                                        <div
                                          className={`choices choices-${
                                            options.length
                                          }`}
                                        >
                                          {options.map((option, i, arr) => {
                                            return (
                                              <Field
                                                key={option}
                                                component={RadioButton}
                                                name={`questions[${number}]`}
                                                id={`${option}-${number}`}
                                                className={`hide radio-input ${option}`}
                                                checked={this.checkIten(
                                                  answer,
                                                  option
                                                )}
                                                option={option}
                                                count={options.length}
                                                category={category}
                                              />
                                            );
                                          })}
                                        </div>
                                      </Options>
                                    </QuestionOptionsWrapper>
                                  );
                                }

                                if (type === "open") {
                                  return (
                                    <QuestionOptionsWrapper>
                                      <QText>{question.text}</QText>
                                      <HintText>{question.hintText}</HintText>
                                      <Field name={`questions[${number}]`}>
                                        {({ field, form }) => (
                                          <Input
                                            {...field}
                                            // {...form}
                                            size="large"
                                            value={answer}
                                            style={{
                                              border: `1px solid ${
                                                colors.dustyGray1
                                              }`
                                            }}
                                          />
                                        )}
                                      </Field>
                                    </QuestionOptionsWrapper>
                                  );
                                }

                                if (type === "number") {
                                  return (
                                    <QuestionOptionsWrapper>
                                      <QText>{question.text}</QText>
                                      <HintText>{question.hintText}</HintText>
                                      <Field
                                        name={`questions[${number}]`}
                                        type="number"
                                      >
                                        {({ field, form }) => (
                                          <InputNumber
                                            {...field}
                                            // {...form}

                                            style={{
                                              border: `1px solid ${
                                                colors.dustyGray1
                                              }`,
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
                                    </QuestionOptionsWrapper>
                                  );
                                }

                                if (type === "dropdown") {
                                  return (
                                    <QuestionOptionsWrapper>
                                      <QText>{question.text}</QText>
                                      <HintText>{question.hintText}</HintText>
                                      <Field name={`questions[${number}]`}>
                                        {({ field, form }) => {
                                          return (
                                            <>
                                              <Select
                                                value={answer}
                                                disabled
                                                style={{
                                                  border: `1px solid ${
                                                    colors.dustyGray1
                                                  }`
                                                }}
                                              />
                                            </>
                                          );
                                        }}
                                      </Field>
                                    </QuestionOptionsWrapper>
                                  );
                                }

                                if (type === "overallReview") {
                                  return (
                                    <QuestionOptionsWrapper>
                                      <QText>{question.text}</QText>
                                      <HintText>
                                        {question.hintText}
                                      </HintText>{" "}
                                      <Field name={`review.overallReview`}>
                                        {({ field, form }) => (
                                          <Input.TextArea
                                            rows={4}
                                            {...field}
                                            // {...form}
                                            value={answer}
                                            style={{
                                              border: `1px solid ${
                                                colors.inputBorder
                                              }`
                                            }}
                                          />
                                        )}
                                      </Field>
                                    </QuestionOptionsWrapper>
                                  );
                                }

                                if (type === "checklist") {
                                  // console.log(answer);
                                  return (
                                    <QuestionOptionsWrapper>
                                      <QText>{question.text}</QText>
                                      <HintText>{question.hintText}</HintText>
                                      <FieldArray
                                        name={`questions[${number}]`}
                                        render={arrayHelpers => (
                                          <div>
                                            {options &&
                                              options.length > 0 &&
                                              options.map((option, index) => (
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
                                              ))}
                                          </div>
                                        )}
                                      />
                                    </QuestionOptionsWrapper>
                                  );
                                }

                                if (type === "image") {
                                  return (
                                    <QuestionOptionsWrapper>
                                      <QText>{question.text}</QText>
                                      <HintText>{question.hintText}</HintText>
                                      <p>Image</p>
                                    </QuestionOptionsWrapper>
                                  );
                                }
                              })}
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </Form>
                </FormWrapper>
              );
            }}
          </Formik>
        </section>
      </ReviewWrapper>
    );
  }
}
