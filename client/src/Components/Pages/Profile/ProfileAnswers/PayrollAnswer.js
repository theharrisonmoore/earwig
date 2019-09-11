import React, { Component } from "react";
import { Link } from "react-router-dom";

import {
  ListWrapper,
  PayrollListRow,
  PayrollName,
  PayrollFee
} from "./ProfileAnswers.style";

export default class PayrollAnswer extends Component {
  decideColor = questionCategory => {
    if (questionCategory === "agency") return "payroll";
    else if (questionCategory === "payroll") return "agency";
    else return questionCategory;
  };

  sortPayroll = questions => {
    const obj = {};
    questions.forEach(question => {
      if (question.profileType === "payrollList") {
        question.answers.forEach(ans => {
          if (!obj[ans.answer._id]) {
            obj[ans.answer._id] = {
              name: ans.answer.name,
              payrollId: ans.answer._id,
              perSheet: 0,
              reviewId: [ans.review],
              count: 0
            };
          } else {
            obj[ans.answer._id].reviewId = [
              ...obj[ans.answer._id].reviewId,
              ans.review
            ];
          }
        });
      }
    });

    Object.entries(obj).forEach(payroll => {
      const [payrollId, details] = payroll;
      questions.forEach(question => {
        if (question.profileType === "payrollSubList") {
          question.answers.forEach(cost => {
            if (details.reviewId.includes(cost.review)) {
              obj[payrollId].perSheet += cost.answer;
              obj[payrollId].count += 1;
            }
          });
        }
      });
    });
    return obj;
  };

  render() {
    const { questions } = this.props;
    const payrollList = this.sortPayroll(questions);

    return (
      <ListWrapper>
        {Object.values(payrollList).map(
          ({ name, count, perSheet, payrollId }, index) => {
            const cost = perSheet / count;
            return (
              <PayrollListRow key={index} color="payroll">
                <PayrollName>
                  <Link to={`/profile/${payrollId}`}>{name}</Link>
                </PayrollName>
                {cost ? (
                  <PayrollFee>£{cost} fee per timesheet</PayrollFee>
                ) : (
                  <PayrollFee>No data</PayrollFee>
                )}
              </PayrollListRow>
            );
          }
        )}
      </ListWrapper>
    );
  }
}
