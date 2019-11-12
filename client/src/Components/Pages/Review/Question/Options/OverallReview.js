import React, { Component } from "react";
import { Map } from "immutable";
import { Input } from "antd";

import { colors } from "../../../../../theme";
import { QuestionOptionsWrapper, Options } from "../Question.style";

class OverallReview extends Component {
  shouldComponentUpdate(nextProps) {
    if (Map(this.props.state.review).equals(Map(nextProps.state.review))) {
      return false;
    }
    return true;
  }

  render() {
    const { state, handleChange, label } = this.props;
    const { review } = state && state;

    return (
      <QuestionOptionsWrapper>
        <Options>
          <Input.TextArea
            name="overallReview"
            rows={4}
            style={{ border: `1px solid ${colors.inputBorder}` }}
            value={review.overallReview}
            onChange={handleChange}
            data-type="review"
            placeholder={label}
          />
        </Options>
      </QuestionOptionsWrapper>
    );
  }
}

export default OverallReview;
