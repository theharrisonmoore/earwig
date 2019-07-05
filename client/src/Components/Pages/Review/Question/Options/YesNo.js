import React, { Component } from "react";
import { Map } from "immutable";
import { Input } from "antd";

import {
  QuestionOptionsWrapper,
  InputWrapper,
  Options,
  StyledInput
} from "../Question.style";

class YesNo extends Component {
  state = { showComment: false };
  shouldComponentUpdate(nextProps, nextState) {
    if (
      Map(this.props.state.answers).equals(Map(nextProps.state.answers)) &&
      Map(this.props.state.comments).equals(Map(nextProps.state.comments))
    ) {
      return false;
    }
    return true;
  }
  render() {
    const {
      options,
      number,
      category,
      hasComment,
      groupId,
      next,
      showNextQestion,
      handleChange,
      question,
      state
    } = this.props;

    return (
      <QuestionOptionsWrapper>
        <Options options={options.length}>
          <div className={`choices choices-${options.length}`}>
            {options.map((option, i, arr) => {
              return (
                <InputWrapper
                  option={option}
                  orgType={category}
                  options={question.options.length}
                  key={option}
                >
                  <input
                    name={question.number}
                    id={`${option}-${question.number}`}
                    type="radio"
                    value={option}
                    className="radio-button"
                    // onChange={handleChange}
                    onChange={e => {
                      if (typeof next === "object" && next !== null) {
                        let nextQ = next["yes"];
                        let other = next["no"];
                        if (
                          option === "No" ||
                          option.includes("know") ||
                          option.includes("need") ||
                          option.includes("check")
                        ) {
                          nextQ = next["no"];
                          other = next["yes"];
                        }
                        showNextQestion(groupId, nextQ, other, number);
                      }
                      handleChange(e);

                      // toggle showCommetn on and off (only show it when asnwer is "No")
                      if (e.target.value === "No") {
                        this.setState({
                          showComment: true
                        });
                      } else {
                        this.setState({
                          showComment: false
                        });
                      }
                    }}
                    checked={
                      state.answers && state.answers[question.number] === option
                        ? true
                        : false
                    }
                  />
                  <StyledInput
                    htmlFor={`${option}-${question.number}`}
                    className={`yesno options-3`}
                  >
                    {option}
                  </StyledInput>
                </InputWrapper>
              );
            })}
          </div>
          {hasComment && this.state.showComment && (
            <Input.TextArea
              placeholder="Add a comment..."
              onChange={this.props.handleReviewChange}
              data-type="comments"
              value={state.comments[question.number]}
              name={question.number}
            />
          )}
        </Options>
      </QuestionOptionsWrapper>
    );
  }
}

export default YesNo;
