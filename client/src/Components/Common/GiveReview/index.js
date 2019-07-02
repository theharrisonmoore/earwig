import React, { Component } from "react";
import moment from "moment";
import {
  ReviewButtonsDiv,
  ReviewType,
  Time,
  ReviewButton,
  FullLink
} from "./GiveReview.style";

import PopoverComponent from "../Popover/index";

import Icon from "./../Icon/Icon";

import { colors } from "./../../../theme";

export default class GiveReview extends Component {
  render() {
    const {
      category,
      orgId,
      isMobile,
      isTablet,
      state,
      reviewNotAllowed,
      reviewsLast30Days
    } = this.props;

    return (
      <ReviewButtonsDiv isTablet={isTablet} isMobile={isMobile}>
        <ReviewType isTablet={isTablet} isMobile={isMobile}>
          <Icon
            icon="clock2min"
            height="34"
            width="34"
            margin="0 0.5rem 0 0"
            color={colors.profileFontColor}
          />
          <Time>2 mins</Time>
          <FullLink
            to={{
              pathname: `/organization/${orgId}/review`,
              state: state
            }}
            disabled={reviewNotAllowed}
          >
            <ReviewButton grayOut={reviewNotAllowed} category={category}>
              <h4>Give a review</h4>
              <Icon icon="arrow" width="16" height="16" color="white" />
            </ReviewButton>
          </FullLink>
        </ReviewType>
        {reviewNotAllowed && reviewsLast30Days.length > 0 && (
          <PopoverComponent
            category={category}
            popoverOptions={{
              text: `It seems that you've already reviewed this organisation in the last 30 days. You can review each organisation once a month. Date of last review: ${moment(
                reviewsLast30Days[0].date
              ).format("DD.MM.YYYY")}`,
              linkText: "Why can't I give a review?"
            }}
          />
        )}
      </ReviewButtonsDiv>
    );
  }
}
