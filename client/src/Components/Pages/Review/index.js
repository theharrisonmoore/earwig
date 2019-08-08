import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import { Checkbox, message, Spin, Icon, Modal } from "antd";
import Loading from "../../Common/AntdComponents/Loading";

import {
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
  LinkSpan,
  ReviewWrapper
} from "./Review.style";

import { StyledErrorMessage } from "./Question/Question.style";

import Question from "./Question/index";
import { organizations } from "../../../theme";

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

const { API_POST_REVIEW_URL, API_UPLOAD_AUDIO } = require("../../../apiUrls");

class Review extends Component {
  state = {
    isLoading: true,
    groups: [],
    groupss: {},
    organization: { category: "agency", name: "", orgId: "" },
    reviewId: "",
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
      overallReview: "",
      voiceReview: ""
    },
    hasAgreed: false,
    questions: [],
    errors: {},
    isSubmitting: false,
    isEditing: false,
    orgId: "",
    recording: false,
    audioFile: null
  };

  componentDidMount() {
    const { orgId, reviewId } = this.props.match.params;
    if (!orgId && !reviewId) {
      this.props.history.push("/search");
    }
    const { email } = this.props;

    this.setState({
      organization: {
        orgId
      },
      user: { email },
      reviewId
    });

    if (reviewId) {
      axios
        .get(`/api/review/${reviewId}/is-edatable`)
        .then(res => {
          const { orgId } = res.data;
          axios
            .get(`/api/questions/${orgId}`)
            .then(res => {
              const answers = {};
              const { getReviewAnswers: reviewDetails } = res.data;
              const review = {
                workPeriod: {
                  from: moment(reviewDetails[0].workPeriod.from),
                  to: moment(reviewDetails[0].workPeriod.to)
                },
                rate: reviewDetails[0].rate,
                overallReview: reviewDetails[0].overallReview.text
                // voiceReview: ""
              };

              reviewDetails[0].answers.forEach(answer => {
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
              const groupss = {};
              res.data.groups.forEach(group => {
                groupss[group._id] = {
                  title: group.group.text,
                  main: group.questions.filter(
                    question => !question.isDependent
                  ),
                  dependant: group.questions.filter(
                    question => question.isDependent
                  )
                };
              });
              this.setState({
                isEditing: true,
                groups: res.data,
                groupss,
                isLoading: false,
                organization: res.data.organization,
                email,
                answers,
                review,
                dropdownOptions:
                  res.data.dropDownListData &&
                  res.data.dropDownListData[0].category
              });
            })
            .catch(err => {
              // server error 500
              const error =
                err.response && err.response.data && err.response.data.error;
              message.error(error || "Something went wrong");
              setTimeout(() => {
                this.props.history.push("/search");
              }, 2000);
            });
        })
        .catch(err => {
          if (err.response.status === 401) {
            message.error("You can't edit this review");
            // redirect back to the edit page
            this.props.history.push("/search");
          } else {
            const error =
              err.response && err.response.data && err.response.data.error;
            message.error(error || "Something went wrong");
          }
        });
    } else {
      axios
        .get(`/api/questions/${orgId}`)
        .then(res => {
          const groupss = {};
          res.data.groups.forEach(group => {
            groupss[group._id] = {
              title: group.group.text,
              main: group.questions.filter(question => !question.isDependent),
              dependant: group.questions.filter(
                question => question.isDependent
              )
            };
          });
          this.setState({
            groups: res.data,
            groupss,
            isLoading: false,
            organization: res.data.organization,
            email,
            // answers,
            dropdownOptions:
              res.data.dropDownListData && res.data.dropDownListData[0].category
          });
        })
        .catch(err => {
          const error =
            err.response && err.response.data && err.response.data.error;
          if (err.response && err.response.status === 409) {
            return Modal.error({
              title: "Error",
              content: error,
              onOk: () => this.props.history.goBack()
            });
          }
          // server error 500
          message.error(error || "Something went wrong");
        });
    }
  }

  submitAudio = () => {
    const { audioFile } = this.state;
    if (audioFile) {
      const form = new FormData();

      form.append("voiceRecording", audioFile);

      return axios({
        method: "post",
        url: API_UPLOAD_AUDIO,
        data: form,
        headers: {
          "content-type": `multipart/form-data; boundary=${form.boundary}`
        }
      })
        .then(({ data }) => {
          return data.audio;
        })
        .catch(err => console.log(err));
    }
  };

  handleChange = e => {
    const { answers } = this.state;
    const { name, value } = e.target;
    this.setState({
      answers: { ...answers, [name]: value }
    });
  };

  handleCheckBox = () => {
    const { hasAgreed } = this.state;
    this.setState({
      hasAgreed: !hasAgreed
    });
  };

  handleReviewChange = e => {
    const { value, name } = e.target;
    const { type } = e.target.dataset;
    this.setState({
      [type]: { ...this.state[type], [name]: value }
    });
  };

  handleSliderChange = (value, number) => {
    let answer = null;
    const { answers } = this.state;
    if (typeof value !== "number" && value.includes("===")) {
      const [name, _id] = value.split("===");
      answer = { name, _id };
    } else {
      answer = value;
    }
    this.setState({
      answers: { ...answers, [number]: answer }
    });
  };

  handleAddNewOrgChange = (value, number) => {
    const { answers } = this.state;
    const answer = JSON.parse(value);
    this.setState({ answers: { ...answers, [number]: answer } });
  };

  handleImageUpload = (value, number) => {
    const { answers } = this.state;
    this.setState({
      answers: { ...answers, [number]: value }
    });
  };

  handleRateChage = value => {
    const { review } = this.state;
    this.setState({
      review: { ...review, rate: value }
    });
  };

  handleDateChage = (fromOrTo, value) => {
    const { review } = this.state;
    const { workPeriod } = review;
    this.setState({
      review: { ...review, workPeriod: { ...workPeriod, [fromOrTo]: value } }
    });
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

  runValidation = () => {
    const { organization } = this.state;
    const values = {
      answers: this.state.answers,
      comments: this.state.comments,
      review: this.state.review,
      hasAgreed: this.state.hasAgreed
    };
    return validationSchema[organization.category]
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

        errors.inner.forEach(err => {
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
        this.setState({ errors: errs, hasError: true });
      });
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ isSubmitting: true });
    const { organization, audioFile } = this.state;
    const { user } = this.state;
    const values = {
      answers: this.state.answers,
      comments: this.state.comments,
      review: this.state.review,
      hasAgreed: this.state.hasAgreed
    };

    this.runValidation().then(async resp => {
      if (resp) {
        const review = {
          values,
          organization,
          user
        };
        if (this.state.isEditing) {
          // update the same review
          axios
            .put(`/api/review/${this.state.reviewId}`, review)
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
        } else {
          // add new review

          // if there's an audio file submit and update answers with its correct filename
          if (audioFile)
            review.values.review.voiceReview = await this.submitAudio();

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
        }
      } else {
        this.setState({ isSubmitting: false });
      }
    });
  };

  handleRecord = ({ recordedAudio, audioFile }) => {
    this.setState({
      recordedAudio,
      audioFile
    });
  };
  render() {
    const {
      groupss,
      organization: { name, category },
      errors,
      isSubmitting,
      recording
    } = this.state;
    const { history, isMobile, id } = this.props;
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
              style={{ paddingRight: "1.5rem" }}
              cancel
              bold
              onClick={() => history.goBack()}
            >
              Cancel
            </Paragraph>
            <Organization>
              <div>
                <Paragraph style={{ paddingRight: ".5rem" }}>
                  You’re giving a review about:
                </Paragraph>
              </div>
              <div>
                {!isMobile && (
                  <Paragraph capitalized>{category}: &nbsp;</Paragraph>
                )}
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
                              handleReviewChange={this.handleReviewChange}
                              handleAddNewOrgChange={this.handleAddNewOrgChange}
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
                  runValidation={this.runValidation}
                />
                <Question
                  question={staticQuestion[1]}
                  category={this.state.organization.category}
                  handleChange={this.handleReviewChange}
                  state={this.state}
                />
                {/* The voice questions in the next sprint */}
                <Question
                  question={staticQuestion[3]}
                  category={this.state.organization.category}
                  state={this.state}
                  recording={recording}
                  handleRecord={this.handleRecord}
                  id={id}
                />
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

export default Review;
