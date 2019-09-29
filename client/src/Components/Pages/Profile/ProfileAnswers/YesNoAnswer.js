import React, { Component } from "react";

import { YesNoWrapper, YesHalf, NoHalf, Comment } from "./ProfileAnswers.style";
import { organizations } from "../../../../theme";

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
    const { question, toggleComments, category } = this.props;

    const answerObj = this.countYesNo(question.answers);

    return (
      <YesNoWrapper
        large={
          question.profileText === "Happy to use this agency again overall"
        }
      >
        <YesHalf width={answerObj.yesPercentage}>
          <p>Yes ({answerObj.yesCount})</p>
        </YesHalf>
        <NoHalf width={answerObj.noPercentage}>
          <p>No ({answerObj.noCount})</p>
        </NoHalf>
        {question.answers.filter(answer => answer.comment).length > 0 ? (
          <Comment
            onClick={() => toggleComments(question)}
            active
            color={organizations[category].primary}
          >
            Comments
          </Comment>
        ) : (
          <Comment>Comments</Comment>
        )}
      </YesNoWrapper>
    );
  }
}
