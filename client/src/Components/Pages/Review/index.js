import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { Checkbox } from "antd";
import Swal from "sweetalert2";

import DatePicker from "../../Common/AntdComponents/DatePicker";

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
    isLoading: true,
    groups: [],
    groupss: {},
    organization: { category: "", name: "", needsVerification: false },
    user: { email: "" },
    worksiteImage: "",
    agencies: [],
    payrolls: [],
    startValue: null,
    endValue: null,
    endOpen: false
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
        const groupss = {};
        res.data.forEach(group => {
          groupss[group._id] = {
            title: group.group.text,
            main: group.questions.filter(question => !question.isDependent),
            dependant: group.questions.filter(question => question.isDependent)
          };
        });
        this.setState({
          groupss,
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

  showNextQestion = (groupId, next, other, set, num) => {
    const newGroups = { ...this.state.groupss };
    const group = { ...newGroups[groupId] };
    let newMain = [...group.main];
    let newDependant = [...group.dependant];
    while (typeof other !== "object" && other !== null) {
      const nextQ = newMain.find(question => question.number === other);
      if (nextQ) {
        newDependant.push(nextQ);
        newMain = newMain.filter(question => question.number !== other);
        other = nextQ.next;
      } else {
        other = null;
      }
      newDependant.map(question => {
        set(`questions[${question.number}]`, "");
      });
    }
    while (typeof next !== "object" && next !== null) {
      const nextQ = newDependant.find(question => question.number === next);
      if (nextQ) {
        newMain.push(nextQ);
        newDependant = newDependant.filter(
          question => question.number !== next
        );
        next = nextQ.next;
      } else {
        next = null;
      }
      newDependant.map(question => {
        set(`questions[${question.number}]`, "");
      });
    }
    group.main = newMain.sort((a, b) => a.number - b.number);
    group.dependant = newDependant;
    newGroups[groupId] = group;
    this.setState({ groupss: newGroups });
  };

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

  disabledStartDate = startValue => {
    const endValue = this.state.endValue;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  disabledEndDate = endValue => {
    const startValue = this.state.startValue;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  onChange = (field, value) => {
    this.setState({
      [field]: value
    });
  };

  onStartChange = value => {
    this.onChange("startValue", value);
  };

  onEndChange = value => {
    this.onChange("endValue", value);
  };

  handleStartOpenChange = open => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  };

  handleEndOpenChange = open => {
    this.setState({ endOpen: open });
  };

  render() {
    console.log("state", this.state);
    const { isLoading } = this.state;
    if (isLoading) return <p>loading...</p>;

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
      groupss,
      agencies,
      payrolls,
      organization: { name, category },
      startValue,
      endValue,
      endOpen
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
                      <Field
                        name={`review.workPeriod`}
                        onChange={() => {
                          console.log("hi");
                          const workPeriod = {};
                          workPeriod.from = this.state.startValue.format(
                            "YYYY-MM-DD"
                          );
                          workPeriod.to = this.state.endValue.format(
                            "YYYY-MM-DD"
                          );
                          setFieldValue(`review.workPeriod`, workPeriod);
                        }}
                      >
                        {({ field, form }) => {
                          return (
                            <DatePicker
                              handleStartOpenChange={this.handleStartOpenChange}
                              disabledStartDate={this.disabledStartDate}
                              onStartChange={this.onStartChange}
                              disabledEndDate={this.disabledEndDate}
                              onEndChange={this.onEndChange}
                              handleEndOpenChange={this.handleEndOpenChange}
                              setFieldValue={setFieldValue}
                              startValue={startValue}
                              endValue={endValue}
                              endOpen={endOpen}
                            />
                          );
                        }}
                      </Field>
                    </div>
                    <div>
                      {Object.keys(groupss).map(groupId => {
                        const group = groupss[groupId];
                        if (group && group.title) {
                          return (
                            <div key={groupId}>
                              <h2>{group.title}</h2>
                              {group.main.map(question => {
                                return (
                                  <Question
                                    key={question._id}
                                    showNextQestion={this.showNextQestion}
                                    groupId={groupId}
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
