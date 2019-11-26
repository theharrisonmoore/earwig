import React, { Component } from "react";

import { ListWrapper, SiteItem, SiteAnswer } from "./ProfileAnswers.style";

import Icon from "../../../Common/Icon/Icon";

export default class SiteItemAnswer extends Component {
  getAverage = answers => {
    // start count at 1 to give benefit to yes
    let count = 1;
    answers.map(answer =>
      answer.answer === "Yes" ? (count += 1) : (count -= 1)
    );

    return count > 0;
  };

  render() {
    const { question, isMobile, carParkingPrice } = this.props;
    const averageResponse = this.getAverage(question.answers);

    return (
      <ListWrapper>
        <SiteItem itemAvailable={averageResponse}>
          {question.profileText ===
          "Car parking within 10 mins walk of this site" ? (
            <SiteAnswer itemAvailable={averageResponse}>
              <Icon
                icon={question.icon}
                margin="0 1rem 0 0"
                height={isMobile ? "50" : "2rem"}
                width={isMobile ? "50" : "2rem"}
              />
              {averageResponse ? (
                <p>
                  {question.profileText} (£{carParkingPrice()}){" "}
                </p>
              ) : (
                <p>{question.profileText}</p>
              )}
            </SiteAnswer>
          ) : (
            <SiteAnswer itemAvailable={averageResponse}>
              <Icon
                icon={question.icon}
                margin="0 1rem 0 0"
                height={isMobile ? "50" : "2rem"}
                width={isMobile ? "50" : "2rem"}
              />
              <p>{question.profileText}</p>
            </SiteAnswer>
          )}
        </SiteItem>
      </ListWrapper>
    );
  }
}
