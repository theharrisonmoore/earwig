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

  // decides if a question should be rendered as large (overall) question
  decideLarge = question =>
    question.profileText &&
    question.profileText.includes("Overall, would you recommend");

  // determines percentage of yes/no counts of question related to next limit
  // e.g. Beyond 9, numbers should be counted 1-19 and so on
  decideLimit = (yesCount, noCount) => {
    // check if input number is positive
    if (yesCount < 0 || noCount < 0) {
      return undefined;
    }

    // first find next biggest number of biggest input divisible by 10 without remainder
    // e.g. (2, 3) -> 10, (2, 12) -> 20
    const biggestNumber = Math.max(yesCount, noCount);

    const getCounter = () => {
      let counter = 1;
      // by increasing counter by 1 in each step
      while ((biggestNumber + counter) % 10 > 0) {
        counter += 1;
      }
      return counter;
    };
    // second calculate next possible limit
    // e.g. 2 -> 9, 12 -> 19, 99 -> 99
    const limit = biggestNumber + getCounter() - 1;
    return limit;
  };

  render() {
    const { question, zeroAnswers } = this.props;
    const answerObj = this.countYesNo(question.answers);
    const { yesCount, noCount } = answerObj;

    return (
      <YesNoWrapper large={this.decideLarge(question)}>
        <Row>
          <AnswerText large={this.decideLarge(question)}>
            <p>Yes </p>
          </AnswerText>
          {!zeroAnswers && (
            <AnswerBar
              large={this.decideLarge(question)}
              background="green"
              // barWidth = (answerCount * 100) / limit;
              width={(yesCount * 100) / this.decideLimit(yesCount, noCount)}
            />
          )}
          <AnswerCount
            hasData={!zeroAnswers}
            large={this.decideLarge(question)}
          >
            {zeroAnswers ? "No answers yet" : yesCount}
          </AnswerCount>
        </Row>
        <Row>
          <AnswerText large={this.decideLarge(question)}>
            <p>No </p>
          </AnswerText>
          {!zeroAnswers && (
            <AnswerBar
              large={this.decideLarge(question)}
              background="red"
              width={(noCount * 100) / this.decideLimit(yesCount, noCount)}
            />
          )}
          <AnswerCount
            large={this.decideLarge(question)}
            hasData={!zeroAnswers}
          >
            {zeroAnswers ? "" : noCount}
          </AnswerCount>
        </Row>
      </YesNoWrapper>
    );
  }
}
