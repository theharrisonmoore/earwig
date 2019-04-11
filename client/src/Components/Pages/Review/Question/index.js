import React from "react";
import { Field } from "formik";
import classNames from "classnames";
import styled from "styled-components";

import {
  QuestionWrapper,
  QuestionOptionsWrapper,
  InputWrapper
} from "./Question.style";

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
    name
  } = props.question;
  return (
    <QuestionWrapper>
      <p className="text">{text}</p>
      <p className="hint-text">{hintText}</p>
      <QuestionOptions
        type={type}
        options={options}
        number={number}
        category={category}
        name={name}
      />
    </QuestionWrapper>
  );
};

const QuestionOptions = props => {
  if (!props) {
    return null;
  }
  const { type, options, number, category, name } = props;
  if (type === "yesno") {
    return (
      <QuestionOptionsWrapper>
        {options.map(option => {
          return (
            <Field
              component={RadioButton}
              name={`questions[${number}]`}
              id={`${option}-${number}`}
              className={`hide radio-input ${option}`}
              value={option}
              option={option}
            />
          );
        })}
      </QuestionOptionsWrapper>
    );
  }

  if (type === "open") {
    return (
      <QuestionOptionsWrapper>
        <Field
          type="text"
          name={`questions[${number}]`}
          id={`${number}`}
          placeholder="John Doe"
        />
      </QuestionOptionsWrapper>
    );
  }

  if (type === "number") {
    return (
      <QuestionOptionsWrapper>
        <Field
          type="number"
          name={`questions[${number}]`}
          id={`${number}`}
          placeholder="per timesheet"
        />
      </QuestionOptionsWrapper>
    );
  }

  if (type === "dropdown") {
    return (
      <QuestionOptionsWrapper>
        <Field component="select" name={`questions[${number}]`}>
          {options.map(option => (
            <option value={option}>{option}</option>
          ))}
        </Field>
      </QuestionOptionsWrapper>
    );
  }

  return null;
};

// Radio input
const RadioButton = ({
  field: { name, value, onChange, onBlur },
  id,
  label,
  className,
  ...props
}) => {
  console.log(props, id);
  return (
    <InputWrapper option={props.option}>
      <input
        name={name}
        id={id}
        type="radio"
        value={id} // could be something else for output?
        onChange={onChange}
        onBlur={onBlur}
        className={classNames("radio-button")}
        {...props}
      />
      <label htmlFor={id} className="yesno">
        {props.option}
      </label>
    </InputWrapper>
  );
};

// Radio group
const RadioButtonGroup = ({
  value,
  error,
  touched,
  id,
  label,
  className,
  children
}) => {
  const classes = classNames(
    "input-field",
    {
      "is-success": value || (!error && touched), // handle prefilled or user-filled
      "is-error": !!error && touched
    },
    className
  );

  return <>{children}</>;
};

export default Question;
