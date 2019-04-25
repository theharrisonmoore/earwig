import React, { Component } from "react";
import axios from "axios";
import { Formik, Form, Field, FieldArray } from "formik";
import StarRatingComponent from "react-star-rating-component";
import moment from "moment";

import { SVGCreator } from "../../../../helpers";

import { message, Select, Input, InputNumber } from "antd";
import {
  ReviewWrapper,
  Header,
  Content,
  ImageBox,
  Organization,
  OrgName,
  Paragraph,
  FormWrapper,
  DetailsDiv
} from "../../Review/Review.style";

import {
  QuestionOptionsWrapper,
  QText,
  HintText,
  Options
} from "../../Review/Question/Question.style";

import { RadioButton } from "../../Review/Question/index";

import { colors } from "../../../../theme";

export default class SingleReview extends Component {
  state = {
    isLoading: true,
    groups: [],
    organization: { category: "", name: "" },
    user: { id: "", email: "" },
    review: { revID: "", rating: "", overallRev: "" }
  };
  fetchData = () => {
    const {
      category,
      name,
      userEmail,
      userID,
      rating,
      overallRev,
      revID
    } = this.props.location.state;
    const { organization, user, review } = this.state;
    organization.category = category;
    organization.name = name;
    user.email = userEmail;
    user.id = userID;
    review.revID = revID;
    review.rating = rating;
    review.overallRev = overallRev;

    axios
      .get(`/api/admin/single-review/${revID}`)
      .then(res => {
        this.setState({
          groups: res.data,
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

    // state
    const {
      groups,
      organization: { name, category },
      user: { email, id },
      review: { revID, rating, overallRev }
    } = this.state;
    // review stats
    const workedFrom = overallRev.workedFrom;
    const workedTo = overallRev.workedTo;
    const overallText = overallRev.text;
    const replies = overallRev.replies;
    const votes = overallRev.votes;

    return (
      <ReviewWrapper>
        <Header orgType={category}>
          <Content>
            <ImageBox className="image-box">
              {SVGCreator(`${category}-category`, "125px", "100%")}
            </ImageBox>
            <Organization>
              <Paragraph>Review </Paragraph>
              <Paragraph> (ID {revID}) </Paragraph>
              <OrgName>{name}</OrgName>
              <StarRatingComponent
                name="star rating component"
                editing={false}
                starCount={5}
                value={rating}
                emptyStarColor={"#D3D3D3"}
              />
            </Organization>
          </Content>
        </Header>
        <section>
          <Formik>
            {() => {
              return (
                <FormWrapper>
                  <Form>
                    <QuestionOptionsWrapper>
                      <h1>User:</h1>
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
                      <h1>Overall Results</h1>
                      {workedFrom && workedTo && (
                        <DetailsDiv>
                          <QText>Work Period:</QText>
                          <HintText>
                            {moment(workedFrom).format("DD MMM YYYY")} to{" "}
                            {moment(workedTo).format("DD MMM YYYY")}
                          </HintText>
                        </DetailsDiv>
                      )}
                      {overallText && (
                        <DetailsDiv>
                          <QText>Overall Feedback:</QText>
                          <HintText>{overallText}</HintText>
                        </DetailsDiv>
                      )}
                      {replies && replies.length && (
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
                      {votes && votes.length && (
                        <DetailsDiv>
                          <QText>Votes: </QText>
                          {votes.map((vote, i) => {
                            return (
                              <div key={i}>
                                <HintText>
                                  {vote.points} Points by UserID {vote.user}
                                </HintText>
                              </div>
                            );
                          })}
                        </DetailsDiv>
                      )}
                    </QuestionOptionsWrapper>
                    {groups && groups.length && (
                      <div>
                        <h1>Full Review Answers</h1>
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
                                      <QuestionOptionsWrapper key={i}>
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
                                      <QuestionOptionsWrapper key={i}>
                                        <QText>{question.text}</QText>
                                        <HintText>{question.hintText}</HintText>
                                        <Field name={`questions[${number}]`}>
                                          {() => (
                                            <Input
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
                                      <QuestionOptionsWrapper key={i}>
                                        <QText>{question.text}</QText>
                                        <HintText>{question.hintText}</HintText>
                                        <Field
                                          name={`questions[${number}]`}
                                          type="number"
                                        >
                                          {() => (
                                            <InputNumber
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
                                          {() => {
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
                                          {() => (
                                            <Input.TextArea
                                              rows={4}
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
                                      <QuestionOptionsWrapper key={i}>
                                        <QText>{question.text}</QText>
                                        <HintText>{question.hintText}</HintText>
                                        <FieldArray
                                          name={`questions[${number}]`}
                                          render={() => (
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
                                      <QuestionOptionsWrapper key={i}>
                                        <QText>{question.text}</QText>
                                        <HintText>{question.hintText}</HintText>
                                        <p>Image</p>
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
        </section>
      </ReviewWrapper>
    );
  }
}
