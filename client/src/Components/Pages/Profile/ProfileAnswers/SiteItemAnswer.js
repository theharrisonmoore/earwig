import React, { Component } from "react";

import { ListWrapper, SiteItem, SiteAnswer } from "./ProfileAnswers.style";

import Icon from "../../../Common/Icon/Icon";

import { colors } from "../../../../theme";

import { getCarCost } from "../utils";
import { LightTitle } from "../DetailedSection/ReviewSection.style";

// checks each reviewer's answer and counts yes, no and don't know
function getAverage(answers) {
  // start count at 1 to give benefit to yes
  let count = 0;
  let dontKnowCount = 0;
  answers.forEach(({ answer }) => {
    if (answer.includes("Yes")) {
      count += 1;
    } else if (["Don't know", "I didn't check"].includes(answer)) {
      dontKnowCount += 1;
    } else if (answer.includes("No")) {
      count -= 1;
    } else {
      count += 1;
    }
  });

  return { moreYes: count > 0, dontKnow: dontKnowCount > 0 };
}

export default class SiteItemAnswer extends Component {
  render() {
    const { question, reviewDetails } = this.props;

    const carParkingPrice = getCarCost(reviewDetails);
    const averageResponse = getAverage(question.answers);
    const { moreYes, dontKnow } = averageResponse;
    console.log("reviewdet", averageResponse);
    return (
      <ListWrapper>
        <SiteItem>
          {/* check if most answers are don't know */}
          {dontKnow ? (
            <SiteAnswer dontKnow={dontKnow} itemAvailable={moreYes}>
              <Icon
                icon={question.icon}
                margin="0 1rem 0 0"
                height="45"
                width="45"
                color={colors.dustyGray4}
              />
              <LightTitle bar>
                <p>No answers yet</p>
              </LightTitle>
            </SiteAnswer>
          ) : (
            <>
              {question.profileText ===
              "Car parking within 10 mins walk of this site" ? (
                <SiteAnswer dontKnow={dontKnow} itemAvailable={moreYes}>
                  <Icon
                    icon={question.icon}
                    margin="0 1rem 0 0"
                    height="45"
                    width="45"
                    color={colors.dustyGray4}
                  />
                  {question.answers.length > 0 ? (
                    <>
                      {moreYes ? (
                        <p>
                          {question.profileText}

                          {carParkingPrice === "N/A"
                            ? null
                            : `(£${carParkingPrice}) `}
                        </p>
                      ) : (
                        <p>{question.profileText}</p>
                      )}
                    </>
                  ) : (
                    <LightTitle bar>
                      <p>No answers yet</p>
                    </LightTitle>
                  )}
                </SiteAnswer>
              ) : (
                <SiteAnswer dontKnow={dontKnow} itemAvailable={moreYes}>
                  <Icon
                    icon={question.icon}
                    margin="0 1rem 0 0"
                    height="45"
                    width="45"
                    color={colors.dustyGray4}
                  />
                  {question.answers.length > 0 ? (
                    <p>{question.profileText}</p>
                  ) : (
                    <LightTitle bar>
                      <p>No answers yet</p>
                    </LightTitle>
                  )}
                </SiteAnswer>
              )}
            </>
          )}
        </SiteItem>
      </ListWrapper>
    );
  }
}
