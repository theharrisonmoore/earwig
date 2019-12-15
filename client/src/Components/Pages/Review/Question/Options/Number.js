import React, { Component } from "react";
import { Map } from "immutable";
import { ErrorMessage } from "formik";
import { Slider } from "antd";

import { organizations, colors } from "../../../../../theme";

import {
  QuestionOptionsWrapper,
  Options,
  StyledErrorMessage,
  SliderWrapper,
  StyledButton,
} from "../Question.style";

const marksStyle = {
  position: "absolute",
  top: "-60px",
  fontSize: "14px",
  color: "#4A4A4A",
  opacity: "0.8",
};

class Number extends Component {
  state = { clicked: false };

  shouldComponentUpdate(nextProps) {
    if (Map(this.props.state.answers).equals(Map(nextProps.state.answers))) {
      return false;
    }
    return true;
  }

  getStyle = () => {
    if (this.state.clicked) {
      return {
        border: `3px solid ${colors.profileFontColor}`,
        background: colors.profileFontColor,
        color: colors.white,
      };
    }
    return {
      border: "3px solid transparent",
    };
  };

  handleChange = (value, number) => {
    this.props.handleSliderChange(value, number);
    this.setState({ clicked: false });
  };

  render() {
    const { props } = this;
    const {
      number,
      label,
      handleSliderChange,
      state,
      category,
      question,
    } = props;
    const { answers } = state && state;
    if (!props && !props.options) {
      return null;
    }

    return (
      <QuestionOptionsWrapper>
        <Options style={{ alignItems: "center", justifyContent: "center" }}>
          {question.text.includes("parking cost") && (
            <StyledButton
              style={{ ...this.getStyle(), marginBottom: "20px" }}
              type="button"
              onClick={e => {
                e.preventDefault();
                this.setState({ clicked: true });
                // reset the slider
                handleSliderChange(undefined, number);
              }}
            >
              Don&apos;t know
            </StyledButton>
          )}
          <SliderWrapper
            visibility={answers[number] || answers[number] === 0}
            color={organizations[category].primary}
          >
            {answers[number] || answers[number] === 0 ? (
              <p>
                £<span>{answers[number]}</span> {label}
              </p>
            ) : null}

            <Slider
              tooltipVisible={false}
              value={answers[number] || 0}
              onChange={value => this.handleChange(value, number)}
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
