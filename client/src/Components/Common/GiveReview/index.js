import React, { Component } from "react";

import {
  ReviewButtonsDiv,
  ReviewType,
  Time,
  ReviewButton,
  FullLink
} from "./GiveReview.style";

import Icon from "./../Icon/Icon";

import { colors } from "./../../../theme";

import { REVIEW_URL } from "../../../constants/naviagationUrls";

export default class GiveReview extends Component {
  render() {
    const { category, isMobile, isTablet, state } = this.props;

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
              pathname: REVIEW_URL,
              state: state
            }}
          >
            <ReviewButton category={category}>
              <h4>Give a review</h4>
              <Icon icon="arrow" width="16" height="16" color="white" />
            </ReviewButton>
          </FullLink>
        </ReviewType>
      </ReviewButtonsDiv>
    );
  }
}
