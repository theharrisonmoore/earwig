import React from "react";
import { Field, FieldArray } from "formik";
import classNames from "classnames";
import commentIcon from "../../../../assets/Bitmap.svg";
import { Checkbox } from "antd";
import "antd/dist/antd.css";

import {
  QuestionWrapper,
  QuestionOptionsWrapper,
  InputWrapper
} from "./Question.style";

const CheckboxGroup = Checkbox.Group;

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
  const { questions } = props;
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

  if (type === "checklist") {
    return (
      <QuestionOptionsWrapper>
        <FieldArray
          name="questions"
          render={arrayHelpers => (
            <div>
              {options &&
                options.length > 0 &&
                options.map((option, index) => (
                  <div key={index}>
                    <Field
                      type="checkbox"
                      name={`questions[${number}]`}
                      value={option}
                      onChange={e => {
                        if (e.target.checked) {
                          if (Array.isArray(questions[number])) {
                            questions[number] = questions[number].concat(
                              option
                            );
                            console.log("inside is array", questions[number]);
                          } else {
                            questions[number] = [option];
                            console.log(
                              "outside is array111111111111111111",
                              questions[number]
                            );
                          }
                        } else {
                          const idx = questions[number].indexOf(option);
                          // const idx = `questions[${number}]`.indexOf(option);
                          questions[number].filter(q => idx !== q);
                        }
                      }}
                      checked={
                        questions[number]
                          ? questions[number].includes(option)
                          : false
                      }
                    />
                    <label>{option}</label>
                  </div>
                ))}
              <div>
                <button type="submit">Submit</button>
              </div>
            </div>
          )}
        />
      </QuestionOptionsWrapper>
    );
  }
  // if (type === "checklist") {
  //   return (
  //     <QuestionOptionsWrapper>
  //       <ul>
  //         {options.map(option => {
  //           return (
  //             <li>
  //               <Field
  //                 type="checkbox"
  //                 name={`questions[${number}]`}
  //                 id={`${option}-${number}`}
  //               />
  //               <label htmlFor={`${option}-${number}`}>{option}</label>
  //             </li>
  //           );
  //         })}
  //       </ul>
  //     </QuestionOptionsWrapper>
  //   );
  // }

  if (type === "image") {
    return (
      <QuestionOptionsWrapper>
        {/* <Field component="select" name={`questions[${number}]`}>
          {options.map(option => (
            <option value={option}>{option}</option>
          ))}
        </Field> */}
        Image uploader here
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
      <label htmlFor={id} className={`yesno options-${props.count}`}>
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
