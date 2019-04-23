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

export default class ReviewSection extends Component {
  render() {
    const { sectionDetails, category, toggleComments, summary } = this.props;
    const { _id: sectionTitle, questions } = sectionDetails;

    let canteenQuestions =
      questions &&
      questions.filter(
        question => question.question.profileType === "canteenItem"
      );

    if (!canteenQuestions || canteenQuestions.length < 1)
      canteenQuestions = false;

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
          questions
            .filter(question => question.question.profileType === "yesno")
            .map((question, index) => (
              <QuestionWrapper key={index}>
                <QuestionTitle>{question.question.profileText}</QuestionTitle>
                <YesNoAnswer
                  question={question}
                  toggleComments={toggleComments}
                />
              </QuestionWrapper>
            ))}

        {questions &&
          questions
            .filter(question => question.question.profileType === "pieChart")
            .map((question, index) => (
              <QuestionWrapper key={index}>
                <QuestionTitle>{question.question.profileText}</QuestionTitle>
                <PieAnswer
                  category={category}
                  question={question}
                  toggleComments={toggleComments}
                />
              </QuestionWrapper>
            ))}

        {questions &&
          questions
            .filter(question => question.question.profileType === "dotChart")
            .map((question, index) => (
              <QuestionWrapper key={index}>
                <QuestionTitle>{question.question.profileText}</QuestionTitle>
                <ScatterAnswer
                  category={category}
                  question={question}
                  toggleComments={toggleComments}
                />
              </QuestionWrapper>
            ))}

        {questions &&
          questions
            .filter(question => question.question.profileType === "siteItem")
            .map((question, index) => (
              <QuestionWrapper key={index}>
                <SiteItemAnswer
                  category={category}
                  question={question}
                  toggleComments={toggleComments}
                  profileType={question.question.profileType}
                />
              </QuestionWrapper>
            ))}
        {/* CANTEEN SECTION */}
        {canteenQuestions && (
          <QuestionWrapper>
            <CanteenItemAnswer
              questions={canteenQuestions}
              toggleComments={toggleComments}
            />
          </QuestionWrapper>
        )}
        {questions &&
          questions
            .filter(question =>
              ["list", "payrollList"].includes(question.question.profileType)
            )
            .map((question, index) => (
              <QuestionWrapper key={index}>
                <QuestionTitle>{question.question.profileText}</QuestionTitle>
                <ListAnswer
                  question={question}
                  toggleComments={toggleComments}
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
      </Wrapper>
    );
  }
}
