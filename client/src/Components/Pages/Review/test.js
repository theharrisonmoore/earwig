import React, { Component } from "react";
import axios from "axios";
import { Checkbox, message, Spin, Icon } from "antd";
import Loading from "./../../Common/AntdComponents/Loading";

import {
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
  LinkSpan,
  ReviewWrapper
} from "./Review.style";

import { StyledErrorMessage } from "./Question/Question.style";

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

const { API_POST_REVIEW_URL } = require("../../../apiUrls");

class Test extends Component {
  state = {
    isLoading: true,
    groups: [],
    groupss: {},
    organization: { category: "agency", name: "", needsVerification: false },
    user: { email: "" },
    dropdownList: [],
    comments: {},
    answers: {},
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
    questions: [],
    errors: {},
    isSubmitting: false
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

    this.setState({
      organization: {
        category,
        name,
        needsVerification: needsVerification || false
      },
      user: { email }
    });

    axios
      .get(`/api/questions/${orgId}`, {
        params: {
          organization: category
        }
      })
      .then(res => {
        // make a conditon to check if editing or not(query param?!!)
        const answers = {};
        const edit = false;
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

  handleCheckBox = () => {
    const { hasAgreed } = this.state;
    this.setState(
      {
        hasAgreed: !hasAgreed
      },
      () => {
        this.runValidation2();
      }
    );
  };

  handleReviewChange = e => {
    const { review } = this.state;
    const { value } = e.target;
    this.setState({
      review: { ...review, overallReview: value }
    });
  };

  handleSliderChange = (value, number) => {
    const { answers } = this.state;
    this.setState({
      answers: { ...answers, [number]: value }
    });
  };

  handleImageUpload = (value, number) => {
    const { answers } = this.state;
    this.setState({
      answers: { ...answers, [number]: value }
    });
  };

  handleRateChage = value => {
    const { review } = this.state;
    this.setState(
      {
        review: { ...review, rate: value }
      },
      () => {
        this.runValidation2();
      }
    );
  };

  handleDateChage = (fromOrTo, value) => {
    const { review } = this.state;
    const { workPeriod } = review;
    this.setState(
      {
        review: { ...review, workPeriod: { ...workPeriod, [fromOrTo]: value } }
      },
      () => {
        this.runValidation2();
      }
    );
  };

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

  runValidation2 = () => {
    const { organization } = this.state;
    const values = {
      answers: this.state.answers,
      comments: this.state.comments,
      review: this.state.review,
      hasAgreed: this.state.hasAgreed
    };
    validationSchema[organization.category]
      .validate(values, { abortEarly: false })
      .catch(errors => {
        const errs = {
          answers: {},
          review: {
            workPeriod: {
              from: "",
              to: ""
            },
            rate: "",
            overallReview: ""
            // voiceReview: ""
          },
          hasAgreed: false
        };
        errors.inner.map(err => {
          if (err.path.includes("answers")) {
            const num = err.path.split(".")[1];
            errs.answers[num] = err.message;
          } else if (err.path.includes("workPeriod")) {
            const key = err.path.split(".")[2];
            errs.review.workPeriod[key] = err.message;
          } else if (err.path.includes("rate")) {
            errs.review.rate = err.message;
          } else {
            errs.hasAgreed = err.message;
          }
        });
        this.setState({ errors: errs });
      });
  };

  runValidation = () =>
    new Promise((resolve, reject) => {
      const { organization } = this.state;
      const { user } = this.state;
      const values = {
        answers: this.state.answers,
        comments: this.state.comments,
        review: this.state.review,
        hasAgreed: this.state.hasAgreed
      };
      validationSchema[organization.category]
        .validate(values, { abortEarly: false })
        .then(values => {
          resolve(values);
        })
        .catch(errors => {
          const errs = {
            answers: {},
            review: {
              workPeriod: {
                from: "",
                to: ""
              },
              rate: "",
              overallReview: ""
              // voiceReview: ""
            },
            hasAgreed: false
          };
          errors.inner.map(err => {
            if (err.path.includes("answers")) {
              const num = err.path.split(".")[1];
              errs.answers[num] = err.message;
            } else if (err.path.includes("workPeriod")) {
              const key = err.path.split(".")[2];
              errs.review.workPeriod[key] = err.message;
            } else if (err.path.includes("rate")) {
              errs.review.rate = err.message;
            } else {
              errs.hasAgreed = err.message;
            }
          });
          reject(errs);
        });
    });

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ isSubmitting: true });
    const { organization } = this.state;
    const { user } = this.state;
    const values = {
      answers: this.state.answers,
      comments: this.state.comments,
      review: this.state.review,
      hasAgreed: this.state.hasAgreed
    };

    this.runValidation(organization.category, values)
      .then(vals => {
        const review = {
          vals,
          organization,
          user
        };
        axios
          .post(API_POST_REVIEW_URL, review)
          .then(res => {
            this.setState({ isSubmitting: false });
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
            this.setState({ isSubmitting: false });
          });
      })
      .catch(err => {
        this.setState({ errors: err });
      });
  };

  render() {
    const {
      groupss,
      organization: { name, category },
      errors,
      isSubmitting
    } = this.state;
    const { history } = this.props;
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
          <form onSubmit={this.handleSubmit}>
            <FormWrapper>
              <Question
                question={staticQuestion[0]}
                category={this.state.organization.category}
                handleChange={this.handleDateChage}
                state={this.state}
                onBlur={this.runValidation2}
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
                              handleSliderChange={this.handleSliderChange}
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
                  question={staticQuestion[2]}
                  category={this.state.organization.category}
                  handleChange={this.handleRateChage}
                  state={this.state}
                  runValidation={this.runValidation2}
                />
                <Question
                  question={staticQuestion[1]}
                  category={this.state.organization.category}
                  handleChange={this.handleReviewChange}
                  state={this.state}
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

                  {errors && errors.hasAgreed && (
                    <StyledErrorMessage>{errors.hasAgreed}</StyledErrorMessage>
                  )}
                </CheckboxWrapper>
              </UserAgreement>
              <SubmitButton
                type="submit"
                size="large"
                disabled={isSubmitting}
                orgType={category}
              >
                {isSubmitting && (
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
