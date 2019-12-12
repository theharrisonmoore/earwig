import React from "react";

import { InputWrapper, StyledInput } from "../Question.style";

const YesNoOption = props => {
  const {
    option,
    category,
    question,
    isChecked,
    handleChange,
    handleClick,
  } = props;
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
        onChange={handleChange}
        onClick={handleClick}
        checked={isChecked}
      />
      <StyledInput
        htmlFor={`${option}-${question.number}`}
        className="yesno options-3"
      >
        {option}
      </StyledInput>
    </InputWrapper>
  );
};

export default YesNoOption;
