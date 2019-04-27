import React from "react";

import { Field, FieldArray, ErrorMessage } from "formik";

import {
  Select,
  Icon,
  Divider,
  Input,
  Rate,
  InputNumber,
  CheckBox,
  Row,
  Col
} from "antd";

import ModalComment from "../../../Common/AntdComponents/ModalComment";
import CustomRangePicker from "../../../Common/AntdComponents/DatePicker";
import commentIcon from "../../../../assets/comment-icon.svg";

import UploadImage from "./UploadPhoto";

import { colors, organizations } from "../../../../theme";
import { isMobile } from "../../../../helpers";

import {
  QuestionWrapper,
  QuestionOptionsWrapper,
  InputWrapper,
  QText,
  HintText,
  Options,
  CommentsIcon,
  StyledErrorMessage,
  StyledInput
} from "./Question.style";

const Option = Select.Option;

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
    hasComment
  } = props.question;
  const { questions, values, errors, setFieldValue, dropdownOptions } = props;
  return (
    <QuestionWrapper>
      <QText>{text}</QText>
      <HintText>{hintText}</HintText>
      <QuestionOptions
        type={type}
        options={options}
        number={number}
        category={category ? category : props.category}
        name={name}
        questions={questions}
        values={values}
        errors={errors}
        setFieldValue={setFieldValue}
        dropdownOptions={dropdownOptions}
        label={label}
        hasComment={hasComment}
      />
    </QuestionWrapper>
  );
};

