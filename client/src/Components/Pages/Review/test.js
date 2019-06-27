import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { Checkbox, message, Spin, Icon } from "antd";
import Loading from "./../../Common/AntdComponents/Loading";

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
  AgreementLabel,
  LinkSpan
} from "./Review.style";

import {
  StyledErrorMessage,
  QuestionWrapper,
  QuestionOptionsWrapper,
  InputWrapper,
  QText,
  HintText,
  Options,
  CommentsIcon,
  StyledInput,
  StyledButton,
  StyledCheckList,
  SliderWrapper
} from "./Question/Question.style";

import Question from "./Question/index";
import clockLong from "./../../../assets/clock-long-icon.png";
import { organizations } from "./../../../theme";

import { initQueestionsValues } from "./initialQuestionsValues";
import { validationSchema } from "./validationSchema";
import { STATIC_QUESTIONS } from "./staticQuestions";

import {
  THANKYOU_URL,
  TERMS_OF_USE_URL
} from "../../../constants/naviagationUrls";
import { NewSVGCreator, questionsNumber, isMobile } from "../../../helpers";

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

class Test extends Component {
  state = {
    isLoading: true,
    groups: [],
    groupss: {},
    organization: { category: "agency", name: "", needsVerification: false },
    user: { email: "" },
    worksiteImage: "",
    dropdownList: [],
    answers: {},
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
    questions: []
  };

  componentDidMount() {
    const { email } = this.props;
    const {
      category,
      name,
      needsVerification,
      orgId
    } = this.props.location.state;
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
      .get(`/api/questions/${orgId}`, {
        params: {
          organization: category
        }
      })
      .then(res => {
        // make a conditon to check if editing or not(query param?!!)
        const answers = {};
        const edit = true;
        if (edit) {
          const { getReviewAnswers: reviewDetails } = res.data;
          reviewDetails[0].answers.map(answer => {
            const {
              answer: ans,
              question: [question]
            } = answer;
            const number = question.number;
            if (answers[number]) {
              // think about this again;
              console.log("this should never run");
              answers[number] = ans;
            } else {
              answers[number] = ans;
            }
          });
        }
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
          answers,
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

  handleChange = e => {
    const { answers } = this.state;
    const { name, value } = e.target;
    this.setState({
      answers: { ...answers, [name]: value }
    });
  };
  handleCheckBox = e => {
    const { hasAgreed } = this.state;
    this.setState({
      hasAgreed: !hasAgreed
    });
  };

  // handleInputChange = e => {
  //   this.setState({
  //     answers: { ...answers: []}
  //   });
  // };

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
          this.setState({
            answers: { ...this.state.answers, [question.number]: null }
          });
        } else {
          this.setState({
            answers: { ...this.state.answers, [question.number]: "" }
          });
        }
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
          this.setState({
            answers: { ...this.state.answers, [question.number]: null }
          });
        } else {
          this.setState({
            answers: { ...this.state.answers, [question.number]: "" }
          });
        }
      });
    }
    group.main = newMain.sort((a, b) => a.number - b.number);
    group.dependant = newDependant;
    newGroups[groupId] = group;
    this.setState({ groupss: newGroups });
  };

  render() {
    console.log("anss", this.state.answers);
    const {
      groupss,

      organization: { name, category }
    } = this.state;
    const staticQuestion = STATIC_QUESTIONS(category);

    const { isLoading } = this.state;
    if (isLoading) return <Loading />;

    if (!this.state && !this.state.groups[0]) {
      return null;
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
          <form>
            <FormWrapper>
              <Question
                question={staticQuestion[0]}
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
                              question={question}
                              showNextQestion={this.showNextQestion}
                              groupId={groupId}
                              dropdownOptions={this.state.dropdownOptions}
                              handleChange={this.handleChange}
                              state={this.state}
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
                  question={rateQ ? rateQ : ""}
                  category={this.state.organization.category}
                />
                <Question
                  question={staticQuestion[1]}
                  category={this.state.organization.category}
                />
                {/* The voice questions in the next sprint */}
                {/* <Question
                        question={staticQuestion[3]}
                        category={this.state.organization.category}
                      /> */}
              </div>
              <UserAgreement>
                <Level2Header>Submit your review</Level2Header>
                <CheckboxWrapper>
                  <Checkbox
                    onChange={this.handleCheckBox}
                    style={{ marginTop: "4px" }}
                    checked={this.state.hasAgreed}
                  >
                    <AgreementLabel
                      htmlFor="agreement"
                      style={{ pointerEvents: "none" }}
                    >
                      I agree to the earwig{" "}
                      <LinkSpan
                        target="_blank"
                        to={TERMS_OF_USE_URL}
                        color={organizations[category].primary}
                      >
                        Terms of Use.
                      </LinkSpan>{" "}
                      This review of my experience with this current or former{" "}
                      {category} is truthful.
                    </AgreementLabel>
                  </Checkbox>

                  <ErrorMessage name={`hasAgreed`}>
                    {msg => <StyledErrorMessage>{msg}</StyledErrorMessage>}
                  </ErrorMessage>
                </CheckboxWrapper>
              </UserAgreement>
              <SubmitButton
                type="submit"
                size="large"
                // disabled={isSubmitting}
                orgType={category}
              >
                {true && (
                  <Spin indicator={antIcon} style={{ marginRight: ".5rem" }} />
                )}
                Submit your review
              </SubmitButton>
            </FormWrapper>
          </form>
        </section>
      </ReviewWrapper>
    );
  }
}

export default Test;
