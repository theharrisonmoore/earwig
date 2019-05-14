import React, { Component } from "react";

import {
  ListWrapper,
  SiteItem,
  SiteAnswer,
  Comment,
  RightCommentWrapper
} from "./ProfileAnswers.style";

import Icon from "./../../../Common/Icon/Icon";

export default class SiteItemAnswer extends Component {
  getAverage = answers => {
    //start count at 1 to give benefit to yes
    let count = 1;
    answers.map(answer =>
      answer.answer === "Yes" ? (count += 1) : (count -= 1)
    );

    return count > 0;
  };

  render() {
    const { question, toggleComments, isMobile, carParkingPrice } = this.props;
    const averageResponse = this.getAverage(question.answers);

    console.log("Q", question);

    return (
      <ListWrapper>
        <SiteItem itemAvailable={averageResponse}>
          {question.question.profileText ===
          "Car parking within 10 mins walk of site" ? (
            <SiteAnswer>
              <Icon
                icon={question.question.icon}
                margin="0 1rem 0 0"
                height={isMobile ? "50" : "2rem"}
                width={isMobile ? "50" : "2rem"}
              />
              {averageResponse ? (
                <p>
                  {question.question.profileText} (£{carParkingPrice()}){" "}
                </p>
              ) : (
                <p>{question.question.profileText}</p>
              )}
            </SiteAnswer>
          ) : (
            <SiteAnswer>
              <Icon
                icon={question.question.icon}
                margin="0 1rem 0 0"
                height={isMobile ? "50" : "2rem"}
                width={isMobile ? "50" : "2rem"}
              />
              <p>{question.question.profileText}</p>
            </SiteAnswer>
          )}
          <RightCommentWrapper>
            {question.answers.filter(answer => answer.comment).length > 0 ? (
              <Comment onClick={() => toggleComments(question)} active>
                Comments
              </Comment>
            ) : (
              <Comment>Comments</Comment>
            )}
          </RightCommentWrapper>
        </SiteItem>
      </ListWrapper>
    );
  }
}
