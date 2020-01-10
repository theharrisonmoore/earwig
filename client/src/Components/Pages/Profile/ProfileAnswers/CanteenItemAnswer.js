import React, { Component } from "react";

import { ListWrapper, CanteenItem } from "./ProfileAnswers.style";

import CanteenSubItemAnswer from "./CanteenSubItemAnswer";
import Icon from "../../../Common/Icon/Icon";
import { colors } from "../../../../theme";

export default class CanteenItemAnswer extends Component {
  getAverage = answers => {
    // start count at 1 to give benefit to yes
    let count = 1;
    answers.forEach(answer => {
      if (answer.answer === "Yes") {
        count += 1;
      } else {
        count -= 1;
      }
    });

    return count > 0;
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
                color={colors.dustyGray4}
              />
              <p>Canteen on this site</p>
            </CanteenItem>
            {questions
              .filter(
                question =>
                  question.profileText !== "Canteen on this site with:"
              )
              .map(question => (
                <CanteenSubItemAnswer
                  profileText={question.profileText}
                  id={question._id}
                  options={question.options}
                />
              ))}
          </>
        ) : (
          <CanteenItem>
            <Icon
              icon="canteen"
              margin="0 1rem 0 0"
              height="1.5rem"
              width="1.5rem"
              color={colors.dustyGray4}
            />
            <p>Canteen on this site</p>
          </CanteenItem>
        )}
      </ListWrapper>
    );
  }
}
