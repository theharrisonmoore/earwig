import React, { Component } from "react";
import moment from "moment";
import axios from "axios";
import swal from "sweetalert2";

import { Spin } from "antd";

import { API_ADD_ORGANIZATION_URL } from "../../../apiUrls";

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
    const { shouldCreateNew, name, category } = state;
    const newOrg = { name, category };

    if (shouldCreateNew) {
      this.setState({ isLoading: true }, () => {
        axios
          .post(API_ADD_ORGANIZATION_URL, newOrg)
          .then(({ data }) => {
            this.setState({ isLoading: false });

            const { _id: orgId } = data;
            this.props.history.push({
              pathname: `/organization/${orgId}/review`,
              state,
            });
          })
          .catch(() => {
            this.setState({ isLoading: false });
            swal.fire({
              type: "error",
              title: "Oops...",
              text: `${name} already exists. Please contact us directly with your request.`,
              footer: '<a href="/contact">Contact</a>',
            });
          });
      });
    } else {
      const { orgId } = state;

      this.props.history.push({
        pathname: `/organization/${orgId || state.orgId}/review`,
        state,
      });
    }
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
              text: `It seems that you've already reviewed this organisation in the last 30 days. You can review each organisation once a month. Date of last review: ${moment(
                reviewsLast30Days[0].date
              ).format("DD.MM.YYYY")}`,
              linkText: "Why can't I give a review?",
            }}
          />
        )}
      </ReviewButtonsDiv>
    );
  }
}
