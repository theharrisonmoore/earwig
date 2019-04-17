import React from "react";
import { Field, FieldArray, ErrorMessage } from "formik";

import { Select, Icon, Divider } from "antd";

import Modal from "../../../Common/AntdComponents/Modal";
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
    name
  } = props.question;
  const {
    questions,
    values,
    errors,
    setFieldValue,
    agencies,
    payrolls,
    dropdownOptions
  } = props;
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
        agencies={agencies}
        payrolls={payrolls}
        dropdownOptions={dropdownOptions}
      />
    </QuestionWrapper>
  );
};

class QuestionOptions extends React.Component {
  state = {
    loading: false,
    visible: false,
    name: ""
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleChange = e => {
    this.setState({ name: e.target.value });
  };

  handleOk = () => {
    const { category } = this.props;
    this.props.setFieldValue(
      `questions[${this.props.number}]`,
      this.state.name
    );
    this.setState({ visible: false });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };
  render() {
    const { props } = this;
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
      const { dropdownOptions } = this.props;
      const newOptions = [...dropdownOptions, this.state.name];
      return (
        <QuestionOptionsWrapper>
          <Field name={`questions[${number}]`}>
            {({ field, form }) => {
              return (
                <>
                  <Modal
                    {...this.state}
                    handleOk={this.handleOk}
                    handleCancel={this.handleCancel}
                    handleChange={this.handleChange}
                  />
                  <Select
                    showSearch
                    {...field}
                    defaultValue="lucy"
                    style={{ width: "35rem" }}
                    onChange={value =>
                      form.setFieldValue(`questions[${number}]`, value)
                    }
                    dropdownRender={menu => {
                      return (
                        <div>
                          {menu}
                          <Divider style={{ margin: "4px 0" }} />
                          <div
                            onMouseDown={e => {
                              e.preventDefault();
                              return false;
                            }}
                            style={{ padding: "8px", cursor: "pointer" }}
                            onClick={this.showModal}
                          >
                            <Icon type="plus" /> Add item
                          </div>
                        </div>
                      );
                    }}
                  >
                    {dropdownOptions.map(option => (
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
          <Rater setFieldValue={props.setFieldValue} />
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
