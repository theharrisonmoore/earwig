import React, { Component } from "react";

import {
  YesNoWrapper,
  AnswerTextWrapper,
  AnswerBarWrapper,
  AnswerCountWrapper,
  AnswerBar,
  AnswerText,
  AnswerCount,
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

  decideLarge = question =>
    question.profileText &&
    question.profileText.includes("Overall, would you recommend");

  render() {
    const { question } = this.props;
    const answerObj = this.countYesNo(question.answers);

    return (
      <YesNoWrapper large={this.decideLarge(question)}>
        {/* answer text yes / no */}
        <AnswerTextWrapper large={this.decideLarge(question)}>
          <AnswerText>Yes</AnswerText>
          <AnswerText>No</AnswerText>
        </AnswerTextWrapper>
        {/* answer bars */}
        <AnswerBarWrapper large={this.decideLarge(question)}>
          <AnswerBar background="green" width={answerObj.yesPercentage} />
          <AnswerBar background="red" width={answerObj.noPercentage} />
        </AnswerBarWrapper>

        {/* answer counts */}
        <AnswerCountWrapper large={this.decideLarge(question)}>
          <AnswerCount> {answerObj.yesCount}</AnswerCount>
          <AnswerCount> {answerObj.noCount}</AnswerCount>
        </AnswerCountWrapper>
      </YesNoWrapper>
    );
  }
}
