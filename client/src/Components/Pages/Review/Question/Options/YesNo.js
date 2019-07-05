import React, { Component } from "react";
import { Map } from "immutable";
import { ErrorMessage } from "formik";

import ModalComment from "../../../../Common/AntdComponents/ModalComment";
import Icon from "../../../../Common/Icon/Icon";
import {
  QuestionOptionsWrapper,
  InputWrapper,
  Options,
  CommentsIcon,
  StyledErrorMessage,
  StyledInput
} from "../Question.style";

class YesNo extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (Map(this.props.state.answers).equals(Map(nextProps.state.answers))) {
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
                    }}
                    checked={
                      state.answers && state.answers[question.number] === option
                        ? true
                        : false
                    }
                  />
                  <StyledInput
                    // onClick={() => {
                    //   if (typeof next === "object" && next !== null) {
                    //     let nextQ = next["yes"];
                    //     let other = next["no"];
                    //     if (
                    //       option === "No" ||
                    //       option.includes("know") ||
                    //       option.includes("need") ||
                    //       option.includes("check")
                    //     ) {
                    //       nextQ = next["no"];
                    //       other = next["yes"];
                    //     }
                    //     showNextQestion(groupId, nextQ, other, number);
                    //   }
                    // }}
                    htmlFor={`${option}-${question.number}`}
                    className={`yesno options-3`}
                  >
                    {option}
                  </StyledInput>
                </InputWrapper>
              );
            })}
          </div>
          {hasComment && (
            <ModalComment
              title="Enter you comment here"
              setFieldValue={this.props.setFieldValue}
              number={number}
              comment
              render={props => {
                return (
                  <CommentsIcon hasValue={!!props.submittedText}>
                    <Icon icon="addComment" />
                  </CommentsIcon>
                );
              }}
            />
          )}
        </Options>
        <ErrorMessage name={`questions[${number}]`}>
          {msg => <StyledErrorMessage>{msg}</StyledErrorMessage>}
        </ErrorMessage>
      </QuestionOptionsWrapper>
    );
  }
}

export default YesNo;
