import React, { Component } from "react";
import { Input } from "antd";

import QuestionOptions from "./Options";
import PopoverComponent from "../../../Common/Popover";
import {
  QuestionWithIconWrapper,
  QuestionWrapper,
  QText,
  HintText,
  Warning,
  IconContainer,
} from "./Question.style";

import { isIphone, isXSMobile } from "../../../../helpers/index";

import UploadAudio2 from "./NewUploadAudio";

import UploadAudio3 from "./UploadAudio3";

import Icon from "../../../Common/Icon/Icon";

import { colors } from "../../../../theme";

class Question extends Component {
  state = {
    showComment: false,
  };

  toggleShowComment = () => {
    this.setState(prevState => ({
      showComment: !prevState.showComment,
    }));
  };

  render() {
    if (!this.props) {
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
      next,
      hasComment,
      icon,
    } = this.props.question;

    const {
      questions,
      values,
      errors,
      setFieldValue,
      dropdownOptions,
      showNextQestion,
      groupId,
      handleChange,
      handleSliderChange,
      recording,
      startRecord,
      stopRecord,
      handleRecord,
      handleAddNewOrgChange,
      id,
      voiceReviewUrl,
      state,
      history,
      question,
    } = this.props;

    const popoverOptions = {
      text:
        "We’re asking this because it will be useful to track over time how much agencies are paying workers",
      linkText: "Learn more",
      icon: "info",
      margin: "0 0 0.5rem 0",
    };

    return (
      <QuestionWithIconWrapper>
        <IconContainer>
          {icon && (
            <Icon
              icon={icon}
              width={isXSMobile(window.innerWidth) ? "45" : "45"}
              height={isXSMobile(window.innerWidth) ? "50" : "50"}
              color={colors.dustyGray4}
            />
          )}
        </IconContainer>
        <QuestionWrapper>
          <QText>{text}</QText>
          {hintText && (
            <Warning>
              {type && type === "voiceReview" && (
                <Icon
                  icon="warning"
                  margin="0 1rem 0 0"
                  height="1.5rem"
                  width="1.5rem"
                />
              )}
              <HintText voiceWarn={type && type === "voiceReview"}>
                {hintText}
              </HintText>
            </Warning>
          )}

          {/* overallReview tooltip */}
          {/* {type === overallReview && <ToolTip text={hintText} icon="info" />} */}
          {text === "What hourly rate did this agency pay you?" && (
            <PopoverComponent
              category={category}
              popoverOptions={popoverOptions}
              history={history}
              currentState={state}
            />
          )}
          {type === "voiceReview" && (
            <div>
              {isIphone() ? (
                <UploadAudio3
                  recording={recording}
                  stopRecord={stopRecord}
                  startRecord={startRecord}
                  handleRecord={handleRecord}
                  id={id}
                  voiceReviewUrl={voiceReviewUrl}
                />
              ) : (
                <UploadAudio2
                  recording={recording}
                  stopRecord={stopRecord}
                  startRecord={startRecord}
                  handleRecord={handleRecord}
                  id={id}
                  voiceReviewUrl={voiceReviewUrl}
                />
              )}
            </div>
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
            handleChange={handleChange}
            handleSliderChange={handleSliderChange}
            question={question}
            state={this.props.state}
            runValidation={this.props.runValidation}
            handleReviewChange={this.props.handleReviewChange}
            handleAddNewOrgChange={handleAddNewOrgChange}
            hasComment={hasComment}
            toggleShowComment={this.toggleShowComment}
          />
          {hasComment && this.state.showComment && (
            <Input.TextArea
              placeholder="Say more..."
              onChange={this.props.handleReviewChange}
              data-type="comments"
              value={state.comments[question.number]}
              name={question.number}
              style={{ margin: "0.25rem 0 0" }}
            />
          )}
        </QuestionWrapper>
      </QuestionWithIconWrapper>
    );
  }
}

export default Question;
