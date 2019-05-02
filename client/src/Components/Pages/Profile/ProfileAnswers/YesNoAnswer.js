import React, { Component } from "react";

import { YesNoWrapper, YesHalf, NoHalf, Comment } from "./ProfileAnswers.style";

export default class YesNoAnswer extends Component {
  countYesNo = (yesOrNo, answers) => {
    const yesPercentage =
      Math.floor((answers.filter(answer => answer.answer === "yes").length /
        answers.length) *
      100);

    if (yesOrNo === "yes") return `${yesPercentage}%`;
    else return `${100 - yesPercentage}%`;
  };

  render() {
    const { question, toggleComments } = this.props;

    return (
      <YesNoWrapper>
        <YesHalf width={this.countYesNo("yes", question.answers)}>
          {this.countYesNo("yes", question.answers)}
        </YesHalf>
        <NoHalf width={this.countYesNo("no", question.answers)}>
          {this.countYesNo("no", question.answers)}
        </NoHalf>
        {question.answers.filter(answer => answer.comment).length > 0 ? (
          <Comment onClick={() => toggleComments(question)} active>
            Comments
          </Comment>
        ) : (
          <Comment>Comments</Comment>
        )}
      </YesNoWrapper>
    );
  }
}
