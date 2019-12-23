import React, { Component } from "react";

import {
  YesNoWrapper,
  AnswerWrapper,
  AnswerBar,
  AnswerText,
  AnswerCount,
  NoHalf,
} from "./ProfileAnswers.style";

export default class YesNoAnswer extends Component {
  countYesNo = answers => {
    const yesAnswers = answers
      ? answers.filter(answer => answer.answer === "Yes").length
      : 0;
    const noAnswers = answers
      ? answers.filter(answer => answer.answer === "No").length
      : 0;
    const noPerc = (noAnswers / (yesAnswers + noAnswers)) * 100;

    const answerObj = {
      yesCount: yesAnswers,
      noCount: noAnswers,
      yesPercentage: Math.ceil((yesAnswers / (yesAnswers + noAnswers)) * 100),
      noPercentage: noPerc,
    };
    return answerObj;
  };

  render() {
    const { question } = this.props;
    const answerObj = this.countYesNo(question.answers);

    return (
      <YesNoWrapper
        large={
          question.profileText &&
          question.profileText.includes("Overall, would you recommend")
        }
      >
        {/* yes */}
        <AnswerWrapper>
          <AnswerText>Yes</AnswerText>
          <AnswerBar background="green" width={answerObj.yesPercentage} />
          <AnswerCount> {answerObj.yesCount}</AnswerCount>
        </AnswerWrapper>
        {/* no */}
        <AnswerWrapper>
          <AnswerText>No</AnswerText>
          <AnswerBar background="red" width={answerObj.noPercentage} />
          <AnswerCount> {answerObj.noCount}</AnswerCount>
        </AnswerWrapper>
      </YesNoWrapper>
    );
  }
}
