import React, { Component } from "react";
import { Rate } from "antd";

import { organizations } from "./../../../theme";

import {
  Wrapper,
  SectionTitle,
  QuestionWrapper,
  QuestionTitle,
  CategoryTitle
} from "./ReviewSection.style";

import YesNoAnswer from "./ProfileAnswers/YesNoAnswer.js";
import ListAnswer from "./ProfileAnswers/ListAnswer.js";
import PieAnswer from "./ProfileAnswers/PieAnswer.js";
import ScatterAnswer from "./ProfileAnswers/ScatterAnswer";
import SiteItemAnswer from "./ProfileAnswers/SiteItemAnswer";
import CanteenItemAnswer from "./ProfileAnswers/CanteenItemAnswer";
import BarChartAnswer from "./ProfileAnswers/BarChartAnswer";
import PayrollAnswer from "./ProfileAnswers/PayrollAnswer";
import ImageSlider from "./ProfileAnswers/ImageSlider";

export default class ReviewSection extends Component {
  onlyNeutralAnswers = answers => {
    const yesOrNo = answers.filter(
      answer => answer.answer === "Yes" || answer.answer === "No"
    );

    return yesOrNo.length === 0;
  };

  render() {
    const {
      sectionDetails,
      category,
      toggleComments,
      summary,
      isMobile,
      carParkingPrice
    } = this.props;

    const { _id: sectionTitle, questions } = sectionDetails;

    let canteenQuestions =
      questions &&
      questions.filter(
        question => question.question.profileType === "canteenItem"
      );

    if (!canteenQuestions || canteenQuestions.length < 1)
      canteenQuestions = false;

    // if (canteenQuestions && canteenQuestions.length === 1) {
    //   const onlyNeutral = this.onlyNeutralAnswers(canteenQuestions[0].answers);
    //   canteenQuestions = !onlyNeutral;
    // }

    let payrollQuestions =
      questions &&
      questions.filter(question =>
        ["payrollList", "payrollSubList"].includes(
          question.question.profileType
        )
      );

    if (!payrollQuestions || payrollQuestions.length < 1)
      payrollQuestions = false;

    return (
      // Question - Title, AggregatedAnswer, Comment Box
      <Wrapper>
        <SectionTitle>{sectionTitle}</SectionTitle>
        {sectionTitle === "Key ratings" && (
          <QuestionWrapper>
            <QuestionTitle>
              <CategoryTitle>{category}</CategoryTitle> overall rating
            </QuestionTitle>
            <>
              <Rate
                disabled
                tooltips={["Bad", "Poor", "Average", "Great", "Excellent"]}
                value={summary.avgRatings || summary.value}
                style={{
                  color: `${organizations[summary.category].primary}`,
                  fontSize: `${isMobile ? "2rem" : "3rem"}`
                }}
              />
              <div style={{ dispay: "inline-block" }}>
                {["Bad", "Poor", "Average", "Great", "Excellent"].map(
                  (option, index) => (
                    <span
                      style={{
                        color: `${
                          index === Math.floor(summary.avgRatings) - 1
                            ? organizations[summary.category].primary
                            : "#e8e8e8"
                        }`,
                        fontWeight: `${
                          index === Math.floor(summary.avgRatings) - 1
                            ? "900"
                            : "500"
                        }`,
                        fontSize: `${isMobile ? "0.6rem" : "0.7rem"}`,
                        width: `${isMobile ? "32px" : "48px"}`,
                        display: "inline-block",
                        textAlign: "center",
                        marginRight: "8px"
                      }}
                    >
                      {option}
                    </span>
                  )
                )}
              </div>
            </>
          </QuestionWrapper>
        )}

        {questions &&
          questions.map(
            (question, index) =>
              ["yesno", "pieChart", "dotChart"].includes(
                question.question.profileType
              ) && (
                <QuestionWrapper key={index}>
                  <QuestionTitle>{question.question.profileText}</QuestionTitle>
                  {question.question.profileType === "yesno" && (
                    <YesNoAnswer
                      question={question}
                      toggleComments={toggleComments}
                      isMobile={isMobile}
                      hide={this.onlyNeutralAnswers(question.answers)}
                    />
                  )}
                  {question.question.profileType === "pieChart" && (
                    <PieAnswer
                      category={category}
                      question={question}
                      toggleComments={toggleComments}
                      isMobile={isMobile}
                    />
                  )}
                  {question.question.profileType === "dotChart" && (
                    <ScatterAnswer
                      category={category}
                      question={question}
                      toggleComments={toggleComments}
                      isMobile={isMobile}
                    />
                  )}
                </QuestionWrapper>
              )
          )}

        {questions &&
          questions
            .filter(question => {
              return question.question.profileType === "siteItem";
            })
            .map((question, index) => (
              <QuestionWrapper
                key={index}
                hide={this.onlyNeutralAnswers(question.answers)}
              >
                <SiteItemAnswer
                  category={category}
                  question={question}
                  toggleComments={toggleComments}
                  profileType={question.question.profileType}
                  isMobile={isMobile}
                  carParkingPrice={carParkingPrice}
                />
              </QuestionWrapper>
            ))}
        {/* CANTEEN SECTION */}
        {canteenQuestions && (
          <QuestionWrapper>
            {/* {console.log(canteenQuestions)} */}
            <CanteenItemAnswer
              questions={canteenQuestions}
              toggleComments={toggleComments}
              isMobile={isMobile}
            />
          </QuestionWrapper>
        )}
        {/* PAYROLL LIST */}
        {payrollQuestions && (
          <QuestionWrapper>
            <QuestionTitle>Pays using the following payrolls</QuestionTitle>
            <PayrollAnswer
              questions={payrollQuestions}
              toggleComments={toggleComments}
              isMobile={isMobile}
            />
          </QuestionWrapper>
        )}
        {questions &&
          questions
            .filter(question =>
              ["list"].includes(question.question.profileType)
            )
            .map((question, index) => (
              <QuestionWrapper key={index}>
                <QuestionTitle>{question.question.profileText}</QuestionTitle>
                <ListAnswer
                  question={question}
                  toggleComments={toggleComments}
                  isMobile={isMobile}
                />
              </QuestionWrapper>
            ))}
        {questions &&
          questions
            .filter(question => question.question.profileType === "barChart")
            .map((question, index) => (
              <QuestionWrapper key={index}>
                <QuestionTitle>{question.question.profileText}</QuestionTitle>
                <BarChartAnswer category={category} question={question} />
              </QuestionWrapper>
            ))}
        {/* site images */}
        {questions &&
          questions
            .filter(question => question.question.type === "image")
            .map((question, index) => {
              return (
                <QuestionWrapper key={question._id}>
                  <QuestionTitle>{question.question.profileText}</QuestionTitle>
                  <ImageSlider
                    category={category}
                    question={question}
                    organization={summary}
                  />
                </QuestionWrapper>
              );
            })}
      </Wrapper>
    );
  }
}
