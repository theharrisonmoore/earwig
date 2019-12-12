import React, { Component } from "react";
import { Checkbox } from "antd";

import { QuestionOptionsWrapper, StyledErrorMessage } from "../Question.style";
import CustomRangePicker from "../../../../Common/AntdComponents/DatePicker";

class DateRange extends Component {
  state = {
    isCurrentlyWorking: false,
  };

  handleCheckBox = () => {
    this.setState(prevState => ({
      isCurrentlyWorking: !prevState.isCurrentlyWorking,
    }));
  };

  getCheckboxText = category => {
    const text = {
      agency: "I’m using them right now",
      payroll: "I’m using them right now",
      worksite: "I’m on this site right now",
      company: "I’m working for them right now",
    };

    return text[category];
  };

  render() {
    const {
      handleChange,
      category,
      state: { errors },
    } = this.props;

    const { isCurrentlyWorking } = this.state;

    return (
      <QuestionOptionsWrapper>
        <Checkbox
          style={{
            padding: "20px 0 10px",
          }}
          onChange={this.handleCheckBox}
          checked={this.state.isCurrentlyWorking}
        >
          <strong>{this.getCheckboxText(category)}</strong>
        </Checkbox>
        <CustomRangePicker
          handleChange={handleChange}
          {...this.props.state}
          category={category}
          isCurrentlyWorking={isCurrentlyWorking}
        />
        {!!errors && !!errors.review && !!errors.review.lastUse && (
          <StyledErrorMessage>{errors.review.lastUse}</StyledErrorMessage>
        )}
      </QuestionOptionsWrapper>
    );
  }
}

export default DateRange;
