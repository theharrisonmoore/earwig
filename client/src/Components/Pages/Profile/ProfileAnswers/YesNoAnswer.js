import React, { Component } from "react";

import { YesNoWrapper, YesHalf, NoHalf, Comment } from "./ProfileAnswers.style";
import { organizations } from "./../../../../theme";

export default class YesNoAnswer extends Component {
  countYesNo = (answers) => {
    // get only yes or no answers
    // const cleanAnswers = answers.filter(answer =>
    //   ["Yes", "No"].includes(answer.answer)
    // );

    // const yesPercentage = Math.floor(
    //   (cleanAnswers.filter(cleanAnswer => cleanAnswer.answer === "Yes").length /
    //     cleanAnswers.length) *
    //     100
    // );

    // if (yesOrNo === "Yes") return `${yesPercentage}%`;
    // else return `${100 - yesPercentage}%`;

    console.log(answers)


    const yesAnswers = answers ? answers.filter(answer => answer.answer === "Yes").length : 0
    const noAnswers = answers ? answers.filter(answer => answer.answer === "No").length : 0
    const noPerc = noAnswers / (yesAnswers + noAnswers) * 100;

    const answerObj = {
      yesCount: yesAnswers,
      noCount: noAnswers,
      yesPercentage: Math.ceil((yesAnswers / (yesAnswers + noAnswers) * 100)),
      noPercentage: noPerc
    }
    console.log('y', answerObj.yesPercentage)
    console.log('n', answerObj.noPercentage)
     return answerObj;
  };

  render() {
    const { question, toggleComments, category } = this.props;

    console.log(question)

    const answerObj = this.countYesNo(question.answers)

    console.log(answerObj.yesPercentage)

    return (
      <YesNoWrapper>
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
