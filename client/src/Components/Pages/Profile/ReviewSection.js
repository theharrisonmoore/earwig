import React, { Component } from "react";

import {
  Wrapper,
  SectionTitle,
  QuestionWrapper,
  QuestionTitle
} from "./ReviewSection.style";

export default class ReviewSection extends Component {
  render() {
    const { sectionDetails } = this.props;
    const { _id: sectionTitle, questions } = sectionDetails;

    console.log("SECTION", sectionDetails);

    return (
      // Question - Title, AggregatedAnswer, Comment Box
      <Wrapper>
        <SectionTitle>{sectionTitle}</SectionTitle>
        {questions &&
          questions.map(question => (
            <QuestionWrapper>
              <QuestionTitle>{question.question.profileText}</QuestionTitle>
              <p>Answers to go here</p>
            </QuestionWrapper>
          ))}
      </Wrapper>
    );
  }
}
