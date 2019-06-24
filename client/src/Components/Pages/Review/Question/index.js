import React from "react";

import { Field, FieldArray, ErrorMessage } from "formik";

import {
  Select,
  Icon as AntdIcon,
  Divider,
  Input,
  Rate,
  InputNumber,
  Checkbox,
  Popover,
  Slider
} from "antd";
import ModalComment from "../../../Common/AntdComponents/ModalComment";
import CustomRangePicker from "../../../Common/AntdComponents/DatePicker";

import UploadImage from "./UploadPhoto";

import { colors, organizations } from "../../../../theme";
import { isMobile } from "../../../../helpers";

import Icon from "./../../../Common/Icon/Icon";

import {
  QuestionWrapper,
  QuestionOptionsWrapper,
  InputWrapper,
  QText,
  HintText,
  Options,
  CommentsIcon,
  StyledErrorMessage,
  StyledInput,
  StyledButton,
  StyledCheckList,
  PopoverLink,
  SliderWrapper,
  PopoverDiv,
  PopoverText,
  PopoverBtn
} from "./Question.style";

const marksStyle = {
  position: "absolute",
  top: "-60px",
  fontSize: "14px",
  color: "#4A4A4A",
  opacity: "0.8"
};

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
    groupId
  } = props;

  return (
    <QuestionWrapper>
      <QText>{text}</QText>
      <HintText>{hintText}</HintText>
      {text === "What hourly rate were you paid?" && <PopoverComponent />}
      <QuestionOptions
        type={type}
        options={options}
        groupId={groupId}
        showNextQestion={showNextQestion}
        next={next}
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

class PopoverComponent extends React.Component {
  state = {
    popoverVisible: false
  };

  hide = () => {
    this.setState({
      popoverVisible: false
    });
  };

  handleVisibleChange = popoverVisible => {
    this.setState({ popoverVisible });
  };

  render() {
    return (
      <Popover
        placement="top"
        content={
          <PopoverDiv>
            <PopoverText>
              We’re asking this because it will be useful to track over time how
              much agencies are paying workers
            </PopoverText>
            <PopoverBtn onClick={this.hide}>Got it!</PopoverBtn>
          </PopoverDiv>
        }
        trigger="click"
        visible={this.state.popoverVisible}
        onVisibleChange={this.handleVisibleChange}
      >
        <PopoverLink>Why are we asking this?</PopoverLink>
      </Popover>
    );
  }
}

class QuestionOptions extends React.Component {
  state = {
    checkedList: [],
    clicked: false,
    rate: 0,
    hoverRate: undefined,
    popoverVisible: false
  };

  getStyle = () => {
    if (this.state.clicked) {
      return {
        border: `3px solid ${colors.green}`
      };
    } else {
      return {
        border: "3px solid transparent"
      };
    }
  };

  setRateValue = value => {
    this.setState({ rate: value });
    this.props.setFieldValue("review.rate", value);
  };

  handleHoverRate = value => {
    this.setState({ hoverRate: value });
  };
  addOrgType = category => {
    return category === "agency" ? "payroll" : "agency";
  };

  render() {
    const { props } = this;
    if (!props && !props.options) {
      return null;
    }

    const { rate, hoverRate } = this.state;
    const {
      type,
      options,
      number,
      category,
      label,
      hasComment,
      groupId,
      next,
      showNextQestion,
      setFieldValue,
      values
    } = props;

    const rateValue = hoverRate || rate;

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
                    groupId={groupId}
                    next={next}
                    showNextQestion={showNextQestion}
                    setFieldValue={setFieldValue}
                    number={number}
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
                    <CommentsIcon hasValue={!!props.submittedText}>
                      <Icon icon="addComment" />
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
                    <CommentsIcon hasValue={!!props.submittedText}>
                      <Icon icon="addComment" />
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
                <SliderWrapper
                  visibility={values["questions"][number]}
                  color={organizations[category].primary}
                >
                  <p>
                    £{values["questions"][number]} {label}
                  </p>

                  <Slider
                    tooltipVisible={false}
                    onChange={v =>
                      props.setFieldValue(`questions[${number}]`, v)
                    }
                    style={{ width: "100%" }}
                    marks={{
                      0: {
                        style: marksStyle,
                        label: <strong>£0</strong>
                      },
                      10: {
                        style: marksStyle,
                        label: <strong>£10</strong>
                      },
                      20: {
                        style: marksStyle,
                        label: <strong>£20</strong>
                      },
                      30: {
                        style: marksStyle,
                        label: <strong>£30</strong>
                      },
                      40: {
                        style: marksStyle,
                        label: <strong>£40</strong>
                      },
                      50: {
                        style: marksStyle,
                        label: <strong>£50+</strong>
                      }
                    }}
                    max={50}
                  />
                </SliderWrapper>
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
                    <CommentsIcon hasValue={!!props.submittedText}>
                      <Icon icon="addComment" />
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
                      placeholder={this.state.placeholder || label}
                      style={{
                        border: `1px solid ${colors.dustyGray1}`,
                        borderRadius: "4px"
                      }}
                      onChange={value => {
                        form.setFieldValue(`questions[${number}]`, value);
                      }}
                      onSearch={value => {
                        if (value) {
                          this.setState({ placeholder: value });
                          form.setFieldValue(`questions[${number}]`, value);
                        }
                      }}
                      dropdownRender={menu => {
                        return (
                          <div>
                            {menu}
                            <Divider style={{ margin: "4px 0" }} />
                            <ModalComment
                              title={`Add a new ${this.addOrgType(category)}`}
                              setFieldValue={(field, value) => {
                                this.setState({ placeholder: value });
                                props.setFieldValue(field, value);
                              }}
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
                                    <AntdIcon type="plus" /> Add item
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
                    <CommentsIcon hasValue={!!props.submittedText}>
                      <Icon icon="addComment" />
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
      return (
        <QuestionOptionsWrapper>
          <Options>
            <StyledCheckList>
              <FieldArray
                name={`questions[${number}]`}
                render={arrayHelpers => (
                  <div>
                    <Checkbox.Group
                      className="check-group"
                      options={options}
                      value={this.state.checkedList}
                      onChange={checkedList => {
                        this.setState({
                          checkedList,
                          clicked: false
                        });
                        props.setFieldValue(
                          `questions[${number}]`,
                          checkedList
                        );
                      }}
                    />
                  </div>
                )}
              />
              <div className="icon-button">
                <StyledButton
                  style={this.getStyle()}
                  type="button"
                  onClick={e => {
                    e.preventDefault();
                    this.setState({
                      checkedList: [],
                      clicked: true
                    });
                    props.setFieldValue(
                      `questions[${number}]`,
                      "I didn't check"
                    );
                  }}
                >
                  I didn't check
                </StyledButton>
                {hasComment && (
                  <ModalComment
                    title="Enter you comment here"
                    setFieldValue={props.setFieldValue}
                    number={number}
                    comment
                    render={props => {
                      return (
                        <CommentsIcon hasValue={!!props.submittedText}>
                          <Icon icon="addComment" />
                        </CommentsIcon>
                      );
                    }}
                    style={{ alignSelf: "flex-end" }}
                  />
                )}
              </div>
            </StyledCheckList>
          </Options>
          <ErrorMessage name={`questions[${number}]`}>
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
              <>
                <Rate
                  {...field}
                  onChange={value => this.setRateValue(value)}
                  style={{
                    color: `${organizations[category].primary}`,
                    fontSize: `${isMobile(window.innerWidth) ? "2rem" : "3rem"}`
                  }}
                  onHoverChange={this.handleHoverRate}
                />
                <div style={{ dispay: "inline-block" }}>
                  {options.map((option, index) => (
                    <span
                      style={{
                        color: `${
                          index < rateValue
                            ? organizations[category].primary
                            : "#e8e8e8"
                        }`,
                        fontWeight: `${
                          index === rateValue - 1 ? "900" : "500"
                        }`,
                        fontSize: `${
                          isMobile(window.innerWidth) ? "0.6rem" : "0.7rem"
                        }`,
                        width: `${
                          isMobile(window.innerWidth) ? "32px" : "48px"
                        }`,
                        display: "inline-block",
                        textAlign: "center",
                        marginRight: "8px"
                      }}
                    >
                      {option}
                    </span>
                  ))}
                </div>
              </>
            )}
          </Field>
          <ErrorMessage name="review.rate">
            {msg => {
              return <StyledErrorMessage>{msg}</StyledErrorMessage>;
            }}
          </ErrorMessage>
        </QuestionOptionsWrapper>
      );
    }

    return null;
  }
}

export const RadioButton = ({
  field: { name, value, onChange, onBlur },
  id,
  label,
  className,
  groupId,
  next,
  showNextQestion,
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
      <StyledInput
        onClick={() => {
          if (typeof next === "object" && next !== null) {
            let nextQ = next["yes"];
            let other = next["no"];
            if (
              props.option === "No" ||
              props.option.includes("know") ||
              props.option.includes("need") ||
              props.option.includes("check")
            ) {
              nextQ = next["no"];
              other = next["yes"];
            }
            showNextQestion(
              groupId,
              nextQ,
              other,
              props.setFieldValue,
              props.number
            );
          }
        }}
        htmlFor={id}
        className={`yesno options-${props.count}`}
      >
        {props.option}
      </StyledInput>
    </InputWrapper>
  );
};

export default Question;
