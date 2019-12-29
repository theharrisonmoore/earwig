import React, { Component } from "react";
import { CanteenSubList } from "./ProfileAnswers.style";

const onlyNeutralAnswers = answers => {
  const yesOrNo = answers.filter(answer => answer.answer !== "I didn't check");
  return yesOrNo.length === 0;
};

const getSelectedItems = (answers, option) => {
  const totalAnswers = [];
  answers.map(userAnswers => {
    return userAnswers.answer === "I didn't check"
      ? totalAnswers.push(userAnswers.answer)
      : userAnswers.answer.map(individAnswer =>
          totalAnswers.push(individAnswer)
        );
  });

  return totalAnswers.includes(option);
};

export default class CanteenSubItemAnswer extends Component {
  render() {
    const { profileText, id, answers, options } = this.props;

    return profileText === "heated" ? (
      <CanteenSubList key={`${id}heated`} hide={onlyNeutralAnswers(answers)}>
        - {profileText}
      </CanteenSubList>
    ) : (
      options.map(
        option =>
          option !== "I didn't check" && (
            <CanteenSubList
              key={`${id}I-didn't-check`}
              itemAvailable={getSelectedItems(answers, option)}
              hide={onlyNeutralAnswers(answers)}
            >
              - {option}{" "}
            </CanteenSubList>
          )
      )
    );
  }
}
