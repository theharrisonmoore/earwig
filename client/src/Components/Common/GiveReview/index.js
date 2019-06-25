import React, { Component } from "react";

import {
  ReviewButtonsDiv,
  ReviewType,
  Time,
  ReviewButton,
  FullLink
} from "./GiveReview.style";

import { Popover } from "antd";

import Icon from "./../Icon/Icon";

import { colors } from "./../../../theme";

import { REVIEW_URL } from "../../../constants/naviagationUrls";

export default class GiveReview extends Component {
  render() {
    const {
      category,
      isMobile,
      isTablet,
      state,
      reviewNotAllowed
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
              pathname: REVIEW_URL,
              state: state
            }}
            disabled={reviewNotAllowed.length === 0}
          >
            <ReviewButton
              grayOut={reviewNotAllowed.length === 0}
              category={category}
            >
              <h4>Give a review</h4>
              <Icon icon="arrow" width="16" height="16" color="white" />
            </ReviewButton>
          </FullLink>
        </ReviewType>
        {reviewNotAllowed.length === 0 && (
          <Popover
            title="Why can't I give a review?"
            text={<span>Why can't I give a review?</span>}
            placement="top"
            content={
              <div>
                <p>
                  We’re asking this because it will be useful to track over time
                  how much agencies are paying workers
                </p>
              </div>
            }
            trigger="click"
            // visible={this.state.popoverVisible}
            // onVisibleChange={this.handleVisibleChange}
          >
            <button>Why can't I give a review?</button>
            {/* <PopoverLink>Why are we asking this?</PopoverLink> */}
          </Popover>
        )}
      </ReviewButtonsDiv>
    );
  }
}
