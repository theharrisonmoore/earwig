import React from "react";

import { QuestionWrapper, QText, HintText } from "./Question.style";

import QuestionOptions from "./Options";

const Question = props => {
  if (!props) {
    return null;
  }

  const {
    text,
    hintText,
    options,
    number,
    type,
    category,
    name,
    label,
    hasComment,
    next
  } = props.question;
  const {
    questions,
    values,
    errors,
    setFieldValue,
    dropdownOptions,
    showNextQestion,
    groupId,
    handleChange,
    handleSliderChange
  } = props;

  return (
    <QuestionWrapper>
      <QText>{text}</QText>
      <HintText>{hintText}</HintText>
      <QuestionOptions
        type={type}
        options={options}
        groupId={groupId}
        showNextQestion={showNextQestion}
        next={next}
        number={number}
        category={category}
        name={name}
        questions={questions}
        values={values}
        errors={errors}
        setFieldValue={setFieldValue}
        dropdownOptions={dropdownOptions}
        label={label}
        hasComment={hasComment}
        handleChange={handleChange}
        handleSliderChange={handleSliderChange}
        question={props.question}
        state={props.state}
        runValidation={props.runValidation}
      />
    </QuestionWrapper>
  );
};

export default Question;
