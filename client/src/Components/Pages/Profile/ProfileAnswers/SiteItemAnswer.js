import React, { Component } from "react";

import {
  ListWrapper,
  SiteItem,
  SiteAnswer,
  NoAnswer,
} from "./ProfileAnswers.style";

import Icon from "../../../Common/Icon/Icon";

import { colors } from "../../../../theme";

import { getCarCost } from "../utils";
import { LightTitle } from "../DetailedSection/ReviewSection.style";

// checks if answers for specific question and count
function getAverage(answers) {
  // set up yes/no and dont know counters
  let count = 0;
  let dontKnowCount = 0;

  // if question has no answers show no answers
  if (answers.length === 0) {
    dontKnowCount += 1;
  }
  // else check each answer and count
  else {
    answers.forEach(({ answer }) => {
      if (answer.includes("Yes")) {
        count += 1;
      } else if (["Don't know", "I didn't check"].includes(answer)) {
        dontKnowCount += 1;
      } else if (answer.includes("No")) {
        count -= 1;
      } else if (!answer) {
        dontKnowCount += 1;
      }
    });
  }

  return { moreYes: count > 0, dontKnow: dontKnowCount > 0 };
}

export default class SiteItemAnswer extends Component {
  render() {
    const { question, reviewDetails } = this.props;
    const { answers, profileText, icon } = question;

    const carParkingPrice = getCarCost(reviewDetails);
    const averageResponse = getAverage(question.answers);
    const { moreYes, dontKnow } = averageResponse;

    return (
      <ListWrapper>
        <SiteItem>
          {/* check if most answers are don't know */}
          {dontKnow ? (
            <NoAnswer>
              <Icon
                icon={icon}
                margin="0 1rem 0 0"
                height="45"
                width="45"
                color={colors.dustyGray4}
              />
              <LightTitle bar>
                <p>No answers yet</p>
              </LightTitle>
            </NoAnswer>
          ) : (
            // if not don't know render yes/no
            <>
              {profileText ===
              "Car parking within 10 mins walk of this site" ? (
                <SiteAnswer itemAvailable={moreYes}>
                  <Icon
                    icon={icon}
                    margin="0 1rem 0 0"
                    height="45"
                    width="45"
                    color={colors.dustyGray4}
                  />

                  {moreYes ? (
                    <p>
                      {profileText}

                      {carParkingPrice === "N/A"
                        ? null
                        : `(£${carParkingPrice}) `}
                    </p>
                  ) : (
                    <p>{profileText}</p>
                  )}
                </SiteAnswer>
              ) : (
                <SiteAnswer itemAvailable={moreYes}>
                  <Icon
                    icon={icon}
                    margin="0 1rem 0 0"
                    height="45"
                    width="45"
                    color={colors.dustyGray4}
                  />
                  {answers.length > 0 ? (
                    <p>{profileText}</p>
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
