import React, { Component } from "react";

import { YesNoWrapper, YesHalf, NoHalf, Comment } from "./ProfileAnswers.style";

export default class YesNoAnswer extends Component {
  countYesNo = (yesOrNo, answers) => {
    // get only yes or no answers
    const cleanAnswers = answers.filter(answer =>
      ["Yes", "No"].includes(answer.answer)
    );

    const yesPercentage = Math.floor(
      (cleanAnswers.filter(cleanAnswer => cleanAnswer.answer === "Yes").length /
        cleanAnswers.length) *
        100
    );

    if (yesOrNo === "Yes") return `${yesPercentage}%`;
    else return `${100 - yesPercentage}%`;
  };

  render() {
    const { question, toggleComments } = this.props;

    return (
      <YesNoWrapper>
        <YesHalf width={this.countYesNo("Yes", question.answers)}>
          {this.countYesNo("Yes", question.answers)}
        </YesHalf>
        <NoHalf width={this.countYesNo("No", question.answers)}>
          {this.countYesNo("No", question.answers)}
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
