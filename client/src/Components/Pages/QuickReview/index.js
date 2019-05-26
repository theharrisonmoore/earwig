import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { Checkbox, message, Spin, Icon } from "antd";
import Swal from "sweetalert2";
import Loading from "./../../Common/AntdComponents/Loading";

import {
  ReviewWrapper,
  SubmitButton,
  UserAgreement,
  CheckboxWrapper,
  Header,
  Content,
  ImageBox,
  Organization,
  OrgName,
  ReviewTime,
  Paragraph,
  FormWrapper,
  Level2Header,
  AgreementLabel,
  HeaderPhone,
  ContentPhone,
  ImageBoxPhone,
  OrganizationPhone,
  ReviewTimePhone
} from "../Review/Review.style";

import { StyledErrorMessage } from "../Review/Question/Question.style";

import Question from "../Review/Question/index";
import clockShort from "./../../../assets/clock-short-icon.png";

import { validationSchemaShort } from "../Review/validationSchema";

import { THANKYOU_URL } from "../../../constants/naviagationUrls";

import { NewSVGCreator, questionsNumber, isMobile } from "../../../helpers";

import { STATIC_QUESTIONS } from "../Review/staticQuestions";

// antd spinner for the submit button
const antIcon = (
  <Icon type="loading" style={{ fontSize: 24, color: "white" }} spin />
);

const { API_QUICK_REVIEW_URL } = require("../../../apiUrls");

class Review extends Component {
  state = {
    isLoading: true,
    organization: { category: "", name: "", needsVerification: false },
    user: { email: "" }
  };

  componentDidMount() {
    const { email } = this.props;
    const { category, name, needsVerification } = this.props.location.state;
    const { organization, user } = this.state;
    organization.category = category;
    organization.name = name;
    organization.needsVerification = needsVerification || false;
    user.email = email;
    this.setState({
      isLoading: false
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
      .post(API_QUICK_REVIEW_URL, review)
      .then(res => {
        this.props.history.push(THANKYOU_URL, {
          orgType: organization.category,
          orgId: res.data,
          orgName: organization.name
        });
      })
      .catch(err => {
        const error =
          err.response && err.response.data && err.response.data.error;
        message.error(error || "Something went wrong");
        // server error 500, maybe redirect to 500.error page??!!
        setSubmitting(false);
      });
  };

  render() {
    const { isLoading } = this.state;
    if (isLoading) return <Loading />;

    const initialValues = {
      review: {
        workPeriod: {
          from: "",
          to: ""
        },
        rate: 0,
        overallReview: ""
        // voiceReview: ""
      },
      hasAgreed: false
    };

    const {
      organization: { name, category }
    } = this.state;

    return (
      <ReviewWrapper>
        <Header orgType={category} style={{ marginBottom: "3rem" }}>
          <Content>
            <ImageBox>
              {!isMobile(window.innerWidth) &&
                NewSVGCreator(category, "4rem", "4rem", "white")}
            </ImageBox>
            <Organization>
              <div>
                <Paragraph style={{ paddingRight: ".5rem" }}>
                  You're reviewing:{" "}
                </Paragraph>
                <OrgName>{name}</OrgName>
              </div>
              <ReviewTime>
                {questionsNumber[category].full.count}{" "}
                <img src={clockShort} alt="" />{" "}
                {questionsNumber[category].full.time}
              </ReviewTime>
            </Organization>
          </Content>
        </Header>

        <HeaderPhone orgType={category} style={{ marginBottom: "3rem" }}>
          <ContentPhone>
            <OrganizationPhone>
              <ImageBoxPhone>
                {isMobile(window.innerWidth) &&
                  NewSVGCreator(category, "3rem", "3rem", "white")}
              </ImageBoxPhone>
              <div>
                <Paragraph>You're reviewing:</Paragraph>
                <OrgName>{name}</OrgName>
              </div>
            </OrganizationPhone>
            <ReviewTimePhone>
              {questionsNumber[category].full.count}{" "}
              <img src={clockShort} alt="" />{" "}
              {questionsNumber[category].full.time}
            </ReviewTimePhone>
          </ContentPhone>
        </HeaderPhone>

        <section className="review-body">
          <Formik
            initialValues={initialValues}
            onSubmit={this.handleSubmit}
            validationSchema={validationSchemaShort[category]}
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
                    <Question
                      {...values}
                      question={STATIC_QUESTIONS[0]}
                      setFieldValue={setFieldValue}
                      category={category}
                      // handleChagne={handleChange}
                    />
                    <div className="questions">
                      <Question
                        {...values}
                        handleChagne={handleChange}
                        question={STATIC_QUESTIONS[1]}
                        setFieldValue={setFieldValue}
                        category={category}
                      />
                      <Question
                        {...values}
                        handleChagne={handleChange}
                        question={STATIC_QUESTIONS[2]}
                        category={category}
                      />
                      {/* voice review will be added later */}
                      {/* <Question
                        {...values}
                        handleChagne={handleChange}
                        question={STATIC_QUESTIONS[3]}
                        category={category}
                      /> */}
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
                      size="large"
                      disabled={isSubmitting}
                      orgType={category}
                    >
                      {isSubmitting && (
                        <Spin
                          indicator={antIcon}
                          style={{ marginRight: ".5rem" }}
                        />
                      )}
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
