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
import { getAverage } from "../../../../helpers";

export default class SiteItemAnswer extends Component {
  render() {
    const { question, reviewDetails } = this.props;
    const { profileText, icon } = question;

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

                  <p>{profileText}</p>
                </SiteAnswer>
              )}
            </>
          )}
        </SiteItem>
      </ListWrapper>
    );
  }
}
