import React from "react";
import { Field, FieldArray } from "formik";
import commentIcon from "../../../../assets/Bitmap.svg";
import { Checkbox } from "antd";
import "antd/dist/antd.css";

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
  const { questions, values } = props;
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
        questions={questions}
        values={values}
      />
    </QuestionWrapper>
  );
};

const QuestionOptions = props => {
  if (!props && !props.options) {
    return null;
  }
  const { type, options, number, category, name, questions } = props;
  if (type === "yesno" || type === "radio") {
    return (
      <QuestionOptionsWrapper>
        <div className={`choices choices-${options.length}`}>
          {options.map((option, i, arr) => {
            return (
              <Field
                component={RadioButton}
                name={`questions[${number}]`}
                id={`${option}-${number}`}
                className={`hide radio-input ${option}`}
                value={option}
                option={option}
                count={options.length}
              />
            );
          })}
        </div>
        <div className="comment-icon-box">
          <img src={commentIcon} alt="" />
        </div>
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

  if (type === "rate") {
    return (
      <QuestionOptionsWrapper>
        <div className={`choices choices-${options.length}`}>
          {options.map((option, i, arr) => {
            return (
              <Field
                component={RadioButton}
                name={`review.rate`}
                id={`${option}-${number}`}
                className={`hide radio-input ${option}`}
                value={i + 1}
                option={option}
                count={options.length}
              />
            );
          })}
        </div>
      </QuestionOptionsWrapper>
    );
  }

  if (type === "overallReview") {
    return (
      <QuestionOptionsWrapper>
        <Field
          component="textarea"
          name={`review.overallReview`}
          id={`${number}`}
          placeholder="per timesheet"
        />
      </QuestionOptionsWrapper>
    );
  }

  if (type === "checklist") {
    const { values } = props;
    return (
      <QuestionOptionsWrapper>
        <FieldArray
          name="checklist"
          render={arrayHelpers => (
            <div>
              {options &&
                options.length > 0 &&
                options.map((option, index) => (
                  <div key={index}>
                    <Field
                      id={`${option}-${number}`}
                      type="checkbox"
                      name={`checklist.${index}`}
                      value={option}
                      onChange={e => {
                        if (e.target.checked) arrayHelpers.push(option);
                        else {
                          const idx = values.checklist.indexOf(option);
                          arrayHelpers.remove(idx);
                        }
                      }}
                      checked={values.checklist.includes(option)}
                    />
                    <label htmlFor={`${option}-${number}`}>{option}</label>
                  </div>
                ))}
            </div>
          )}
        />
      </QuestionOptionsWrapper>
    );
  }

  if (type === "image") {
    return <QuestionOptionsWrapper>Image uploader here</QuestionOptionsWrapper>;
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
  return (
    <InputWrapper option={props.option}>
      <input
        name={name}
        id={id}
        type="radio"
        value={id} // could be something else for output?
        onChange={onChange}
        onBlur={onBlur}
        className="radio-button"
        {...props}
      />
      <label htmlFor={id} className={`yesno options-${props.count}`}>
        {props.option}
      </label>
    </InputWrapper>
  );
};

export default Question;
