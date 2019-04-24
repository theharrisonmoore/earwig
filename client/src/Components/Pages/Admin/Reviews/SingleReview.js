import React, { Component } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Table, Modal, message } from "antd";
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

import Question from "../../Review/Question/index";
import agencyIcon from "../../../../assets/agency-icon.svg";
import clockLong from "./../../../../assets/clock-long-icon.svg";
import { initQueestionsValues } from "../../Review/initialQuestionsValues";

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

    console.log(groups);

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
              console.log(values);
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
                                console.log(entry);
                                // const {
                                //   type,
                                //   options,
                                //   number,
                                //   category,
                                //   label,
                                //   hasComment
                                // } = question;
                                return (
                                  <div>
                                    <div>
                                      <h3>Question:</h3>
                                      <h4>{question.text}</h4>
                                      <p>{question.hintText}</p>
                                    </div>
                                    <div>
                                      <h3>Answer: </h3>
                                      <h4>{entry.answer}</h4>
                                    </div>
                                    <div>
                                      <h3>Comments: </h3>
                                    </div>
                                  </div>
                                );
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
