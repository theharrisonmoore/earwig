import React from "react";

import QuestionOptions from "./Options";
import PopoverComponent from "./../../../Common/Popover";
import { QuestionWrapper, QText, HintText } from "./Question.style";

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

  const popoverOptions = {
    text:
      "We’re asking this because it will be useful to track over time how much agencies are paying workers",
    linkText: "Why are we asking this?"
  };

  return (
    <QuestionWrapper>
      <QText>{text}</QText>
      <HintText>{hintText}</HintText>
      {text === "What hourly rate were you paid?" && (
        <PopoverComponent category={category} popoverOptions={popoverOptions} />
      )}
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
        handleReviewChange={props.handleReviewChange}
      />
    </QuestionWrapper>
  );
};

export default Question;
