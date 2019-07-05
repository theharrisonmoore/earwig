import React, { Component } from "react";
import { Map } from "immutable";
import { ErrorMessage } from "formik";

import { QuestionOptionsWrapper, StyledErrorMessage } from "../Question.style";
import UploadImage from "../UploadPhoto";

class Image extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (Map(this.props.state.answers).equals(Map(nextProps.state.answers))) {
      return false;
    }
    return true;
  }

  render() {
    const { handleSliderChange, number } = this.props;

    return (
      <QuestionOptionsWrapper>
        <UploadImage handleSliderChange={handleSliderChange} number={number} />
        <ErrorMessage name={`questions[${number}]`}>
          {msg => {
            return <StyledErrorMessage>{msg}</StyledErrorMessage>;
          }}
        </ErrorMessage>
      </QuestionOptionsWrapper>
    );
  }
}

export default Image;
