import React, { Component } from "react";
import { Map } from "immutable";

import { QuestionOptionsWrapper, StyledErrorMessage } from "../Question.style";
import CustomRangePicker from "../../../../Common/AntdComponents/DatePicker";

class DateRange extends Component {
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (Map(this.props.state.review).equals(Map(nextProps.state.review))) {
  //     return false;
  //   }
  //   return true;
  // }

  render() {
    const {
      handleChange,
      state: { errors }
    } = this.props;

    return (
      <QuestionOptionsWrapper>
        <CustomRangePicker handleChange={handleChange} {...this.props.state} />
        {errors && errors.review && errors.review.workPeriod.from && (
          <StyledErrorMessage>
            {errors.review.workPeriod.from}
          </StyledErrorMessage>
        )}
      </QuestionOptionsWrapper>
    );
  }
}

export default DateRange;
