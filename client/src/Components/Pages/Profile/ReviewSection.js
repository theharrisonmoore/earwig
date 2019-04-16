import React, { Component } from "react";

import {
  Wrapper,
  SectionTitle,
  QuestionWrapper,
  QuestionTitle
} from "./ReviewSection.style";

import YesNoAnswer from "./ProfileAnswers/YesNoAnswer.js";
import ListAnswer from "./ProfileAnswers/ListAnswer.js";
import PieAnswer from "./ProfileAnswers/PieAnswer.js";
import ScatterAnswer from "./ProfileAnswers/ScatterAnswer";

export default class ReviewSection extends Component {
  render() {
    const { sectionDetails, category, toggleComments } = this.props;
    const { _id: sectionTitle, questions } = sectionDetails;

    return (
      // Question - Title, AggregatedAnswer, Comment Box
      <Wrapper>
        <SectionTitle>{sectionTitle}</SectionTitle>
        {questions &&
          questions.map(question => (
            <QuestionWrapper>
              <QuestionTitle>{question.question.profileText}</QuestionTitle>
              {question.question.profileType === "yesno" && (
                <YesNoAnswer
                  question={question}
                  toggleComments={toggleComments}
                />
              )}
              {question.question.profileType === "list" && (
                <ListAnswer
                  question={question}
                  toggleComments={toggleComments}
                />
              )}
              {question.question.profileType === "pieChart" && (
                <PieAnswer
                  category={category}
                  question={question}
                  toggleComments={toggleComments}
                />
              )}
              {question.question.profileType === "dotChart" && (
                <ScatterAnswer
                  category={category}
                  question={question}
                  toggleComments={toggleComments}
                />
              )}
            </QuestionWrapper>
          ))}
      </Wrapper>
    );
  }
}
