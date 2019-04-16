import React, { Component } from "react";

import {
  Wrapper,
  SectionTitle,
  QuestionWrapper,
  QuestionTitle,
} from "./ReviewSection.style";

import YesNoAnswer from "./ProfileAnswers/YesNoAnswer.js"

export default class ReviewSection extends Component {
  // countYesNo = (yesOrNo, answers) => {
  //   const yesPercentage =
  //     (answers.filter(answer => answer.answer === "yes").length /
  //       answers.length) *
  //     100;

  //   if (yesOrNo === "yes") return `${yesPercentage}%`;
  //   else return `${100 - yesPercentage}%`;
  // };

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
              {question.question.profileType === "yesno" && (
                <YesNoAnswer question={question} />
                // <YesNoAnswer>
                //   <YesHalf width={this.countYesNo("yes", question.answers)}>
                //     {this.countYesNo("yes", question.answers)}
                //   </YesHalf>
                //   <NoHalf width={this.countYesNo("no", question.answers)}>
                //     {this.countYesNo("no", question.answers)}
                //   </NoHalf>
                //   <ActiveComment
                //     active={
                //       question.answers.filter(answer => answer.comment).length >
                //       0
                //     }
                //   >
                //     Comments
                //   </ActiveComment>
                // </YesNoAnswer>
              )}

            </QuestionWrapper>
          ))}
      </Wrapper>
    );
  }
}
