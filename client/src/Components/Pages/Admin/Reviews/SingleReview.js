import React, { Component } from "react";
import axios from "axios";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
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

const STATIC_QUESTIONS = [
  {
    number: 18,
    text: "How would you rate this agency?",
    type: "rate",
    options: ["Bad", "Poor", "Average", "Great", "Excellent"]
  },
  {
    number: 19,
    text: "If you’d like to write an overall review, go ahead here",
    type: "overallReview",
    hintText:
      "To help other workers, please try to explain why something was or wasn't good."
  },
  {
    number: 20,
    text: "Share a voice review",
    hintText:
      "30 seconds max. Bear in mind that people may be able to identify you from your voice.",
    type: "voiceReview"
  }
];

export default class SingleReview extends Component {
  state = {
    isLoading: true,
    groups: [],
    organization: { category: "", name: "" },
    id: ""
  };
  fetchData = () => {
    const { category, name } = this.props.location.state;
    const { organization } = this.state;
    organization.category = category;
    organization.name = name;
    const reviewID = window.location.href.split("/")[5];
    axios
      .get(`/api/admin/single-review/${reviewID}`)
      .then(res => {
        this.setState({ groups: res.data, isLoading: false });
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
    console.log(option);
    console.log(answers);
    return answers.map(answer => (answer === option ? true : false));
    // return answer === option ? true : false;
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
      organization: { name, category }
    } = this.state;
    return (
      <ReviewWrapper>
        <Header orgType={category}>
          <Content>
            <ImageBox className="image-box">
              <Image src={agencyIcon} alt="" className="header-icon" />
            </ImageBox>
            <Organization>
              <Paragraph>Review by XXXX for</Paragraph>
              <OrgName>{name}</OrgName>
              <ReviewTime>
                18 questions <img src={clockLong} alt="" /> 2 mins
              </ReviewTime>
            </Organization>
          </Content>
        </Header>
        <section>
          <Formik initialValues={initialValues}>
            {({ values }) => {
              return (
                <FormWrapper>
                  <Form>
                    <div>
                      {/* a placeholder to be edited with new picker */}
                      <p>Select the month(s) you used this agency?</p>
                    </div>
                    <div>
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
                                  label,
                                  hasComment
                                } = question;

                                if (type === "yesno" || type === "radio") {
                                  return (
                                    <QuestionOptionsWrapper>
                                      <h3>{question.text}</h3>
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
                                        {hasComment && (
                                          <ModalComment
                                            title="Enter you comment here"
                                            number={number}
                                            comment
                                            render={props => {
                                              return (
                                                <CommentsIcon
                                                  hasValue={!!props.text}
                                                >
                                                  <img
                                                    src={commentIcon}
                                                    alt=""
                                                  />
                                                </CommentsIcon>
                                              );
                                            }}
                                          />
                                        )}
                                      </Options>
                                    </QuestionOptionsWrapper>
                                  );
                                }

                                if (type === "open") {
                                  return (
                                    <QuestionOptionsWrapper>
                                      <h3>{question.text}</h3>
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
                                      {hasComment && (
                                        <ModalComment
                                          title="Enter you comment here"
                                          number={number}
                                          comment
                                          render={props => {
                                            return (
                                              <CommentsIcon
                                                hasValue={!!props.text}
                                              >
                                                <img src={commentIcon} alt="" />
                                              </CommentsIcon>
                                            );
                                          }}
                                        />
                                      )}
                                    </QuestionOptionsWrapper>
                                  );
                                }

                                if (type === "number") {
                                  return (
                                    <QuestionOptionsWrapper>
                                      <h3>{question.text}</h3>
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
                                      {hasComment && (
                                        <ModalComment
                                          title="Enter you comment here"
                                          number={number}
                                          comment
                                          render={props => {
                                            return (
                                              <CommentsIcon
                                                hasValue={!!props.text}
                                              >
                                                <img src={commentIcon} alt="" />
                                              </CommentsIcon>
                                            );
                                          }}
                                        />
                                      )}
                                    </QuestionOptionsWrapper>
                                  );
                                }

                                if (type === "dropdown") {
                                  // const { dropdownOptions } = this.props;
                                  // let newOptions = [...dropdownOptions];
                                  return (
                                    <QuestionOptionsWrapper>
                                      <h3>{question.text}</h3>
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
                                      {hasComment && (
                                        <ModalComment
                                          title="Enter you comment here"
                                          number={number}
                                          comment
                                          render={props => {
                                            return (
                                              <CommentsIcon
                                                hasValue={!!props.text}
                                              >
                                                <img src={commentIcon} alt="" />
                                              </CommentsIcon>
                                            );
                                          }}
                                        />
                                      )}
                                    </QuestionOptionsWrapper>
                                  );
                                }

                                if (type === "overallReview") {
                                  return (
                                    <QuestionOptionsWrapper>
                                      <h3>{question.text}</h3>
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
                                  return (
                                    <QuestionOptionsWrapper>
                                      <h3>{question.text}</h3>
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
                                                    value={option}
                                                    checked={this.checkBoxIten(
                                                      answer,
                                                      option
                                                    )}
                                                    // checked={values.questions[
                                                    //   number
                                                    // ].includes(answer)}
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
                                      {hasComment && (
                                        <ModalComment
                                          title="Enter you comment here"
                                          number={number}
                                          comment
                                          render={props => {
                                            return (
                                              <CommentsIcon
                                                hasValue={!!props.text}
                                              >
                                                <img src={commentIcon} alt="" />
                                              </CommentsIcon>
                                            );
                                          }}
                                        />
                                      )}
                                    </QuestionOptionsWrapper>
                                  );
                                }

                                if (type === "image") {
                                  return (
                                    <QuestionOptionsWrapper>
                                      <h3>{question.text}</h3>
                                      <p>Image</p>
                                    </QuestionOptionsWrapper>
                                  );
                                }

                                if (type === "rate") {
                                  return (
                                    <QuestionOptionsWrapper>
                                      <h3>{question.text}</h3>
                                      <Field name="review.rate">
                                        {({ field, form }) => (
                                          <Rate
                                            {...field}
                                            value={answer}
                                            // {...form}
                                            tooltips={options}
                                            style={{
                                              color: `${
                                                organizations[category].primary
                                              }`,
                                              fontSize: "3rem"
                                            }}
                                          />
                                        )}
                                      </Field>
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
