import React, { Component } from "react";

import {
  YesNoWrapper,
  Row,
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
        <Row>
          <AnswerText large={this.decideLarge(question)}>Yes</AnswerText>

          <AnswerBar
            large={this.decideLarge(question)}
            background="green"
            width={answerObj.yesPercentage}
          />
          <AnswerCount large={this.decideLarge(question)}>
            {answerObj.yesCount}
          </AnswerCount>
        </Row>
        <Row>
          <AnswerText large={this.decideLarge(question)}>No</AnswerText>
          <AnswerBar
            large={this.decideLarge(question)}
            background="red"
            width={answerObj.noPercentage}
          />
          <AnswerCount large={this.decideLarge(question)}>
            {answerObj.noCount}
          </AnswerCount>
        </Row>
      </YesNoWrapper>
    );
  }
}
