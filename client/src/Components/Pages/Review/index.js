import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";

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
import agencyIcon from "./../../../assets/agencyIcon.svg";
import clockLong from "./../../../assets/clockLong.svg";

import { initQueestionsValues } from "./initialQuestionsValues";
import { validationSchema } from "./validationSchema";

const STATIC_QUESTIONS = [
  {
    number: 18,
    text: "How would you rate this agency?",
    type: "rate",
    options: ["bad", "ok", "good", "cool", "very cool"]
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
    organization: { category: "worksite", name: "Bournemouth University" },
    user: { email: "level3@earwig.com" }
  };
  componentDidMount() {
    axios
      .get("/api/questions/", {
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
  }

  handleSubmit = (values, { setSubmitting }) => {
    const { organization } = this.state;
    const { user } = this.state;
    const review = {
      values,
      organization,
      user
    };
    axios
      .post(`/api/review/${organization.category}`, review)
      .then(res => {
        this.props.history.push(`/thank-you`, {
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
      checklist: [],
      review: {
        workPeriod: "",
        rate: "",
        overallReview: "",
        voiceReview: ""
      },
      hasAgreed: false
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
            {({ values, isSubmitting, handleChange, errors }) => {
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
                      />
                      <Question
                        {...values}
                        handleChagne={handleChange}
                        question={STATIC_QUESTIONS[1]}
                      />
                      <Question
                        {...values}
                        handleChagne={handleChange}
                        question={STATIC_QUESTIONS[2]}
                      />
                    </div>

                    <UserAgreement>
                      <Level2Header>Submit your review</Level2Header>
                      <CheckboxWrapper>
                        <Field
                          type="checkbox"
                          name={`hasAgreed`}
                          className="agreement-checkbox"
                          id="agreement"
                        />
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
