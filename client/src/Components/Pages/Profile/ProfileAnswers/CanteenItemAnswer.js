import React, { Component } from "react";

import {
  ListWrapper,
  CanteenItem,
  SiteIcon,
  CanteenSubList
} from "./ProfileAnswers.style";

import Icon from "./../../../Common/Icon/Icon"

export default class CanteenItemAnswer extends Component {
  getAverage = answers => {
    //start count at 1 to give benefit to yes
    let count = 1;
    answers.map(answer =>
      answer.answer === "yes" ? (count += 1) : (count -= 1)
    );

    return count > 0;
  };

  getSelectedItems = (answers, option) => {
    let totalAnswers = [];

    answers.map(userAnswers =>
      userAnswers.answer.map(individAnswer => totalAnswers.push(individAnswer))
    );

    return totalAnswers.includes(option);
  };

  render() {
    const { questions } = this.props;

    const canteenHeader = questions.filter(
      question => question.question.profileText === "Canteen:"
    );

    const hasCanteen = this.getAverage(canteenHeader[0].answers);

    return (
      <ListWrapper>
        {hasCanteen ? (
          <>
            <CanteenItem itemAvailable>
              <Icon icon="canteen" margin="0 1rem 0 0" height="1.5rem" width="1.5rem" />
              <p>{canteenHeader[0].question.profileText}</p>
            </CanteenItem>
            {questions
              .filter(question => question.question.profileText !== "Canteen:")
              .map((question, index) =>
                question.question.profileText === "heated" ? (
                  <CanteenSubList key={index}>
                    - {question.question.profileText}
                  </CanteenSubList>
                ) : (
                  question.question.options.map(
                    (option, index) =>
                      option !== "I didn't check" && (
                        <CanteenSubList
                          key={index}
                          itemAvailable={this.getSelectedItems(
                            question.answers,
                            option
                          )}
                        >
                          - {option}{" "}
                        </CanteenSubList>
                      )
                  )
                )
              )}
          </>
        ) : (
          <CanteenItem>
            <Icon icon="canteen" margin="0 1rem 0 0" height="1.5rem" width="1.5rem" />
            <p>Canteen</p>
          </CanteenItem>
        )}
      </ListWrapper>
    );
  }
}
