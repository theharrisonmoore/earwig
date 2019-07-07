import React, { Component } from "react";
import { Map } from "immutable";
import { ErrorMessage } from "formik";
import { Input } from "antd";

import { colors } from "../../../../../theme";
import {
  QuestionOptionsWrapper,
  Options,
  StyledErrorMessage
} from "../Question.style";

class OverallReview extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (Map(this.props.state.review).equals(Map(nextProps.state.review))) {
      return false;
    }
    return true;
  }
  render() {
    const { state, handleChange } = this.props;
    let { review } = state && state;

    return (
      <QuestionOptionsWrapper>
        <Options>
          <Input.TextArea
            name={"overallReview"}
            rows={4}
            style={{ border: `1px solid ${colors.inputBorder}` }}
            value={review.overallReview}
            onChange={handleChange}
            data-type="review"
          />
        </Options>
        <ErrorMessage name={`review.overallReview`}>
          {msg => <StyledErrorMessage>{msg}</StyledErrorMessage>}
        </ErrorMessage>
      </QuestionOptionsWrapper>
    );
  }
}

export default OverallReview;
