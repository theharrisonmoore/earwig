import React from "react";
import { Field, FieldArray, ErrorMessage } from "formik";
import commentIcon from "../../../../assets/comment-icon.svg";
import Rater from "../../../Common/Rater";

import UploadImage from "./UploadPhoto";

import {
  QuestionWrapper,
  QuestionOptionsWrapper,
  InputWrapper,
  QText,
  HintText,
  Options,
  CommentsIcon,
  StyledErrorMessage,
  Input
} from "./Question.style";

import { organizations } from "../../../../theme";

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
  const { questions, values, errors, setFieldValue } = props;
  return (
    <QuestionWrapper>
      <QText>{text}</QText>
      <HintText>{hintText}</HintText>
      <QuestionOptions
        type={type}
        options={options}
        number={number}
        category={category}
        name={name}
        questions={questions}
        values={values}
        errors={errors}
        setFieldValue={setFieldValue}
      />
    </QuestionWrapper>
  );
};

const QuestionOptions = props => {
  if (!props && !props.options) {
    return null;
  }
  const { type, options, number, category } = props;
  if (type === "yesno" || type === "radio") {
    return (
      <QuestionOptionsWrapper>
        <Options>
          <div className={`choices choices-${options.length}`}>
            {options.map((option, i, arr) => {
              return (
                <Field
                  key={option}
                  component={RadioButton}
                  name={`questions[${number}]`}
                  id={`${option}-${number}`}
                  className={`hide radio-input ${option}`}
                  value={option}
                  option={option}
                  count={options.length}
                  category={category}
                />
              );
            })}
          </div>
          <CommentsIcon>
            <img src={commentIcon} alt="" />
          </CommentsIcon>
        </Options>
        <ErrorMessage name={`questions[${number}]`}>
          {msg => <StyledErrorMessage>{msg}</StyledErrorMessage>}
        </ErrorMessage>
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
        <ErrorMessage name={`questions[${number}]`}>
          {msg => <StyledErrorMessage>{msg}</StyledErrorMessage>}
        </ErrorMessage>
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
        <ErrorMessage name={`questions[${number}]`}>
          {msg => <StyledErrorMessage>{msg}</StyledErrorMessage>}
        </ErrorMessage>
      </QuestionOptionsWrapper>
    );
  }

  if (type === "dropdown") {
    return (
      <QuestionOptionsWrapper>
        <Field component="select" name={`questions[${number}]`}>
          {options.map(option => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </Field>
        <ErrorMessage name={`questions[${number}]`}>
          {msg => <StyledErrorMessage>{msg}</StyledErrorMessage>}
        </ErrorMessage>
      </QuestionOptionsWrapper>
    );
  }

  if (type === "overallReview") {
    return (
      <QuestionOptionsWrapper>
        <Field
          component="textarea"
          col="20"
          row="30"
          name={`review.overallReview`}
          id={`${number}`}
          placeholder="per timesheet"
        />
        <ErrorMessage name={`review.overallReview`}>
          {msg => <StyledErrorMessage>{msg}</StyledErrorMessage>}
        </ErrorMessage>
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
                  <div key={option}>
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
        <ErrorMessage name="checklist">
          {msg => <StyledErrorMessage>{msg}</StyledErrorMessage>}
        </ErrorMessage>
      </QuestionOptionsWrapper>
    );
  }

  if (type === "image") {
    return (
      <QuestionOptionsWrapper>
        <UploadImage setFieldValue={props.setFieldValue} />
      </QuestionOptionsWrapper>
    );
  }

  if (type === "rate") {
    return (
      <QuestionOptionsWrapper>
        <Rater setFieldValue={props.setFieldValue} />;
      </QuestionOptionsWrapper>
    );
  }

  return null;
};

const RadioButton = ({
  field: { name, value, onChange, onBlur },
  id,
  label,
  className,
  ...props
}) => {
  return (
    <InputWrapper option={props.option} orgType={props.category}>
      <input
        name={name}
        id={id}
        type="radio"
        value={id}
        onChange={onChange}
        onBlur={onBlur}
        className="radio-button"
        {...props}
      />
      <Input htmlFor={id} className={`yesno options-${props.count}`}>
        {props.option}
      </Input>
    </InputWrapper>
  );
};

export default Question;
