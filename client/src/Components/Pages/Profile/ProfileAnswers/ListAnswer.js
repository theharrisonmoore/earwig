import React, { Component } from "react";
import { Link } from "react-router-dom";

import {
  ListWrapper,
  ListItem,
  Comment,
  ListComment,
  PayrollItem
} from "./ProfileAnswers.style";

import { organizations } from "./../../../../theme";

export default class ListAnswer extends Component {
  decideColor = questionCategory => {
    if (questionCategory === "agency") return "payroll";
    else if (questionCategory === "payroll") return "agency";
    else return questionCategory;
  };

  getAverage = answers => {
    let count = 0;
    const total = answers
      .map(answer => answer.answer)
      .reduce((accum, curr) => {
        if (typeof curr === "number") {
          count++;
          return accum + curr;
        }
        return accum;
      }, 0);
    const avg = total / count;
    return Math.round(avg * 100) / 100;
  };

  render() {
    const { question, toggleComments, category } = this.props;

    if (question.profileText === "Payroll charge") {
      return (
        <ListWrapper>
          <ListComment>
            <PayrollItem color="payroll">
              £{this.getAverage(question.answers)} per timesheet
            </PayrollItem>
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
          </ListComment>
        </ListWrapper>
      );
    } else {
      return (
        <ListWrapper>
          {question.answers.map((answer, index) => (
            <ListItem
              color={
                question.profileText === "Works with the following agencies"
                  ? "agency"
                  : question.category
              }
              key={index}
            >
              <Link
                to={`/profile/${answer.answer._id}`}
                style={{ color: "inherit" }}
              >
                {answer.answer.name}
              </Link>
            </ListItem>
          ))}
        </ListWrapper>
      );
    }
  }
}
