import React from "react";

import { Field, FieldArray, ErrorMessage } from "formik";

import { Select, Icon, Divider, Input, Rate, InputNumber } from "antd";

import Modal from "../../../Common/AntdComponents/Modal";
import ModalComment from "../../../Common/AntdComponents/ModalComment";
import commentIcon from "../../../../assets/comment-icon.svg";
import Rater from "../../../Common/Rater";

import UploadImage from "./UploadPhoto";

import { colors, organizations } from "../../../../theme";

import {
  QuestionWrapper,
  QuestionOptionsWrapper,
  InputWrapper,
  QText,
  HintText,
  Options,
  CommentsIcon,
  StyledErrorMessage,
  Input as StyledInput
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
    label
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
      />
    </QuestionWrapper>
  );
};

class QuestionOptions extends React.Component {
  state = {
    name: ""
  };

  // showModal = () => {
  //   this.setState({
  //     visible: true
  //   });
  // };

  // handleChange = e => {
  //   this.setState({ name: e.target.value });
  // };

  // handleOk = () => {
  //   this.props.setFieldValue(
  //     `questions[${this.props.number}]`,
  //     this.state.name
  //   );
  //   this.setState({ visible: false });
  // };

  // handleCancel = () => {
  //   this.setState({ visible: false });
  // };

  render() {
    console.log(this.props);
    const { props } = this;
    if (!props && !props.options) {
      return null;
    }
    const { type, options, number, category, label } = props;
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
            {/* <ModalComment setFieldValue={props.setFieldValue} number={number} /> */}
            <ModalComment
              setFieldValue={props.setFieldValue}
              number={number}
              comment
              render={props => {
                return (
                  <CommentsIcon hasValue={!!props.name}>
                    <img src={commentIcon} alt="" />
                  </CommentsIcon>
                );
              }}
            />
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
          {/* <Field
            type="text"
            name={`questions[${number}]`}
            id={`${number}`}
            placeholder={label}
          /> */}
          <Field name={`questions[${number}]`}>
            {({ field, form }) => (
              <Input
                {...field}
                {...form}
                size="large"
                placeholder={label}
                style={{
                  border: `1px solid ${colors.dustyGray1}`
                }}
              />
            )}
          </Field>
          <ErrorMessage name={`questions[${number}]`}>
            {msg => <StyledErrorMessage>{msg}</StyledErrorMessage>}
          </ErrorMessage>
        </QuestionOptionsWrapper>
      );
    }

    if (type === "number") {
      return (
        <QuestionOptionsWrapper>
          {/* <Field
            type="number"
            name={`questions[${number}]`}
            id={`${number}`}
            placeholder={label}
          /> */}
          <Field name={`questions[${number}]`} type="number">
            {({ field, form }) => (
              <InputNumber
                {...field}
                {...form}
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
          <Field name={`questions[${number}]`}>
            {({ field, form }) => {
              return (
                <>
                  {/* <Modal
                    {...this.state}
                    handleOk={this.handleOk}
                    handleCancel={this.handleCancel}
                    handleChange={this.handleChange}
                  /> */}

                  <Select
                    showSearch
                    // {...field}
                    placeholder={label}
                    // defaultValue={`Select a person`}
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
                            setFieldValue={props.setFieldValue}
                            number={number}
                            render={renderProps => {
                              newOptions = [...newOptions, renderProps.name];
                              console.log("propsy", renderProps.name);
                              return (
                                <div
                                  onMouseDown={e => {
                                    e.preventDefault();
                                    return false;
                                  }}
                                  style={{ padding: "8px", cursor: "pointer" }}
                                  // onClick={this.showModal}
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
          <ErrorMessage name={`questions[${number}]`}>
            {msg => <StyledErrorMessage>{msg}</StyledErrorMessage>}
          </ErrorMessage>
        </QuestionOptionsWrapper>
      );
    }

    if (type === "overallReview") {
      return (
        <QuestionOptionsWrapper>
          <Field name={`review.overallReview`}>
            {({ field, form }) => (
              <Input.TextArea
                rows={4}
                {...field}
                {...form}
                style={{ border: `1px solid ${colors.inputBorder}` }}
              />
            )}
          </Field>
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
          <Field name="review.rate">
            {({ field, form }) => (
              <Rate
                {...field}
                {...form}
                tooltips={options}
                onChange={value => props.setFieldValue("review.rate", value)}
                style={{
                  color: `${organizations[category].primary}`,
                  fontSize: "3rem"
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
      <StyledInput htmlFor={id} className={`yesno options-${props.count}`}>
        {props.option}
      </StyledInput>
    </InputWrapper>
  );
};

export default Question;
