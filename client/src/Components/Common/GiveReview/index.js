import React, { Component } from "react";

import {
  ReviewButtonsDiv,
  ReviewType,
  Time,
  ReviewButton,
  QuickReviewButton,
  Icon,
  QuickReviewContainer,
  QuickReviewDots
} from "./GiveReview.style";

export default class GiveReview extends Component {
  render() {
    const { category, isMobile, isTablet } = this.props;

    return (
      <ReviewButtonsDiv isTablet={isTablet} isMobile={isMobile}>
        <ReviewType isTablet={isTablet} isMobile={isMobile}>
          <Icon src="/icons/clock-2min.svg" margin="0 0.5rem 0 0" />
          <Time>2 mins</Time>
          <ReviewButton category={category}>
            <h4>Give a full review</h4>
            <p>(Most helpful!)</p>
            <Icon src="/icons/arrow-icon.svg" />
          </ReviewButton>
        </ReviewType>
        {isMobile || isTablet ? (
          <Icon src="/icons/or-horizontal.svg" margin="1rem 0 1rem 0" />
        ) : (
          <Icon src="/icons/or-vertical.svg" margin="0 1rem 0 1rem" />
        )}
        <ReviewType isTablet={isTablet} isMobile={isMobile}>
          <Icon src="/icons/clock-30s.svg" margin="0 0.5rem 0 0" />
          <Time>30 sec</Time>
          <QuickReviewContainer>
            <QuickReviewDots category={category} />
            <QuickReviewButton category={category}>
              <h4>Give a quick review</h4>
              <Icon src="/icons/arrow-icon.svg" />
            </QuickReviewButton>
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
