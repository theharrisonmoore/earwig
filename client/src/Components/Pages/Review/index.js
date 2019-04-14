import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

// import MonthRangePicker from "react-monthrange-picker";
import moment from "moment";
import axios from "axios";
import Yup from "yup";
import classNames from "classnames";

import { ReviewRapper, SubmitButton } from "./Review.style";
import Question from "./Question/index";
import agencyIcon from "./../../../assets/agencyIcon.svg";
import clockLong from "./../../../assets/clockLong.svg";

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

const initialValues = {
  questions: {},
  checklist: [],
  review: {
    workPeriod: "",
    rate: "",
    overallReview: "",
    voiceReview: ""
  },
  hasAgreed: false
};

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
      .post("/api/review", review)
      .then(res => {
        // setSubmitting(false);
        this.props.history.push(`/search`);
      })
      .catch(err => {
        console.log(err);
        this.setState({ error: err.response.data.error });
        setSubmitting(false);
      });
  };

  render() {
    if (!this.state && !this.state.groups[0]) {
      return null;
    }
    const {
      groups,
      organization: { name }
    } = this.state;
    return (
      <ReviewRapper>
        <section className="review-header">
          <div className="content">
            <div className="image-box">
              <img src={agencyIcon} alt="" class="header-icon" />
            </div>
            <div className="org">
              <p>You're reviewing:</p>
              <p class="org-name">{name}</p>
              <p className="review-info">
                18 questions <img src={clockLong} alt="" /> 2 mins
              </p>
            </div>
          </div>
        </section>

        <section className="questions">
          <Formik initialValues={initialValues} onSubmit={this.handleSubmit}>
            {({ values, isSubmitting, handleChange }) => {
              return (
                <Form>
                  <div className="question-container questions">
                    <p>Select the month(s) you used this agency?</p>
                  </div>
                  <div className="questions">
                    {groups.map(group => {
                      return (
                        <div className="group-section">
                          <h2>{group.group.text}</h2>
                          {group.questions.map(question => {
                            return (
                              <Question
                                values={values}
                                handleChagne={handleChange}
                                question={question}
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

                  <SubmitButton type="submit" disabled={isSubmitting}>
                    Submit your review
                  </SubmitButton>
                </Form>
              );
            }}
          </Formik>
        </section>
      </ReviewRapper>
    );
  }
}

export default Review;
