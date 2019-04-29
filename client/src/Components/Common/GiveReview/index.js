import React, { Component } from "react";

import {
  ReviewButtonsDiv,
  ReviewType,
  Time,
  ReviewButton,
  QuickReviewButton,
  QuickReviewContainer,
  QuickReviewDots,
  QuickLink,
  FullLink
} from "./GiveReview.style";

import Icon from "./../Icon/Icon";

import { colors } from "./../../../theme";

import {
  QUICK_REVIEW_URL,
  REVIEW_URL
} from "../../../constants/naviagationUrls";

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
              <h4>Give a full review</h4>
              <p>(Most helpful!)</p>
              <Icon icon="arrow" width="16" height="16" color="white" />
            </ReviewButton>
          </FullLink>
        </ReviewType>
        {isMobile || isTablet ? (
          <Icon
            icon="orHorizontal"
            width="121"
            height="26"
            margin="1rem 0 1rem 0"
            color={colors.lightGray}
          />
        ) : (
          <Icon
            icon="orVertical"
            width="26"
            height="74"
            margin="0 1rem 0 1.5rem"
            color={colors.lightGray}
          />
        )}
        <ReviewType isTablet={isTablet} isMobile={isMobile}>
          <Icon
            icon="clock30s"
            height="34"
            width="34"
            margin="0 0.5rem 0 0"
            color={colors.profileFontColor}
          />
          <Time>30 sec</Time>
          <QuickReviewContainer>
            <QuickReviewDots category={category} />
            <QuickLink
              to={{
                pathname: QUICK_REVIEW_URL,
                state: state
              }}
            >
              <QuickReviewButton category={category}>
                <h4>Give a quick review</h4>
                <Icon icon="arrow" width="16" height="16" color="white" />
              </QuickReviewButton>
            </QuickLink>
          </QuickReviewContainer>
          {/* <QuickReviewButton category={category}>
            <h4>Give a quick review</h4>
            <Icon src="/icons/arrow-icon.svg" />
          </QuickReviewButton> */}
        </ReviewType>
      </ReviewButtonsDiv>
    );
  }
}
