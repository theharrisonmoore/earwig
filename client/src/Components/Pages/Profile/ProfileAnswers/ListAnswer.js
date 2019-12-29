import React, { Component } from "react";
import { Link } from "react-router-dom";

import {
  ListWrapper,
  ListItem,
  ListComment,
  Comment,
  PayrollItem,
} from "./ProfileAnswers.style";

import { organizations } from "../../../../theme";

export default class ListAnswer extends Component {
  decideColor = questionCategory => {
    if (questionCategory === "agency") return "payroll";
    if (questionCategory === "payroll") return "agency";
    return questionCategory;
  };

  getAverage = answers => {
    let count = 0;
    const total = answers
      .map(answer => answer.answer)
      .reduce((accum, curr) => {
        if (typeof curr === "number") {
          count += 1;
          return accum + curr;
        }
        return accum;
      }, 0);
    const avg = total / count;
    return Math.round(avg * 100) / 100;
  };

  render() {
    const { question, toggleComments, category } = this.props;

    if (question.profileText === "This payroll charges you") {
      return (
        <ListWrapper>
          <ListComment>
            <PayrollItem color="payroll">
              £{this.getAverage(question.answers)} per timesheet
            </PayrollItem>
            {question.hasComment &&
            question.answers.filter(answer => answer.comment).length > 0 ? (
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
    }
    if (question.profileText === "Recommended nearby shops and cafés") {
      return (
        <ListWrapper style={{ paddingLeft: "2rem" }}>
          {question.answers.map(answer => (
            <ListItem color={question.category} key={answer.answer}>
              - {answer.answer}
            </ListItem>
          ))}
        </ListWrapper>
      );
    }
    return (
      <ListWrapper>
        {question.answers.map(answer => (
          <ListItem
            color={
              question.profileText ===
              "This payroll works with the following agencies"
                ? "agency"
                : question.category
            }
            key={answer.answer.name}
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
