import React, { Component } from "react";

import { ListWrapper, SiteItem } from "./ProfileAnswers.style";

import Icon from "./../../../Common/Icon/Icon"

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
    const averageResponse = this.getAverage(question.answers);

    return (
      <ListWrapper>
        <SiteItem itemAvailable={averageResponse}>
        <Icon icon={question.question.icon} margin="0 1rem 0 0" height="1.5rem" width="1.5rem" />
          {/* {averageResponse ? (
            <SiteIcon src="/icons/tick-icon.svg" itemAvailable />
          ) : (
            <SiteIcon src="/icons/not-tick-icon.svg" />
          )} */}
          <p>{question.question.profileText}</p>
        </SiteItem>
      </ListWrapper>
    );
  }
}
