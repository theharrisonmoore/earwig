import React, { Component } from "react";
import { Map } from "immutable";
import { ErrorMessage } from "formik";
import { Slider } from "antd";

import { organizations } from "../../../../../theme";

import {
  QuestionOptionsWrapper,
  Options,
  StyledErrorMessage,
  SliderWrapper,
} from "../Question.style";

const marksStyle = {
  position: "absolute",
  top: "-60px",
  fontSize: "14px",
  color: "#4A4A4A",
  opacity: "0.8",
};

class Number extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (Map(this.props.state.answers).equals(Map(nextProps.state.answers))) {
      return false;
    }
    return true;
  }

  render() {
    const { props } = this;
    const { number, label, handleSliderChange, state, category } = props;
    const { answers } = state && state;
    if (!props && !props.options) {
      return null;
    }

    return (
      <QuestionOptionsWrapper>
        <Options style={{ alignItems: "center" }}>
          <SliderWrapper
            visibility={answers[number]}
            color={organizations[category].primary}
          >
            <p>
              £
              <span
                style={{
                  color: organizations[category].primary,
                  fontWeight: "700",
                }}
              >
                {answers[number]}
              </span>{" "}
              {label}
            </p>

            <Slider
              tooltipVisible={false}
              value={answers[number]}
              onChange={value => handleSliderChange(value, number)}
              style={{ width: "100%" }}
              step={0.5}
              marks={{
                0: {
                  style: marksStyle,
                  label: <strong>£0</strong>,
                },
                10: {
                  style: marksStyle,
                  label: <strong>£10</strong>,
                },
                20: {
                  style: marksStyle,
                  label: <strong>£20</strong>,
                },
                30: {
                  style: marksStyle,
                  label: <strong>£30</strong>,
                },
                40: {
                  style: marksStyle,
                  label: <strong>£40</strong>,
                },
                50: {
                  style: marksStyle,
                  label: <strong>£50+</strong>,
                },
              }}
              max={50}
            />
          </SliderWrapper>
        </Options>
        <ErrorMessage name={`questions[${number}]`}>
          {msg => <StyledErrorMessage>{msg}</StyledErrorMessage>}
        </ErrorMessage>
      </QuestionOptionsWrapper>
    );
  }
}

export default Number;
