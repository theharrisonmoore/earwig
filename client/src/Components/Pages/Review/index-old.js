import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { Checkbox, message, Spin, Icon } from "antd";
import Loading from "../../Common/AntdComponents/Loading";

import {
  ReviewWrapper,
  SubmitButton,
  UserAgreement,
  CheckboxWrapper,
  Header,
  Content,
  Organization,
  OrgName,
  Paragraph,
  FormWrapper,
  Level2Header,
  AgreementLabel,
  LinkSpan
} from "./Review.style";

import { StyledErrorMessage } from "./Question/Question.style";

import Question from "./Question/index";
import { organizations } from "../../../theme";

import { initQueestionsValues } from "./initialQuestionsValues";
import { validationSchema } from "./validationSchema";
import { STATIC_QUESTIONS } from "./staticQuestions";

import {
  THANKYOU_URL,
  TERMS_OF_USE_URL
} from "../../../constants/naviagationUrls";

// antd spinner for the submit button
const antIcon = (
  <Icon type="loading" style={{ fontSize: 24, color: "white" }} spin />
);

const {
  API_GET_QUESTIONS_URL,
  API_POST_REVIEW_URL
} = require("../../../apiUrls");

// For rate question to add the Org. category
let rateQ = {};

class Review extends Component {
  state = {
    isLoading: true,
    groups: [],
    groupss: {},
    organization: { category: "", name: "", needsVerification: false },
    user: { email: "" },
    worksiteImage: "",
    dropdownList: [],
    questions: {},
    comments: {},
    review: {
      workPeriod: {
        from: "",
        to: ""
      },
      rate: 0,
      overallReview: ""
      // voiceReview: ""
    },
    hasAgreed: false,
    answers: {}
  };

  handleChange = e => {
    this.setState({
      answers: { ...this.state.answers, [e.target.name]: e.target.value }
    });
  };

  componentDidMount() {
    const { email } = this.props;
    const { category, name, needsVerification } = this.props.location.state;
    const { organization, user } = this.state;

    // update the static questions to reflect the orgType
    rateQ = {
      number: 19,
      text: "How would you rate this",
      type: "rate",
      options: ["Bad", "Poor", "Average", "Great", "Excellent"]
    };
    const text = rateQ.text;
    const newText = `${text} ${category}?`;
    rateQ.text = newText;

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
        res.data.groups.forEach(group => {
          groupss[group._id] = {
            title: group.group.text,
            main: group.questions.filter(question => !question.isDependent),
            dependant: group.questions.filter(question => question.isDependent)
          };
        });
        this.setState({
          groups: res.data,
          groupss,
          isLoading: false,
          organization,
          user,
          email,
          dropdownOptions:
            res.data.dropDownListData && res.data.dropDownListData[0].category
        });
      })
      .catch(err => {
        // server error 500
        const error =
          err.response && err.response.data && err.response.data.error;
        message.error(error || "Something went wrong");
      });
  }

  // handleYesNo() => {

  // }

  showNextQestion = (groupId, next, other, set, num) => {
    const newGroups = { ...this.state.groupss };
    const group = { ...newGroups[groupId] };
    let newMain = [...group.main];
    let newDependant = [...group.dependant];

    // hide the quesions when the option change
    while (typeof other !== "object" && other !== null) {
      // eslint-disable-next-line no-loop-func
      const nextQ = newMain.find(question => question.number === other);
      if (nextQ) {
        newDependant.push(nextQ);
        // eslint-disable-next-line no-loop-func
        newMain = newMain.filter(question => question.number !== other);
        other = nextQ.next;
      } else {
        other = null;
      }

      // eslint-disable-next-line array-callback-return
      newDependant.map(question => {
        if (question.type === "number") {
          set(`questions[${question.number}]`, null);
        } else set(`questions[${question.number}]`, "");
      });
    }
    while (typeof next !== "object" && next !== null) {
      // eslint-disable-next-line no-loop-func
      const nextQ = newDependant.find(question => question.number === next);
      if (nextQ) {
        newMain.push(nextQ);
        newDependant = newDependant.filter(
          // eslint-disable-next-line no-loop-func
          question => question.number !== next
        );
        next = nextQ.next;
      } else {
        next = null;
      }
      // eslint-disable-next-line array-callback-return
      newDependant.map(question => {
        if (question.type === "number") {
          set(`questions[${question.number}]`, null);
        } else set(`questions[${question.number}]`, "");
      });
    }
    group.main = newMain.sort((a, b) => a.number - b.number);
    group.dependant = newDependant;
    newGroups[groupId] = group;
    this.setState({ groupss: newGroups });
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
    const {
      groupss,

      organization: { name, category }
    } = this.state;

    const { history } = this.props;

    const staticQuestion = STATIC_QUESTIONS(category);

    const { isLoading } = this.state;
    if (isLoading) return <Loading />;

    const initialValues = {
      questions: initQueestionsValues[this.state.organization.category],
      comments: initQueestionsValues[this.state.organization.category],
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

    if (!this.state && !this.state.groups[0]) {
      return null;
    }

    return (
      <ReviewWrapper>
        <Header orgType={category} style={{ marginBottom: "3rem" }}>
          <Content>
            <Paragraph
              style={{ paddingRight: ".5rem" }}
              cancel
              bold
              onClick={() => history.goBack()}
            >
              Cancel
            </Paragraph>
            <Organization>
              <div>
                <Paragraph style={{ paddingRight: ".5rem" }}>
                  You’re giving a review about
                </Paragraph>
              </div>
              <div>
                <Paragraph capitalized>{category}: &nbsp;</Paragraph>
                <OrgName> {name}</OrgName>
              </div>
            </Organization>
          </Content>
        </Header>

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
              return (
                <FormWrapper>
                  <Form>
                    <Question
                      {...values}
                      question={staticQuestion[0]}
                      setFieldValue={setFieldValue}
                      category={this.state.organization.category}
                    />
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
                                    dropdownOptions={this.state.dropdownOptions}
                                    onChangeHandlers={this.handleChange}
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
                        question={rateQ ? rateQ : ""}
                        setFieldValue={setFieldValue}
                        category={this.state.organization.category}
                      />
                      <Question
                        {...values}
                        handleChagne={handleChange}
                        question={staticQuestion[1]}
                        category={this.state.organization.category}
                      />
                      {/* The voice questions in the next sprint */}
                      {/* <Question
                        {...values}
                        handleChagne={handleChange}
                        question={staticQuestion[3]}
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
                          I agree to the earwig{" "}
                          <LinkSpan
                            target="_blank"
                            to={TERMS_OF_USE_URL}
                            color={organizations[category].primary}
                          >
                            Terms of Use.
                          </LinkSpan>{" "}
                          This review of my experience with this current or
                          former {category} is truthful.
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