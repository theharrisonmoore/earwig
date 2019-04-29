import React, { Component } from "react";

import { ListWrapper, SiteItem, SiteIcon } from "./ProfileAnswers.style";

export default class SiteItemAnswer extends Component {
  getAverage = answers => {
    //start count at 1 to give benefit to yes
    let count = 1;
    answers.map(answer =>
      answer.answer === "yes" ? (count += 1) : (count -= 1)
    );

    return count > 0;
  };

  render() {
    const { question } = this.props;
    console.log('questions', question);
    const averageResponse = this.getAverage(question.answers);

    return (
      <ListWrapper>
        <SiteItem itemAvailable={averageResponse}>
          {averageResponse ? (
            <SiteIcon src="/icons/tick-icon.svg" itemAvailable />
          ) : (
            <SiteIcon src="/icons/not-tick-icon.svg" />
          )}
          <p>{question.question.profileText}</p>
        </SiteItem>
      </ListWrapper>
    );
  }
}
