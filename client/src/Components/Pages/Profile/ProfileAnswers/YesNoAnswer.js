import React, { Component } from "react";

import { YesNoWrapper, YesHalf, NoHalf } from "./ProfileAnswers.style";

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
          question.profileText ===
          "Overall, would you be happy to use this agency again?"
        }
      >
        <YesHalf width={answerObj.yesPercentage}>
          <p>Yes ({answerObj.yesCount})</p>
        </YesHalf>
        <NoHalf width={answerObj.noPercentage}>
          <p>No ({answerObj.noCount})</p>
        </NoHalf>
      </YesNoWrapper>
    );
  }
}
