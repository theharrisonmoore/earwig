import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { Checkbox } from "antd";
import Swal from "sweetalert2";

import {
  ReviewWrapper,
  SubmitButton,
  UserAgreement,
  CheckboxWrapper,
  Header,
  HeaderPhone,
  ContentPhone,
  ImageBoxPhone,
  OrganizationPhone,
  ReviewTimePhone,
  Content,
  ImageBox,
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
import clockLong from "./../../../assets/clock-long-icon.svg";

import { initQueestionsValues } from "./initialQuestionsValues";
import { validationSchema } from "./validationSchema";
import { STATIC_QUESTIONS } from "./staticQuestions";

import { THANKYOU_URL } from "../../../constants/naviagationUrls";
import { NewSVGCreator, questionsNumber, isMobile } from "../../../helpers";

const {
  API_GET_QUESTIONS_URL,
  API_POST_REVIEW_URL
} = require("../../../apiUrls");

class Review extends Component {
  state = {
    isLoading: true,
    groups: [],
    organization: { category: "", name: "", needsVerification: false },
    user: { email: "" },
    worksiteImage: "",
    agencies: [],
    payrolls: []
  };
  componentDidMount() {
    const { email } = this.props;
    const { category, name, needsVerification } = this.props.location.state;
    const { organization, user } = this.state;
    organization.category = category;
    organization.name = name;
    organization.needsVerification = needsVerification || false;
    user.email = email;
    axios
      .get(API_GET_QUESTIONS_URL, {
        params: {
          organization: category
        }
      })
      .then(res => {
        console.log(res.data);
        this.setState({
          groups: res.data,
          isLoading: false,
          organization,
          user,
          email
        });
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
        if (this.state.organization.needsVerification) {
          Swal.fire({
            type: "success",
            title: "Thanks! We're verifying your review as soon as possible."
          }).then(() => {
            this.props.history.push(THANKYOU_URL, {
              orgType: organization.category
            });
          });
        }
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
    const { isLoading } = this.state;
    if (isLoading) return <p>loading...</p>;

    const initialValues = {
      questions: initQueestionsValues[this.state.organization.category],
      comments: initQueestionsValues[this.state.organization.category],
      review: {
        workPeriod: {
          from: "",
          to: ""
        },
        rate: 3,
        overallReview: ""
        // voiceReview: ""
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
                <img src={clockLong} alt="" />{" "}
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
              <img src={clockLong} alt="" />{" "}
              {questionsNumber[category].full.time}
            </ReviewTimePhone>
          </ContentPhone>
        </HeaderPhone>

        <section className="review-body">
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
              // console.log(values);
              return (
                <FormWrapper>
                  <Form>
                    <Question
                      {...values}
                      question={STATIC_QUESTIONS[0]}
                      setFieldValue={setFieldValue}
                      category={this.state.organization.category}
                    />
                    <div>
                      {groups.map(group => {
                        if (group.group && group.group.text) {
                          return (
                            <div key={group._id}>
                              <Level2Header>{group.group.text}</Level2Header>
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
                        }
                        return null;
                      })}
                    </div>
                    <div className="questions">
                      <Question
                        {...values}
                        handleChagne={handleChange}
                        question={STATIC_QUESTIONS[1]}
                        setFieldValue={setFieldValue}
                        category={this.state.organization.category}
                      />
                      <Question
                        {...values}
                        handleChagne={handleChange}
                        question={STATIC_QUESTIONS[2]}
                        category={this.state.organization.category}
                      />
                      {/* The voice questions in the next sprint */}
                      {/* <Question
                        {...values}
                        handleChagne={handleChange}
                        question={STATIC_QUESTIONS[3]}
                        category={this.state.organization.category}
                      /> */}
                    </div>
                    <UserAgreement>
                      <Level2Header>Submit your review</Level2Header>
                      <CheckboxWrapper>
                        <Field name={`hasAgreed`} id="agreement">
                          {({ field, form }) => (
                            <Checkbox
                              {...field}
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