class QuestionOptions extends React.Component {
  render() {
    const { props } = this;
    if (!props && !props.options) {
      return null;
    }
    const { type, options, number, category, label, hasComment } = props;
    if (type === "yesno" || type === "radio") {
      return (
        <QuestionOptionsWrapper>
          <Options options={options.length}>
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
            {hasComment && (
              <ModalComment
                title="Enter you comment here"
                setFieldValue={props.setFieldValue}
                number={number}
                comment
                render={props => {
                  return (
                    <CommentsIcon hasValue={!!props.text}>
                      <img src={commentIcon} alt="" />
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

    if (type === "open") {
      return (
        <QuestionOptionsWrapper>
          <Options style={{ justifyContent: "flex-end" }}>
            <Field name={`questions[${number}]`}>
              {({ field, form }) => (
                <Input
                  {...field}
                  // {...form}
                  size="large"
                  placeholder={label}
                  style={{
                    border: `1px solid ${colors.dustyGray1}`,
                    marginBottom: "0.5rem"
                  }}
                />
              )}
            </Field>
            {hasComment && (
              <ModalComment
                title="Enter you comment here"
                setFieldValue={props.setFieldValue}
                number={number}
                comment
                render={props => {
                  return (
                    <CommentsIcon hasValue={!!props.text}>
                      <img src={commentIcon} alt="" />
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

    if (type === "number") {
      return (
        <QuestionOptionsWrapper>
          <Options style={{ alignItems: "center" }}>
            <Field name={`questions[${number}]`} type="number">
              {({ field, form }) => (
                <InputNumber
                  {...field}
                  // {...form}
                  onChange={value =>
                    props.setFieldValue(`questions[${number}]`, value)
                  }
                  style={{
                    border: `1px solid ${colors.dustyGray1}`,
                    width: "12rem",
                    height: "70px",
                    lineHeight: "70px"
                  }}
                  size="large"
                  placeholder={`£       ${label}`}
                />
              )}
            </Field>
            {hasComment && (
              <ModalComment
                title="Enter you comment here"
                setFieldValue={props.setFieldValue}
                number={number}
                comment
                render={props => {
                  return (
                    <CommentsIcon hasValue={!!props.text}>
                      <img src={commentIcon} alt="" />
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

    if (type === "dropdown") {
      const { dropdownOptions } = this.props;
      let newOptions = [...dropdownOptions];
      return (
        <QuestionOptionsWrapper>
          <Options>
            <Field name={`questions[${number}]`}>
              {({ field, form }) => {
                return (
                  <>
                    <Select
                      showSearch
                      placeholder={label}
                      style={{
                        border: `1px solid ${colors.dustyGray1}`
                      }}
                      onChange={value =>
                        form.setFieldValue(`questions[${number}]`, value)
                      }
                      dropdownRender={menu => {
                        return (
                          <div>
                            {menu}
                            <Divider style={{ margin: "4px 0" }} />
                            <ModalComment
                              title={`Add a new ${category}`}
                              setFieldValue={props.setFieldValue}
                              number={number}
                              render={renderProps => {
                                newOptions = [...newOptions, renderProps.text];
                                return (
                                  <div
                                    onMouseDown={e => {
                                      e.preventDefault();
                                      return false;
                                    }}
                                    style={{
                                      padding: "8px",
                                      cursor: "pointer"
                                    }}
                                  >
                                    <Icon type="plus" /> Add item
                                  </div>
                                );
                              }}
                            />
                          </div>
                        );
                      }}
                    >
                      {newOptions.map(option => (
                        <Option value={option} key={option}>
                          {option}
                        </Option>
                      ))}
                    </Select>
                  </>
                );
              }}
            </Field>
            {hasComment && (
              <ModalComment
                title="Enter you comment here"
                setFieldValue={props.setFieldValue}
                number={number}
                comment
                render={props => {
                  return (
                    <CommentsIcon hasValue={!!props.text}>
                      <img src={commentIcon} alt="" />
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

    if (type === "overallReview") {
      return (
        <QuestionOptionsWrapper>
          <Options>
            <Field name={`review.overallReview`}>
              {({ field, form }) => (
                <Input.TextArea
                  rows={4}
                  {...field}
                  // {...form}
                  style={{ border: `1px solid ${colors.inputBorder}` }}
                />
              )}
            </Field>
          </Options>
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
          <Options>
            <FieldArray
              name={`questions[${number}]`}
              render={arrayHelpers => (
                <div>
                  {options &&
                    options.length > 0 &&
                    options.map((option, index) => (
                      <div key={option}>
                        <Field
                          id={`${option}-${number}`}
                          type="checkbox"
                          name={`questions[${number}].${index}`}
                          value={option}
                          onChange={e => {
                            if (e.target.checked) arrayHelpers.push(option);
                            else {
                              const idx = values.questions[number].indexOf(
                                option
                              );
                              arrayHelpers.remove(idx);
                            }
                          }}
                          checked={values.questions[number].includes(option)}
                        />
                        <label htmlFor={`${option}-${number}`}>{option}</label>
                      </div>
                    ))}
                </div>
              )}
            />
            {hasComment && (
              <ModalComment
                title="Enter you comment here"
                setFieldValue={props.setFieldValue}
                number={number}
                comment
                render={props => {
                  return (
                    <CommentsIcon hasValue={!!props.text}>
                      <img src={commentIcon} alt="" />
                    </CommentsIcon>
                  );
                }}
                style={{ alignSelf: "flex-end" }}
              />
            )}
          </Options>
          <ErrorMessage name="checklist">
            {msg => <StyledErrorMessage>{msg}</StyledErrorMessage>}
          </ErrorMessage>
        </QuestionOptionsWrapper>
      );
    }

    if (type === "image") {
      return (
        <QuestionOptionsWrapper>
          <UploadImage setFieldValue={props.setFieldValue} number={number} />
          <ErrorMessage name={`questions[${number}]`}>
            {msg => {
              return <StyledErrorMessage>{msg}</StyledErrorMessage>;
            }}
          </ErrorMessage>
        </QuestionOptionsWrapper>
      );
    }

    if (type === "dateRange") {
      return (
        <QuestionOptionsWrapper>
          <CustomRangePicker setFieldValue={props.setFieldValue} />
          <ErrorMessage name="review.workPeriod">
            {msg => {
              return <StyledErrorMessage>{msg.from}</StyledErrorMessage>;
            }}
          </ErrorMessage>
        </QuestionOptionsWrapper>
      );
    }

    if (type === "rate") {
      return (
        <QuestionOptionsWrapper>
          <Field name="review.rate">
            {({ field, form }) => (
              <Rate
                {...field}
                tooltips={options}
                onChange={value => props.setFieldValue("review.rate", value)}
                style={{
                  color: `${organizations[category].primary}`,
                  fontSize: `${isMobile(window.innerWidth) ? "2rem" : "3rem"}`
                }}
              />
            )}
          </Field>
          <ErrorMessage name="review.rate">
            {msg => <StyledErrorMessage>{msg}</StyledErrorMessage>}
          </ErrorMessage>
        </QuestionOptionsWrapper>
      );
    }

    return null;
  }
}

const RadioButton = ({
  field: { name, value, onChange, onBlur },
  id,
  label,
  className,
  ...props
}) => {
  return (
    <InputWrapper
      className="test"
      option={props.option}
      orgType={props.category}
      options={props.count}
    >
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
      <StyledInput htmlFor={id} className={`yesno options-${props.count}`}>
        {props.option}
      </StyledInput>
    </InputWrapper>
  );
};

export default Question;
