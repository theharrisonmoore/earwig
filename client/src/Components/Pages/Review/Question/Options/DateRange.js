import React, { Component } from "react";
import { Map } from "immutable";
import { ErrorMessage } from "formik";

import { QuestionOptionsWrapper, StyledErrorMessage } from "../Question.style";
import CustomRangePicker from "../../../../Common/AntdComponents/DatePicker";

class DateRange extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (Map(this.props.state.review).equals(Map(nextProps.state.review))) {
      return false;
    }
    return true;
  }

  render() {
    const { handleChange } = this.props;

    return (
      <QuestionOptionsWrapper>
        <CustomRangePicker handleChange={handleChange} />
        <ErrorMessage name="review.workPeriod">
          {msg => {
            return <StyledErrorMessage>{msg.from}</StyledErrorMessage>;
          }}
        </ErrorMessage>
      </QuestionOptionsWrapper>
    );
  }
}

export default DateRange;
