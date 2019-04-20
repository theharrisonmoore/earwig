import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { Checkbox } from "antd";

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
} from "./Review.style";

import { StyledErrorMessage } from "./Question/Question.style";

import Question from "./Question/index";
import agencyIcon from "./../../../assets/agency-icon.svg";
import clockLong from "./../../../assets/clock-long-icon.svg";

import { initQueestionsValues } from "./initialQuestionsValues";
import { validationSchema } from "./validationSchema";

import { THANKYOU_URL } from "../../../constants/naviagationUrls";

const {
  API_GET_QUESTIONS_URL,
  API_POST_REVIEW_URL
} = require("../../../apiUrls");

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

class Review extends Component {
  state = {
    groups: [],
    organization: { category: "agency", name: "Bournemouth University" },
    user: { email: "level3@earwig.com" },
    worksiteImage: "",
    agencies: [],
    payrolls: []
  };
  componentDidMount() {
    axios
      .get(API_GET_QUESTIONS_URL, {
        params: {
          organization: this.state.organization.category
        }
      })
      .then(res => {
        this.setState({ groups: res.data });
      })
      .catch(err => {
        // server error 500
        console.log("err", err);
      });
    this.getAgenciesAndPayrolls();
  }

  getAgenciesAndPayrolls = () => {
    axios
      .get("/api/agency-payroll")
      .then(res => {
        this.setState({
          agencies: res.data[1].category,
          payrolls: res.data[0].category
        });
      })
      .catch(err => {
        console.log("err", err);
      });
  };

  handleSubmit = (values, { setSubmitting }) => {
    console.log("tyoeof", typeof values.questions[18]);
    const { organization } = this.state;
    const { user } = this.state;
    const review = {
      values,
      organization,
      user
    };
    axios
      .post(API_POST_REVIEW_URL, review)
      .then(res => {
        this.props.history.push(THANKYOU_URL, {
          orgType: organization.category
        });
      })
      .catch(err => {
        console.log(err);
        // server error 500, maybe redirect to 500.error page??!!
        setSubmitting(false);
      });
  };

  render() {
    const initialValues = {
      questions: initQueestionsValues[this.state.organization.category],
      comments: initQueestionsValues[this.state.organization.category],
      checklist: [],
      review: {
        workPeriod: "",
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
      agencies,
      payrolls,
      organization: { name, category }
    } = this.state;

    let dropdownOptions;
    if (category === "agency") {
      dropdownOptions = agencies;
    } else if (category === "payroll") {
      dropdownOptions = payrolls;
    }
    return (
      <ReviewWrapper>
        <Header orgType={category}>
          <Content>
            <ImageBox className="image-box">
              <Image src={agencyIcon} alt="" className="header-icon" />
            </ImageBox>
            <Organization>
              <Paragraph>You're reviewing:</Paragraph>
              <OrgName>{name}</OrgName>
              <ReviewTime>
                18 questions <img src={clockLong} alt="" /> 2 mins
              </ReviewTime>
            </Organization>
          </Content>
        </Header>

        <section>
          <Formik
            initialValues={initialValues}
            onSubmit={this.handleSubmit}
            validationSchema={
              validationSchema[this.state.organization.category]
            }
          >
            {({
              values,
              isSubmitting,
              handleChange,
              errors,
              setFieldValue
            }) => {
              console.log("values", values);
              return (
                <FormWrapper>
                  <Form>
                    <div>
                      {/* a placeholder to be edited with new picker */}
                      <p>Select the month(s) you used this agency?</p>
                    </div>
                    <div>
                      {groups.map(group => {
                        return (
                          <div key={group._id}>
                            <h2>{group.group.text}</h2>
                            {group.questions.map(question => {
                              return (
                                <Question
                                  key={question._id}
                                  values={values}
                                  handleChagne={handleChange}
                                  question={question}
                                  errors={errors}
                                  setFieldValue={setFieldValue}
                                  agencies={agencies}
                                  payrolls={payrolls}
                                  dropdownOptions={dropdownOptions}
                                />
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                    <div className="questions">
                      <Question
                        {...values}
                        handleChagne={handleChange}
                        question={STATIC_QUESTIONS[0]}
                        setFieldValue={setFieldValue}
                        category={this.state.organization.category}
                      />
                      <Question
                        {...values}
                        handleChagne={handleChange}
                        question={STATIC_QUESTIONS[1]}
                        category={this.state.organization.category}
                      />
                      <Question
                        {...values}
                        handleChagne={handleChange}
                        question={STATIC_QUESTIONS[2]}
                        category={this.state.organization.category}
                      />
                    </div>

                    <UserAgreement>
                      <Level2Header>Submit your review</Level2Header>
                      <CheckboxWrapper>
                        <Field name={`hasAgreed`} id="agreement">
                          {({ field, form }) => (
                            <Checkbox
                              {...field}
                              // {...form}
                              id="agreement"
                              style={{ marginTop: "4px" }}
                            />
                          )}
                        </Field>

                        <AgreementLabel htmlFor="agreement">
                          I agree to the earwig Terms of Use. This review of my
                          experience with this current or former agency is
                          truthful.
                        </AgreementLabel>
                        <ErrorMessage name={`hasAgreed`}>
                          {msg => (
                            <StyledErrorMessage>{msg}</StyledErrorMessage>
                          )}
                        </ErrorMessage>
                      </CheckboxWrapper>
                    </UserAgreement>
                    <SubmitButton
                      type="submit"
                      disabled={isSubmitting}
                      orgType={category}
                    >
                      Submit your review
                    </SubmitButton>
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

export default Review;
