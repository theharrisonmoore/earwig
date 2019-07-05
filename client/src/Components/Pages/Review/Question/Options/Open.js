import React, { Component } from "react";
import { ErrorMessage } from "formik";
import { Input } from "antd";

import { colors } from "../../../../../theme";

import {
  QuestionOptionsWrapper,
  Options,
  StyledErrorMessage
} from "../Question.style";

class Open extends Component {
  render() {
    const { props } = this;
    const { number, label, handleChange, question, state } = props;
    let { answers } = state && state;

    return (
      <QuestionOptionsWrapper>
        <Options style={{ justifyContent: "flex-end" }}>
          <Input
            name={question.number}
            value={answers[number]}
            onChange={handleChange}
            size="large"
            placeholder={label}
            style={{
              border: `1px solid ${colors.dustyGray1}`,
              marginBottom: "0.5rem"
            }}
          />
        </Options>
        <ErrorMessage name={`questions[${number}]`}>
          {msg => <StyledErrorMessage>{msg}</StyledErrorMessage>}
        </ErrorMessage>
      </QuestionOptionsWrapper>
    );
  }
}

export default Open;
