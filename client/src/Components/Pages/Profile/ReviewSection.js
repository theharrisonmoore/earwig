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

export default class ReviewSection extends Component {
  render() {
    const { sectionDetails, category, toggleComments, summary } = this.props;
    const { _id: sectionTitle, questions } = sectionDetails;

    const canteenQuestions =
      questions &&
      questions.filter(
        question => question.question.profileType === "canteenItem"
      );

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
          questions.map(question => (
            <>
              {question.question.profileType === "yesno" && (
                <QuestionWrapper>
                  <QuestionTitle>{question.question.profileText}</QuestionTitle>
                  <YesNoAnswer
                    question={question}
                    toggleComments={toggleComments}
                  />
                </QuestionWrapper>
              )}
              {question.question.profileType === "pieChart" && (
                <QuestionWrapper>
                  <QuestionTitle>{question.question.profileText}</QuestionTitle>
                  <PieAnswer
                    category={category}
                    question={question}
                    toggleComments={toggleComments}
                  />
                </QuestionWrapper>
              )}
              {question.question.profileType === "dotChart" && (
                <QuestionWrapper>
                  <QuestionTitle>{question.question.profileText}</QuestionTitle>
                  <ScatterAnswer
                    category={category}
                    question={question}
                    toggleComments={toggleComments}
                  />
                </QuestionWrapper>
              )}
              {/* {question.question.profileType === "siteItem" && (
                <QuestionWrapper>
                  <SiteItemAnswer
                    category={category}
                    question={question}
                    toggleComments={toggleComments}
                    profileType={question.question.profileType}
                  />
                </QuestionWrapper>
              )} */}
            </>
          ))}

        {questions &&
          questions
            .filter(question => question.question.profileType === "siteItem")
            .map(question => (
              <QuestionWrapper>
                <SiteItemAnswer
                  category={category}
                  question={question}
                  toggleComments={toggleComments}
                  profileType={question.question.profileType}
                />
              </QuestionWrapper>
            ))}
        {/* CANTEEN SECTION */}
        {canteenQuestions.length > 0 && (
          <CanteenItemAnswer
            questions={canteenQuestions}
            toggleComments={toggleComments}
          />
        )}
        {questions &&
          questions
            .filter(question =>
              ["list", "payrollList", "payrollSubList"].includes(
                question.question.profileType
              )
            )
            .map(question => (
              <QuestionWrapper>
                <QuestionTitle>{question.question.profileText}</QuestionTitle>
                <ListAnswer
                  question={question}
                  toggleComments={toggleComments}
                />
              </QuestionWrapper>
            ))}
      </Wrapper>
    );
  }
}
