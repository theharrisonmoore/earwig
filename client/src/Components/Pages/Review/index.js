import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

// import MonthRangePicker from "react-monthrange-picker";
import moment from "moment";
import axios from "axios";
import Yup from "yup";
import classNames from "classnames";

import { ReviewRapper } from "./Review.style";
import Question from "./Question/index";
import agencyIcon from "./../../../assets/agencyIcon.svg";

const initialValues = {
  questions: {
    1: "",
    15: ""
  }
};

class Review extends Component {
  state = {
    questions: []
  };
  componentDidMount() {
    axios
      .get("/api/questions")
      .then(res => {
        this.setState({ questions: res.data });
      })
      .catch(err => {
        console.log("err", err);
      });
  }
  render() {
    if (!this.state.questions[0]) {
      return null;
    }
    const { questions } = this.state;
    return (
      <ReviewRapper>
        <section className="review-header">
          <div className="content">
            <p>You're reviewing</p>
            <div className="org">
              <img src={agencyIcon} alt="" />
              Total Recruitment
            </div>
            <p className="review-info">18 questions 2min</p>
          </div>
        </section>

        <section className="questions">
          <Formik
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
          >
            {({ values, isSubmitting }) => {
              console.log("valuesssss", values);
              return (
                <Form>
                  <div className="question-container">
                    <p>Select the month(s) you used this agency?</p>
                    {/* <MonthRangePicker /> */}
                  </div>
                  <div className="general-group">
                    <Question question={questions[0]} />
                    <Question question={questions[1]} />
                    <Question question={questions[2]} />
                    <Question question={questions[3]} />
                    <Question question={questions[4]} />
                    <Question question={questions[5]} />
                    <Question question={questions[6]} />
                    <Question question={questions[7]} />
                  </div>
                  <div className="wages-group">
                    <Question question={questions[8]} />
                    <Question question={questions[9]} />
                    <Question question={questions[10]} />
                    <Question question={questions[11]} />
                    <Question question={questions[12]} />
                    <Question question={questions[13]} />
                    <Question question={questions[14]} />
                    <Question question={questions[15]} />
                    <Question question={questions[16]} />
                    <Question question={questions[17]} />
                  </div>
                  <div className="overall">
                    <Question question={questions[18]} />
                  </div>

                  <button type="submit" disabled={isSubmitting}>
                    Submit your review
                  </button>
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
