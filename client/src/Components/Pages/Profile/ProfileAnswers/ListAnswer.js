import React, { Component } from "react";

import { ListWrapper, ListItem } from "./ProfileAnswers.style";

export default class ListAnswer extends Component {
  decideColor = questionCategory => {
    if (questionCategory === "agency") return "payroll";
    else if (questionCategory === "payroll") return "agency";
    else return questionCategory;
  };

  render() {
    const { question } = this.props;

    return (
      <ListWrapper>
        {question.answers.map(answer => (
          <ListItem color={this.decideColor(question.question.category)}>
            {answer.answer}
          </ListItem>
        ))}
      </ListWrapper>
    );
  }
}
