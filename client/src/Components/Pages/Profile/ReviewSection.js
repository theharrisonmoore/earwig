import React, { Component } from "react";

import { StarRateCreator } from "./../../../helpers";

import {
  Wrapper,
  SectionTitle,
  QuestionWrapper,
  QuestionTitle,
  StarWrapper,
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
  render() {
    const {
      sectionDetails,
      category,
      toggleComments,
      summary,
      isMobile
    } = this.props;
    const { _id: sectionTitle, questions } = sectionDetails;

    let canteenQuestions =
      questions &&
      questions.filter(
        question => question.question.profileType === "canteenItem"
      );

    if (!canteenQuestions || canteenQuestions.length < 1)
      canteenQuestions = false;

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
            <StarWrapper>{StarRateCreator(summary)}</StarWrapper>
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
              <QuestionWrapper key={index}>
                <SiteItemAnswer
                  category={category}
                  question={question}
                  toggleComments={toggleComments}
                  profileType={question.question.profileType}
                  isMobile={isMobile}
                />
              </QuestionWrapper>
            ))}
        {/* CANTEEN SECTION */}
        {canteenQuestions && (
          <QuestionWrapper>
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
                  <ImageSlider category={category} question={question} />
                </QuestionWrapper>
              );
            })}
      </Wrapper>
    );
  }
}
