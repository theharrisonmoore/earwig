import React, { Component } from "react";
// import { Map } from "immutable";
import { Rate } from "antd";

import { QuestionOptionsWrapper, StyledErrorMessage } from "../Question.style";
import { organizations } from "../../../../../theme";
import { isMobile } from "../../../../../helpers";

class CustomRate extends Component {
  state = { rate: 0, hoverRate: undefined };
  // Plase leave this commented code for now.
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (Map(this.props.state.review).equals(Map(nextProps.state.review))) {
  //     return false;
  //   }
  //   return true;
  // }

  setRateValue = value => {
    this.setState({ rate: value });
    this.props.handleChange(value);
  };

  handleHoverRate = value => {
    this.setState({ hoverRate: value });
  };

  render() {
    const { rate, hoverRate } = this.state;
    const {
      options,
      category,
      state: { review, errors }
    } = this.props;

    const rateValue = hoverRate || rate;

    return (
      <QuestionOptionsWrapper>
        <Rate
          onChange={value => this.setRateValue(value)}
          style={{
            color: `${organizations[category].primary}`,
            fontSize: `${isMobile(window.innerWidth) ? "2rem" : "3rem"}`
          }}
          onHoverChange={this.handleHoverRate}
          value={review.rate}
          onBlur={this.props.runValidation}
        />
        <div style={{ dispay: "inline-block" }}>
          {options.map((option, index) => (
            <span
              style={{
                color: `${
                  index < rateValue
                    ? organizations[category && category].primary
                    : "#e8e8e8"
                }`,
                fontWeight: `${index === rateValue - 1 ? "900" : "500"}`,
                fontSize: `${
                  isMobile(window.innerWidth) ? "0.6rem" : "0.7rem"
                }`,
                width: `${isMobile(window.innerWidth) ? "32px" : "48px"}`,
                display: "inline-block",
                textAlign: "center",
                marginRight: "8px"
              }}
            >
              {option}
            </span>
          ))}
        </div>
        {errors && errors.review && errors.review.workPeriod.from && (
          <StyledErrorMessage>{errors.review.rate}</StyledErrorMessage>
        )}
      </QuestionOptionsWrapper>
    );
  }
}

export default CustomRate;