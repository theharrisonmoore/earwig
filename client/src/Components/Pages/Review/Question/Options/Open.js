import React, { Component } from "react";
import { Input } from "antd";

import { colors } from "../../../../../theme";

import { QuestionOptionsWrapper, Options } from "../Question.style";

class Open extends Component {
  render() {
    const { props } = this;
    const { number, label, handleChange, question, state } = props;
    const { answers } = state && state;

    return (
      <QuestionOptionsWrapper>
        <Options style={{ justifyContent: "flex-end" }}>
          <Input
            name={question.number}
            value={answers[number]}
            onChange={e => handleChange(question.number, e.target.value)}
            size="large"
            placeholder={label}
            style={{
              border: `1px solid ${colors.dustyGray1}`,
              marginBottom: "0.5rem",
            }}
          />
        </Options>
      </QuestionOptionsWrapper>
    );
  }
}

export default Open;
