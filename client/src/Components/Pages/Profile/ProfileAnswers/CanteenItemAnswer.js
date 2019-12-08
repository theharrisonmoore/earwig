import React, { Component } from "react";

import {
  ListWrapper,
  CanteenItem,
  CanteenSubList,
} from "./ProfileAnswers.style";

import Icon from "../../../Common/Icon/Icon";

export default class CanteenItemAnswer extends Component {
  getAverage = answers => {
    // start count at 1 to give benefit to yes
    let count = 1;
    answers.map(answer =>
      answer.answer === "Yes" ? (count += 1) : (count -= 1)
    );

    return count > 0;
  };

  getSelectedItems = (answers, option) => {
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

  onlyNeutralAnswers = answers => {
    const yesOrNo = answers.filter(
      answer => answer.answer !== "I didn't check"
    );

    return yesOrNo.length === 0;
  };

  render() {
    const { questions, isMobile } = this.props;

    const canteenHeader = questions.filter(
      question => question.profileText === "Canteen on this site with:"
    );

    const hasCanteen = this.getAverage(canteenHeader[0].answers);

    return (
      <ListWrapper>
        {hasCanteen ? (
          <>
            <CanteenItem itemAvailable>
              <Icon
                icon="canteen"
                margin="0 1rem 0 0"
                height={isMobile ? "50" : "2rem"}
                width={isMobile ? "50" : "2rem"}
              />
              <p>Canteen on this site</p>
            </CanteenItem>
            {questions
              .filter(
                question =>
                  question.profileText !== "Canteen on this site with:"
              )
              .map((question, index) =>
                question.profileText === "heated" ? (
                  <CanteenSubList
                    key={index}
                    hide={this.onlyNeutralAnswers(question.answers)}
                  >
                    - {question.profileText}
                  </CanteenSubList>
                ) : (
                  question.options.map(
                    (option, index) =>
                      option !== "I didn't check" && (
                        <CanteenSubList
                          key={index}
                          itemAvailable={this.getSelectedItems(
                            question.answers,
                            option
                          )}
                          hide={this.onlyNeutralAnswers(question.answers)}
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
            <Icon
              icon="canteen"
              margin="0 1rem 0 0"
              height="1.5rem"
              width="1.5rem"
            />
            <p>Canteen on this site</p>
          </CanteenItem>
        )}
      </ListWrapper>
    );
  }
}
