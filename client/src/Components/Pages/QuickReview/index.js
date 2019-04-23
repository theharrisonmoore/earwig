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
} from "../Review/Review.style";

import { StyledErrorMessage } from "../Review/Question/Question.style";

import Question from "../Review/Question/index";
import agencyIcon from "./../../../assets/agency-icon.svg";
import clockShort from "./../../../assets/clock-short-icon.svg";

import { validationSchemaShort } from "../Review/validationSchema";

import { THANKYOU_URL } from "../../../constants/naviagationUrls";

const { API_QUICK_REVIEW_URL } = require("../../../apiUrls");

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
    organization: { category: "agency", name: "Aspire Recruitment" },
    user: { email: "level3@earwig.com" }
  };

  handleSubmit = (values, { setSubmitting }) => {
    const { organization } = this.state;
    const { user } = this.state;
    const review = {
      values,
      organization,
      user
    };
    axios
      .post(API_QUICK_REVIEW_URL, review)
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
      review: {
        workPeriod: "",
        rate: 3,
        overallReview: "",
        voiceReview: ""
      },
      hasAgreed: false
    };

    if (!this.state && !this.state.groups[0]) {
      return null;
    }
    const {
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
                1 question <img src={clockShort} alt="" /> 30 sec
              </ReviewTime>
            </Organization>
          </Content>
        </Header>

        <section>
          <Formik
            initialValues={initialValues}
            onSubmit={this.handleSubmit}
            validationSchema={
              validationSchemaShort[this.state.organization.category]
            }
          >
            {({
              values,
              isSubmitting,
              handleChange,
              errors,
              setFieldValue
            }) => {
              return (
                <FormWrapper>
                  <Form>
                    <div>
                      {/* a placeholder to be edited with new picker */}
                      <p>Select the month(s) you used this agency?</p>
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
                            <Checkbox {...field} {...form} id="agreement" />
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
