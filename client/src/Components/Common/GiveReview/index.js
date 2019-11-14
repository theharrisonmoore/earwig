import React, { Component } from "react";
import moment from "moment";

import { Spin } from "antd";

import {
  ReviewButtonsDiv,
  ReviewType,
  Time,
  ReviewButton,
  FullLink,
} from "./GiveReview.style";

import PopoverComponent from "../Popover/index";

import Icon from "../Icon/Icon";

import { colors } from "../../../theme";

export default class GiveReview extends Component {
  state = { isLoading: false };

  handleClick = () => {
    const { state } = this.props;

    const { orgId } = state;

    this.props.history.push({
      pathname: `/organization/${orgId || state.orgId}/review`,
      state,
    });
  };

  render() {
    const {
      category,
      isMobile,
      isTablet,
      reviewNotAllowed,
      reviewsLast30Days,
    } = this.props;
    const { isLoading } = this.state;

    return (
      <ReviewButtonsDiv isTablet={isTablet} isMobile={isMobile}>
        <Spin tip="Loading..." spinning={isLoading} />
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
            as="div"
            disabled={reviewNotAllowed}
            onClick={this.handleClick}
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
              text: `You recently reviewed this ${category ||
                "organisation"}. Please leave four weeks between reviews.`,
              linkText: `Why can't I review this ${category ||
                "organisation"} today?`,
            }}
          />
        )}
      </ReviewButtonsDiv>
    );
  }
}
