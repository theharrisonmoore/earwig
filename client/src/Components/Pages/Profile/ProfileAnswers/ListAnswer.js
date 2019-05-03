import React, { Component } from "react";

import {
  ListWrapper,
  ListItem,
  Comment,
  ListComment
} from "./ProfileAnswers.style";

export default class ListAnswer extends Component {
  decideColor = questionCategory => {
    if (questionCategory === "agency") return "payroll";
    else if (questionCategory === "payroll") return "agency";
    else return questionCategory;
  };

  getAverage = answers =>
    answers.map(answer => answer.answer).reduce((accum, curr) => accum + curr);

  render() {
    const { question, toggleComments } = this.props;

    if (question.question.profileText === "Payroll charge") {
      return (
        <ListWrapper>
          {question.question.profileText === "Payroll charge" ? (
            <ListComment>
              <ListItem color="payroll">
                £{this.getAverage(question.answers)} per timesheet
              </ListItem>
              {question.answers.filter(answer => answer.comment).length > 0 ? (
                <Comment onClick={() => toggleComments(question)} active>
                  Comments
                </Comment>
              ) : (
                <Comment>Comments</Comment>
              )}
            </ListComment>
          ) : (
            question.answers.map((answer, index) => (
              <ListItem
                key={index}
                color={this.decideColor(question.question.category)}
              >
                {question.question.profileText === "Payroll charge" ? (
                  <>£{answer.answer}</>
                ) : (
                  <>{answer.answer}</>
                )}
              </ListItem>
            ))
          )}
        </ListWrapper>
      );
    } else {
      return null;
    }
  }
}
