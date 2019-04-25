import React, { Component } from "react";

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
    // create an object of the payrolls mentioned and the amounts

    // filter the payroll question

    let payrolls = [];

    questions
      .filter(question => question.question.profileType === "payrollList")
      .map(question =>
        question.answers.map(answer =>
          payrolls.push([answer.review, answer.answer])
        )
      );

    const payrollAnswers = payrolls.map(payroll => payroll[1]);

    let payrollCount = payrollAnswers.reduce((acc, payroll) => {
      acc[payroll] = 0;
      return acc;
    }, Object.create(null));

    let payrollFees = [];

    questions
      .filter(question => question.question.profileType === "payrollSubList")
      .map(question =>
        question.answers.map(answer =>
          payrollFees.push([answer.review, answer.answer])
        )
      );

    payrolls.forEach(payroll =>
      payrollFees.forEach(fee => {
        if (payroll[0] === fee[0]) payrollCount[payroll[1]] += fee[1];
      })
    );

    return Object.entries(payrollCount);
  };

  render() {
    const { questions } = this.props;

    const payrollList = this.sortPayroll(questions);

    return (
      <ListWrapper>
        {payrollList.map((item, index) => (
          <PayrollListRow key={index} color="payroll">
            <PayrollName>{item[0]}</PayrollName>
            <PayrollFee>£{item[1]} fee per timesheet</PayrollFee>
          </PayrollListRow>
        ))}
      </ListWrapper>
    );
  }
}
